import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FOLDERS } from "../journey/data";

/*
  The opening scene: the inside of the computer as a huge warehouse, seen from above at an angle.
  It is laid out in three bands, parallel to each other, like a real plant:
  - at the back, the wall of shelving: each rack is one folder of the office, with its name over it, and a
    walkway in front of it with one lane each way;
  - in the middle, the line: loose files arrive on a belt and pile up at "arrivo", then ride a roller conveyor
    through three departments (controllo, lettura, qualità) to "smistamento", where workers take them one by
    one to the shelf of their folder;
  - at the front, the lane of the forklifts, which carry the big files from their bay to the stacks.
  The workers are a ball with arms and legs, a hard hat and a hi-vis vest. Everything is built here from
  boxes, spheres, cylinders and capsules: no model files. Every movement is a function of the time inside a
  30 second loop, so the scene is the same film on every pass and repeats without a seam.
*/

const LOOP = 30;
const BAY = 4; // one rack, along x
const DEPTH = 1.3;
const WALL_Z = -12;
const WALL_X0 = -9;
const RACK_H = 7.2;
const LEVELS = [0.3, 1.7, 3.1, 4.5, 5.9]; // shelf heights
const FRONT = WALL_Z + DEPTH / 2;
const STAND = FRONT + 1.05; // where a worker stands to reach a shelf
const REVIEW = FOLDERS.length - 1;
const rackX = (i) => WALL_X0 + BAY * (i + 0.5);
const LIFT_X = rackX(1) - 1.1;
const BODY_Y = 0.97; // centre of a worker's body above the floor

// the walkway along the shelving: the lane nearer the wall runs towards +x, the other one comes back
const LANE_N = -8.8;
const LANE_S = -7.9;

// the line
const LINE_Z = -3.5;
const LINE_X0 = 22; // where files are put on the rollers
const LINE_X1 = 4.9; // where they are taken off
const ROLL_Y = 0.9;
const RIDE = 10; // seconds a file spends on the rollers
const STATION = { control: 18.3, read: 14, quality: 9.6 };
const CREW_Z = LINE_Z - 1.6; // the people of the line stand behind it, facing the room
const HEAP = { x: 24.2, z: LINE_Z };
const PICK_AT = { x: 4.3, z: CREW_Z };

// the forklifts: out on one lane, back on the other, a hairpin at each end
const FORK_OUT = -0.9;
const FORK_BACK = 2.9;
const BIG_BAY = { x: 27, z: -1.5 };
const STACK_Z = 5.2;
const STACKS = [8.5, 10.8, 13.1];

// which rack each of the fourteen files of a loop goes to, in the order they leave the line
const ORDER = [0, 3, 5, 1, 6, 2, 4];
const BEAT = LOOP / (ORDER.length * 2);
// the racks near the end of the line have one worker who makes two trips a loop; the far ones have two
const NEAR = new Set([1, 2, 3, 4]);

const C = {
  bg: 0x0b0f0e, floor: 0x101715, line: 0x8a7430, steel: 0x35433f, beam: 0x47584f, deck: 0x1a2321, dark: 0x222c29,
  cream: 0xefe9da, vest: 0xf07f1e, stripe: 0xf7edc0, hat: 0xf6c62e, trouser: 0x2a3941, boot: 0x3a2f27, glove: 0x39464b, eye: 0x14181a,
  paper: 0xece9df, filed: 0xa9e6cd, review: 0xf0c877, wood: 0x5d4d3a, mint: 0xbdf5de, truck: 0xf2a01e, tyre: 0x15191a, roller: 0x5b6d66,
};
const SHELF_TONES = [0x9fc7b8, 0xc8e6da, 0x7fae9c, 0xe3e2da, 0x5f8f7e, 0xb7d6ca];
const REVIEW_TONES = [0xe6b35a, 0xf0cf8e, 0xc9953f, 0xe3e2da];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (x) => { const t = clamp(x); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;
const mod = (v, m) => ((v % m) + m) % m;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const bell = (d, w) => Math.exp(-Math.pow(d / w, 2));
// a walk that starts and stops gently and keeps a steady pace in between
const ramp = (t, a = 0.1) => {
  const v = 1 / (1 - a);
  if (t < a) return (0.5 * v * t * t) / a;
  if (t > 1 - a) return 1 - (0.5 * v * (1 - t) * (1 - t)) / a;
  return v * (t - a / 2);
};
const turn = (from, to, k) => from + Math.atan2(Math.sin(to - from), Math.cos(to - from)) * k;

function rng(seed) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.3)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

// a name on a small dark plate; 70 canvas px are one unit of the scene, so the type lands near 11px on screen
function labelTexture(text, color) {
  const c = document.createElement("canvas");
  const g = c.getContext("2d");
  const font = '500 22px "Geist Mono", ui-monospace, Consolas, monospace';
  g.font = font;
  c.width = Math.ceil(g.measureText(text).width) + 28;
  c.height = 40;
  g.font = font;
  g.fillStyle = "rgba(11,15,14,0.86)";
  g.beginPath();
  g.roundRect(1, 1, c.width - 2, c.height - 2, 8);
  g.fill();
  g.strokeStyle = "rgba(227,226,218,0.2)";
  g.lineWidth = 2;
  g.stroke();
  g.fillStyle = color;
  g.textBaseline = "middle";
  g.fillText(text, 14, 21);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return { tex, w: c.width / 70, h: c.height / 70 };
}

// the face of a file: a sheet with a heading, a few lines and a tag in the colour of its type
function pageTexture(tag) {
  const c = document.createElement("canvas");
  c.width = 180;
  c.height = 140;
  const g = c.getContext("2d");
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, 180, 140);
  g.fillStyle = tag;
  g.fillRect(14, 14, 40, 30);
  g.fillStyle = "#5f6763";
  g.fillRect(66, 20, 92, 12);
  g.fillStyle = "#a3aaa5";
  [62, 80, 98, 116].forEach((y, k) => g.fillRect(14, y, [150, 118, 138, 84][k], 7));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
const TAGS = ["#e5786d", "#6aa2f0", "#5fc28a", "#e6b35a"]; // pdf, word, excel, photo

// a closed path through the given [x, z] points, sampled so that a distance along it can be turned into a place
function track(points) {
  const pts = points.map(([x, z]) => new THREE.Vector3(x, 0, z));
  const curve = new THREE.CatmullRomCurve3(pts, true, "centripetal");
  const N = 360;
  const xs = new Float32Array(N + 1);
  const zs = new Float32Array(N + 1);
  const cum = new Float32Array(N + 1);
  const p = new THREE.Vector3();
  for (let k = 0; k <= N; k++) {
    curve.getPoint(k / N, p);
    xs[k] = p.x;
    zs[k] = p.z;
    if (k) cum[k] = cum[k - 1] + Math.hypot(xs[k] - xs[k - 1], zs[k] - zs[k - 1]);
  }
  return {
    total: cum[N],
    at: (j) => cum[Math.round((j / pts.length) * N)], // the distance at which point j is reached
    place: (s, out) => {
      let lo = 0;
      let hi = N;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] <= s) lo = mid; else hi = mid;
      }
      const f = (s - cum[lo]) / Math.max(1e-6, cum[hi] - cum[lo]);
      out.x = lerp(xs[lo], xs[hi], f);
      out.z = lerp(zs[lo], zs[hi], f);
      out.yaw = Math.atan2(xs[hi] - xs[lo], zs[hi] - zs[lo]);
      return out;
    },
  };
}

export default function Warehouse() {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 760px)").matches;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      el.classList.add("is-fallback");
      return undefined;
    }
    let disposed = false;
    const bin = [];
    const keep = (x) => { bin.push(x); return x; };
    const rand = rng(20261124);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 2 : 1.5));
    renderer.setClearColor(C.bg, 1);
    el.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(C.bg, 63, 84);
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 200);
    const target = new THREE.Vector3(9.17, 2.6, -5.67);

    const hemi = new THREE.HemisphereLight(0xe4f0ea, 0x18211e, 2.3);
    const sun = new THREE.DirectionalLight(0xfff0d8, 2.4);
    sun.position.set(-1, 24, 12);
    sun.target.position.set(9, 0, -3.5);
    scene.add(hemi, sun, sun.target);
    // real shadows on a desktop: everything stands on the floor instead of floating over it
    const shadows = !small;
    if (shadows) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.bias = -0.0004;
      sun.shadow.normalBias = 0.04;
      Object.assign(sun.shadow.camera, { left: -32, right: 32, top: 26, bottom: -26, near: 1, far: 90 });
    }

    const mats = new Map();
    const mat = (color) => {
      if (!mats.has(color)) mats.set(color, keep(new THREE.MeshLambertMaterial({ color })));
      return mats.get(color);
    };
    const geo = (g) => keep(g);
    const unit = geo(new THREE.BoxGeometry(1, 1, 1));
    const dummy = new THREE.Object3D();
    const tint = new THREE.Color();
    const box = (parent, color, w, h, d, x, y, z) => {
      const m = new THREE.Mesh(unit, typeof color === "number" ? mat(color) : color);
      m.scale.set(w, h, d);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    };

    // ---- floor, with the painted lines that say what each part of it is for
    const floor = new THREE.Mesh(geo(new THREE.PlaneGeometry(220, 220)), mat(C.floor));
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
    const lineMat = keep(new THREE.MeshBasicMaterial({ color: C.line, transparent: true, opacity: 0.5 }));
    const paint = (x0, z0, x1, z1) => box(scene, lineMat, Math.max(0.09, Math.abs(x1 - x0)), 0.01, Math.max(0.09, Math.abs(z1 - z0)), (x0 + x1) / 2, 0.012, (z0 + z1) / 2);
    const outline = (x0, z0, x1, z1) => { paint(x0, z0, x1, z0); paint(x0, z1, x1, z1); paint(x0, z0, x0, z1); paint(x1, z0, x1, z1); };
    const dashes = (x0, x1, z, step = 2.2) => { for (let x = x0; x < x1; x += step) paint(x, z, x + step * 0.5, z); };
    // the walkway, one lane each way
    paint(-9, -7.3, 19, -7.3);
    paint(-9, FRONT + 0.25, 19, FRONT + 0.25);
    dashes(-8.6, 18.8, (LANE_N + LANE_S) / 2, 1.2);
    // the line, one box per department
    outline(3.1, -6.2, 26.4, -2.3);
    [7.2, 11.8, 16.2, 20.6].forEach((x) => paint(x, -6.2, x, -2.3));
    // the forklifts' lanes, the bay of the big files and their stacks
    paint(6.3, -1.8, 25.6, -1.8);
    paint(6.3, 3.8, 25.6, 3.8);
    dashes(7, 25, 1);
    outline(BIG_BAY.x - 1, BIG_BAY.z - 1, BIG_BAY.x + 1, BIG_BAY.z + 1);
    outline(STACKS[0] - 1, STACK_Z - 0.9, STACKS[2] + 1, STACK_Z + 0.9);

    // ---- shelving: posts, beams and decks as three instanced meshes per wall
    const wall = (x0, z, racks, shade) => {
      const steel = keep(new THREE.MeshLambertMaterial({ color: new THREE.Color(C.steel).multiplyScalar(shade) }));
      const beamMat = keep(new THREE.MeshLambertMaterial({ color: new THREE.Color(C.beam).multiplyScalar(shade) }));
      const deckMat = keep(new THREE.MeshLambertMaterial({ color: new THREE.Color(C.deck).multiplyScalar(shade) }));
      const posts = new THREE.InstancedMesh(unit, steel, (racks + 1) * 2);
      const beams = new THREE.InstancedMesh(unit, beamMat, racks * LEVELS.length * 2);
      const decks = new THREE.InstancedMesh(unit, deckMat, racks * LEVELS.length);
      let p = 0;
      let b = 0;
      let d = 0;
      dummy.rotation.set(0, 0, 0);
      for (let i = 0; i <= racks; i++) {
        for (const side of [-1, 1]) {
          dummy.position.set(x0 + i * BAY, RACK_H / 2, z + (side * DEPTH) / 2);
          dummy.scale.set(0.14, RACK_H, 0.14);
          dummy.updateMatrix();
          posts.setMatrixAt(p++, dummy.matrix);
        }
      }
      for (let i = 0; i < racks; i++) {
        LEVELS.forEach((y) => {
          for (const side of [-1, 1]) {
            dummy.position.set(x0 + (i + 0.5) * BAY, y - 0.09, z + (side * DEPTH) / 2);
            dummy.scale.set(BAY, 0.13, 0.1);
            dummy.updateMatrix();
            beams.setMatrixAt(b++, dummy.matrix);
          }
          dummy.position.set(x0 + (i + 0.5) * BAY, y - 0.03, z);
          dummy.scale.set(BAY - 0.1, 0.05, DEPTH);
          dummy.updateMatrix();
          decks.setMatrixAt(d++, dummy.matrix);
        });
      }
      scene.add(posts, beams, decks);
    };

    // the files already on the shelves, standing like binders; `free` leaves room where the workers put new ones
    const fill = (x0, z, racks, shade, per, free) => {
      const rows = [];
      for (let i = 0; i < racks; i++) {
        const tones = x0 === WALL_X0 && i === REVIEW ? REVIEW_TONES : SHELF_TONES;
        LEVELS.forEach((y, level) => {
          let x = x0 + i * BAY + 0.28;
          const end = x0 + (i + 1) * BAY - 0.28;
          const step = (BAY - 0.56) / per;
          while (x < end) {
            const w = 0.13 + rand() * 0.07;
            const h = 0.78 + rand() * 0.3;
            const skip = rand() < 0.06 || (free && free(i, level, x));
            if (!skip) rows.push([x, y + h / 2, z + 0.05 + (rand() - 0.5) * 0.06, w, h, tones[Math.floor(rand() * tones.length)]]);
            x += step * (0.85 + rand() * 0.3);
          }
        });
      }
      const mesh = new THREE.InstancedMesh(unit, keep(new THREE.MeshLambertMaterial({ color: 0xffffff })), rows.length);
      dummy.rotation.set(0, 0, 0);
      rows.forEach(([x, y, zz, w, h, tone], k) => {
        dummy.position.set(x, y, zz);
        dummy.scale.set(w, h, 0.72);
        dummy.updateMatrix();
        mesh.setMatrixAt(k, dummy.matrix);
        mesh.setColorAt(k, tint.set(tone).multiplyScalar(shade * (0.82 + rand() * 0.18)));
      });
      scene.add(mesh);
    };

    const ledMats = [0, 1].map(() => keep(new THREE.MeshBasicMaterial({ color: C.mint, fog: false })));
    ledMats.forEach((m, set) => {
      const spots = [];
      for (let i = 0; i <= FOLDERS.length; i++) LEVELS.forEach((y, l) => { if ((i + l) % 2 === set) spots.push([WALL_X0 + i * BAY, y + 0.78]); });
      const mesh = new THREE.InstancedMesh(unit, m, spots.length);
      dummy.rotation.set(0, 0, 0);
      spots.forEach(([x, y], k) => {
        dummy.position.set(x, y, FRONT + 0.09);
        dummy.scale.set(0.07, 0.07, 0.04);
        dummy.updateMatrix();
        mesh.setMatrixAt(k, dummy.matrix);
      });
      scene.add(mesh);
    });

    wall(WALL_X0, WALL_Z, FOLDERS.length, 1);
    fill(WALL_X0, WALL_Z, FOLDERS.length, 1, 17, (i, level, x) =>
      (level === 1 && Math.abs(x - (rackX(i) + 0.6)) < 0.62) || (i === 1 && level === 3 && Math.abs(x - LIFT_X) < 0.5));
    if (!small) {
      // a second wall far behind: the place is bigger than the part you are looking at
      wall(-30, -26, 15, 0.6);
      fill(-30, -26, 15, 0.6, 12, null);
    }

    // ---- pools of light on the floor
    const glowTex = keep(glowTexture());
    const poolGeo = geo(new THREE.PlaneGeometry(1, 1));
    const pools = [[HEAP.x, LINE_Z, 9], [14, LINE_Z, 10], [5, -4.5, 9], [10.8, 3.4, 10], [0, -9, 9], [12, -9, 9], [23, 1.5, 9]].map(([x, z, r]) => {
      const m = new THREE.Mesh(poolGeo, keep(new THREE.MeshBasicMaterial({ map: glowTex, color: 0xfff2dc, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })));
      m.rotation.x = -Math.PI / 2;
      m.position.set(x, 0.02, z);
      m.scale.set(r, r, 1);
      scene.add(m);
      return m.material;
    });

    // ---- arrivo: the pile of loose files on its pallet, and the belt that keeps bringing more
    box(scene, C.wood, 3.4, 0.22, 3.4, HEAP.x, 0.11, HEAP.z);
    const sheetGeo = geo(new THREE.BoxGeometry(0.9, 0.035, 0.7));
    const heapN = 84;
    const heap = new THREE.InstancedMesh(sheetGeo, keep(new THREE.MeshLambertMaterial({ color: 0xffffff })), heapN);
    for (let k = 0; k < heapN; k++) {
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand()) * 1.35;
      dummy.position.set(HEAP.x + Math.cos(a) * r, 0.26 + (1 - r / 1.35) * 1.15 * rand() + rand() * 0.08, HEAP.z + Math.sin(a) * r);
      dummy.rotation.set((rand() - 0.5) * 0.9, rand() * Math.PI, (rand() - 0.5) * 0.9);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      heap.setMatrixAt(k, dummy.matrix);
      heap.setColorAt(k, tint.set(C.paper).multiplyScalar(0.78 + rand() * 0.22));
    }
    scene.add(heap);
    const heapTop = new THREE.Vector3(HEAP.x, 1.5, HEAP.z);

    const beltA = new THREE.Vector3(37, 7.6, -5.6);
    const beltB = new THREE.Vector3(25.5, 2.7, -3.8);
    const belt = box(scene, C.dark, 1.35, 0.12, beltA.distanceTo(beltB), 0, 0, 0);
    belt.position.copy(beltA).lerp(beltB, 0.5);
    belt.lookAt(beltB);
    [0.25, 0.6, 0.9].forEach((u) => {
      const p = new THREE.Vector3().copy(beltB).lerp(beltA, u);
      box(scene, C.steel, 0.14, p.y, 0.14, p.x, p.y / 2, p.z);
    });
    const onBelt = Array.from({ length: 6 }, () => {
      const m = new THREE.Mesh(sheetGeo, mat(C.paper));
      scene.add(m);
      return m;
    });

    // ---- the roller conveyor
    const railLen = LINE_X0 - LINE_X1 + 1.1;
    const railX = (LINE_X0 + LINE_X1) / 2 + 0.15;
    [-0.66, 0.66].forEach((dz) => box(scene, C.beam, railLen, 0.16, 0.08, railX, ROLL_Y, LINE_Z + dz));
    for (let x = LINE_X1; x <= LINE_X0 + 0.4; x += 2.9) {
      [-0.6, 0.6].forEach((dz) => box(scene, C.steel, 0.1, ROLL_Y - 0.08, 0.1, x, (ROLL_Y - 0.08) / 2, LINE_Z + dz));
    }
    const rollerN = Math.floor(railLen / 0.4);
    const rollers = new THREE.InstancedMesh(geo(new THREE.CylinderGeometry(0.085, 0.085, 1.24, 10)), mat(C.roller), rollerN);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    for (let k = 0; k < rollerN; k++) {
      dummy.position.set(LINE_X1 - 0.35 + k * 0.4, ROLL_Y, LINE_Z);
      dummy.updateMatrix();
      rollers.setMatrixAt(k, dummy.matrix);
    }
    scene.add(rollers);
    box(scene, C.steel, 0.1, 0.5, 1.4, LINE_X1 - 0.62, ROLL_Y + 0.12, LINE_Z); // the stop at the end

    // a light that the departments switch on when a file is under them
    const lamp = (x, y, z, w, h, d) => {
      const m = keep(new THREE.MeshBasicMaterial({ color: C.mint, fog: false }));
      box(scene, m, w, h, d, x, y, z);
      return m;
    };
    const portal = (x, height, half) => {
      [-half, half].forEach((dz) => box(scene, C.steel, 0.18, height, 0.18, x, height / 2, LINE_Z + dz));
      box(scene, C.beam, 0.3, 0.22, half * 2 + 0.4, x, height + 0.06, LINE_Z);
    };

    const halo = (parent, x, y, z, size, color = C.mint) => {
      const m = keep(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
      const spr = new THREE.Sprite(m);
      spr.scale.set(size, size, 1);
      spr.position.set(x, y, z);
      parent.add(spr);
      return m;
    };

    // controllo: a low arch with a light, and a desk
    portal(STATION.control, 2.0, 0.95);
    const controlLamp = lamp(STATION.control, 2.32, LINE_Z, 0.34, 0.16, 0.5);
    const controlHalo = halo(scene, STATION.control, 2.32, LINE_Z, 2.6);
    // lettura: the tall gate, with its curtain of light
    portal(STATION.read, 2.95, 1.25);
    const readLamp = lamp(STATION.read, 2.86, LINE_Z, 0.12, 0.07, 2.3);
    const readHalo = halo(scene, STATION.read, 2.0, LINE_Z, 5.2);
    const veilMat = keep(new THREE.MeshBasicMaterial({ color: C.mint, transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false }));
    const veil = new THREE.Mesh(geo(new THREE.PlaneGeometry(2.3, 1.85)), veilMat);
    veil.rotation.y = Math.PI / 2;
    veil.position.set(STATION.read, ROLL_Y + 1.0, LINE_Z);
    scene.add(veil);
    box(scene, C.steel, 0.95, 0.95, 0.45, STATION.read + 1.5, 0.475, CREW_Z + 0.5);
    const screenMat = keep(new THREE.MeshBasicMaterial({ color: C.mint, fog: false }));
    box(scene, screenMat, 0.7, 0.42, 0.05, STATION.read + 1.5, 1.22, CREW_Z + 0.6);
    // qualità: a press that comes down on every file, and a light that says how it went
    portal(STATION.quality, 2.7, 0.95);
    const qualityLamp = lamp(STATION.quality, 3.02, LINE_Z + 0.72, 0.34, 0.16, 0.4);
    const qualityHalo = halo(scene, STATION.quality, 3.02, LINE_Z + 0.72, 2.6);
    const press = new THREE.Group();
    box(press, C.steel, 0.14, 1.1, 0.14, 0, 0.55, 0);
    box(press, C.truck, 0.62, 0.2, 0.62, 0, -0.1, 0);
    press.position.set(STATION.quality, 0, LINE_Z);
    scene.add(press);

    // ---- workers: one kit of shapes and colours shared by all of them
    const kit = {
      body: geo(new THREE.SphereGeometry(0.5, 28, 20)),
      vest: geo(new THREE.SphereGeometry(0.513, 28, 8, 0, Math.PI * 2, Math.PI * 0.55, Math.PI * 0.27)),
      stripe: geo(new THREE.SphereGeometry(0.519, 28, 2, 0, Math.PI * 2, Math.PI * 0.655, Math.PI * 0.035)),
      hat: geo(new THREE.SphereGeometry(0.37, 24, 10, 0, Math.PI * 2, 0, Math.PI * 0.5)),
      brim: geo(new THREE.CylinderGeometry(0.45, 0.45, 0.04, 26)),
      limb: geo(new THREE.CapsuleGeometry(0.085, 0.26, 4, 10)),
      ball: geo(new THREE.SphereGeometry(0.1, 12, 10)),
      shadow: geo(new THREE.CircleGeometry(0.62, 20)),
      eye: keep(new THREE.MeshBasicMaterial({ color: C.eye })),
      shade: keep(new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.32, depthWrite: false })),
    };
    const crew = [];
    const part = (g, m, parent, x = 0, y = 0, z = 0) => {
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      parent.add(mesh);
      return mesh;
    };
    const worker = (parent = scene, seated = false) => {
      const root = new THREE.Group();
      if (!seated && !shadows) part(kit.shadow, kit.shade, root, 0, 0.025, 0).rotation.x = -Math.PI / 2;
      const tilt = new THREE.Group(); // the body, so it can lean without the feet leaving the floor
      tilt.position.y = BODY_Y;
      root.add(tilt);
      part(kit.body, mat(C.cream), tilt);
      part(kit.vest, mat(C.vest), tilt);
      part(kit.stripe, mat(C.stripe), tilt);
      part(kit.hat, mat(C.hat), tilt, 0, 0.29, 0);
      part(kit.brim, mat(C.hat), tilt, 0, 0.31, 0.06);
      const eyes = [-0.17, 0.17].map((x) => {
        const eye = part(kit.ball, kit.eye, tilt, x, 0.07, 0.455);
        eye.scale.set(0.62, 0.88, 0.3);
        return eye;
      });
      const limb = (to, x, y, color, end, foot) => {
        const pivot = new THREE.Group();
        pivot.position.set(x, y, 0);
        to.add(pivot);
        part(kit.limb, mat(color), pivot, 0, -0.2, 0);
        const tip = part(kit.ball, mat(end), pivot, 0, -0.43, foot ? 0.05 : 0);
        if (foot) tip.scale.set(1.25, 0.85, 1.7);
        return pivot;
      };
      const w = {
        root, tilt, eyes,
        // everyone blinks on a rhythm of their own; each one divides the loop, so the loop still closes
        every: [3, 5, 6, 7.5, 10][crew.length % 5], phase: rand(),
        armL: limb(tilt, -0.5, -0.04, C.cream, C.glove, false), armR: limb(tilt, 0.5, -0.04, C.cream, C.glove, false),
        legL: seated ? null : limb(root, -0.19, 0.55, C.trouser, C.boot, true), legR: seated ? null : limb(root, 0.19, 0.55, C.trouser, C.boot, true),
      };
      parent.add(root);
      crew.push(w);
      return w;
    };
    // step: where it is in its stride; moving 0..1; carry: arms forward holding something; reach: arms up; bend
    const pose = (w, step, moving, carry, reach = 0, bend = 0) => {
      const swing = Math.sin(step) * 0.8 * moving;
      if (w.legL) { w.legL.rotation.x = swing; w.legR.rotation.x = -swing; }
      const hold = -1.3 - reach * 0.75;
      w.armL.rotation.x = lerp(-swing * 0.75, hold, carry);
      w.armR.rotation.x = lerp(swing * 0.75, hold, carry);
      w.tilt.position.y = BODY_Y + Math.abs(Math.cos(step)) * 0.05 * moving - bend * 0.08;
      w.tilt.rotation.x = bend * 0.5;
    };
    const stand = (x, z, yaw = 0) => {
      const w = worker();
      w.root.position.set(x, 0, z);
      w.root.rotation.y = yaw;
      return w;
    };

    // ---- the people of the line, each behind their department
    const loader = stand(LINE_X0 + 0.25, CREW_Z, 0.25);
    const tidier = stand(HEAP.x + 2.1, HEAP.z + 1.4, Math.atan2(-2.1, -1.4));
    const checker = stand(STATION.control + 1.0, CREW_Z);
    const reader = stand(STATION.read + 1.5, CREW_Z - 0.2);
    const inspector = stand(STATION.quality + 1.05, CREW_Z);

    // ---- the files that go round: on the rollers, in a worker's hands, on the shelf, and back to the start
    const fileGeo = geo(new THREE.BoxGeometry(0.9, 0.14, 0.7));
    const pages = TAGS.map((tag) => keep(pageTexture(tag)));
    let fileCount = 0;
    const page = () => keep(new THREE.MeshLambertMaterial({ color: C.paper, map: pages[fileCount++ % pages.length] }));
    const PICK = 1.5; // seconds to take a file off the line
    const PLACE = 1.7; // seconds to put it on the shelf
    const PACE = 1.7; // a comfortable walk, in units a second
    const FADE0 = LOOP - RIDE - 1.2;
    const lineEnd = new THREE.Vector3(LINE_X1, ROLL_Y + 0.16, LINE_Z);
    const lineStart = new THREE.Vector3(LINE_X0, ROLL_Y + 0.16, LINE_Z);

    const carrier = (rack, period, pickup) => {
      const rx = rackX(rack) + 0.6;
      const right = rx > PICK_AT.x;
      const far = Math.abs(rx - PICK_AT.x) > 3.4;
      const side = right ? 1 : -1;
      const [laneOut, laneBack] = right ? [LANE_N, LANE_S] : [LANE_S, LANE_N];
      const pts = [[PICK_AT.x, PICK_AT.z], [PICK_AT.x + side * 0.3, -6.7]];
      if (far) pts.push([PICK_AT.x + side * 1.9, laneOut], [rx - side * 1.5, laneOut]);
      const shelfAt = pts.length;
      pts.push([rx, STAND]);
      if (far) pts.push([rx - side * 1.5, laneBack], [PICK_AT.x + side * 2.3, laneBack]);
      pts.push([PICK_AT.x + side * 1.0, -6.5]);
      const path = track(pts);
      const sShelf = path.at(shelfAt);
      const speed = Math.max(PACE, path.total / (period - PICK - PLACE));
      const out = sShelf / speed;
      const back = (path.total - sShelf) / speed;
      return {
        w: worker(), path, period, sShelf, out, back, tidy: period - PICK - PLACE - out - back, offset: -pickup,
        files: Array.from({ length: LOOP / period }, (_, j) => {
          const mesh = new THREE.Mesh(fileGeo, page());
          scene.add(mesh);
          return { mesh, slot: new THREE.Vector3(rx + (j ? 0.3 : -0.3), LEVELS[1] + 0.47, WALL_Z + 0.05) };
        }),
        tone: new THREE.Color(rack === REVIEW ? C.review : C.filed),
        review: rack === REVIEW,
        at: { x: 0, z: 0, yaw: 0 }, hands: new THREE.Vector3(), lt: 0,
      };
    };
    const carriers = [];
    ORDER.forEach((rack, q) => {
      if (NEAR.has(rack)) carriers.push(carrier(rack, LOOP / 2, q * BEAT));
      else {
        const pair = [carrier(rack, LOOP, q * BEAT), carrier(rack, LOOP, (q + ORDER.length) * BEAT)];
        pair[1].files[0].slot.x += 0.6;
        carriers.push(...pair);
      }
    });

    const paperTone = new THREE.Color(C.paper);
    const readTone = new THREE.Color(C.paper).lerp(new THREE.Color(C.filed), 0.45);
    const pulse = { control: 0, read: 0, quality: 0, warn: 0 };
    const tmp = new THREE.Vector3();

    const moveCarrier = (c, time) => {
      const lt = mod(time + c.offset, c.period);
      c.lt = lt;
      let s = 0;
      let carry = 0;
      let reach = 0;
      let bend = 0;
      let face = null; // [angle, weight] while standing at the line or the shelf
      let moving = 0;
      const tOut = PICK;
      const tPlace = tOut + c.out;
      const tTidy = tPlace + PLACE;
      const tBack = tTidy + c.tidy;
      if (lt < tOut) {
        const k = lt / PICK;
        reach = Math.sin(Math.PI * smooth(k / 0.7)) * 0.25;
        carry = smooth(k / 0.3);
        face = [0, smooth(k / 0.2) * (1 - smooth((k - 0.8) / 0.2))];
      } else if (lt < tPlace) {
        const k = (lt - tOut) / c.out;
        s = c.sShelf * ramp(k);
        carry = 1;
        moving = clamp(Math.min(k, 1 - k) / 0.08);
      } else if (lt < tBack) {
        s = c.sShelf;
        const k = (lt - tPlace) / PLACE;
        carry = 1 - smooth((k - 0.62) / 0.3);
        reach = smooth(k / 0.3) * (1 - smooth((k - 0.62) / 0.3));
        if (lt >= tTidy) {
          // time to spare before the next file: straighten what is already on the shelf
          const j = (lt - tTidy) / Math.max(0.01, c.tidy);
          const busy = smooth(j / 0.12) * (1 - smooth((j - 0.85) / 0.15));
          carry = busy;
          reach = busy * (0.55 + 0.35 * Math.sin((lt - tTidy) * 4.2));
        }
        const all = (lt - tPlace) / (tBack - tPlace);
        face = [Math.PI, smooth(all / 0.12) * (1 - smooth((all - 0.9) / 0.1))];
      } else {
        const k = (lt - tBack) / c.back;
        s = c.sShelf + (c.path.total - c.sShelf) * ramp(k);
        moving = clamp(Math.min(k, 1 - k) / 0.08);
      }
      const at = c.path.place(s, c.at);
      const yaw = face ? turn(at.yaw, face[0], face[1]) : at.yaw;
      at.yaw = yaw;
      c.w.root.position.set(at.x, 0, at.z);
      c.w.root.rotation.y = yaw;
      pose(c.w, s * 3.3, moving, carry, reach, bend);
      const bob = Math.abs(Math.cos(s * 3.3)) * 0.05 * moving;
      c.hands.set(at.x + Math.sin(yaw) * 0.68, BODY_Y - 0.06 + bob + reach * 0.75, at.z + Math.cos(yaw) * 0.68);
    };

    const moveFile = (c, f, j, time) => {
      const ft = mod(time + c.offset - j * c.period, LOOP); // 0 when its worker starts taking it off the line
      const m = f.mesh;
      const tPlace = PICK + c.out;
      let read = 1; // how far it is from loose paper to its final colour
      m.scale.setScalar(1);
      m.rotation.set(0, 0, 0);
      if (ft < PICK) {
        m.position.copy(lineEnd).lerp(c.hands, smooth((ft / PICK - 0.2) / 0.6));
        m.rotation.y = c.at.yaw * smooth((ft / PICK - 0.2) / 0.6);
      } else if (ft < tPlace) {
        m.position.copy(c.hands);
        m.rotation.y = c.at.yaw;
      } else if (ft < tPlace + PLACE) {
        const u = smooth(((ft - tPlace) / PLACE - 0.28) / 0.4);
        m.position.copy(c.hands).lerp(f.slot, u);
        m.rotation.set(0, Math.PI, (u * Math.PI) / 2);
      } else if (ft < LOOP - RIDE) {
        // on the shelf, then pushed back out of sight before the same file starts again as a new one
        const away = smooth((ft - FADE0) / 1.1);
        m.position.copy(f.slot);
        m.position.z -= away * 0.5;
        m.rotation.set(0, Math.PI, Math.PI / 2);
        m.scale.setScalar(1 - away);
      } else {
        const u = (ft - (LOOP - RIDE)) / RIDE;
        const x = lerp(LINE_X0, LINE_X1, u);
        m.position.copy(heapTop).lerp(tmp.set(x, lineStart.y, LINE_Z), smooth(u / 0.05));
        m.scale.setScalar(smooth(u / 0.03));
        // a tap from the press at quality
        const tap = bell(x - STATION.quality, 0.35);
        m.position.y -= tap * 0.03;
        read = smooth((STATION.read + 0.3 - x) / 0.6) * 0.45 + smooth((STATION.quality + 0.2 - x) / 0.4) * 0.55;
        pulse.control = Math.max(pulse.control, bell(x - STATION.control, 0.7));
        pulse.read = Math.max(pulse.read, bell(x - STATION.read, 0.8));
        const q = bell(x - STATION.quality, 0.6);
        if (q > pulse.quality) { pulse.quality = q; pulse.warn = c.review ? 1 : 0; }
      }
      if (read < 0.45) m.material.color.copy(paperTone).lerp(readTone, read / 0.45);
      else m.material.color.copy(readTone).lerp(c.tone, (read - 0.45) / 0.55);
    };

    // ---- the lift to the higher shelves
    [-0.85, 0.85].forEach((dx) => box(scene, C.steel, 0.12, RACK_H - 0.6, 0.12, LIFT_X + dx, (RACK_H - 0.6) / 2, STAND - 0.6));
    const platform = box(scene, C.beam, 1.6, 0.1, 1.4, LIFT_X, 0.1, STAND + 0.1);
    const lifter = stand(LIFT_X, STAND + 0.1, Math.PI);
    const liftFile = new THREE.Mesh(fileGeo, mat(C.filed));
    scene.add(liftFile);
    const liftSlot = new THREE.Vector3(LIFT_X, LEVELS[3] + 0.47, WALL_Z + 0.05);

    // ---- the big files and the forklifts that move them
    const crate = (parent = scene) => {
      const g = new THREE.Group();
      box(g, C.paper, 1.1, 0.95, 0.95, 0, 0, 0);
      box(g, C.filed, 1.13, 0.2, 0.98, 0, 0.16, 0);
      box(g, C.dark, 0.5, 0.16, 0.99, -0.2, -0.2, 0);
      parent.add(g);
      return g;
    };
    const pallet = (x, z) => box(scene, C.wood, 1.35, 0.14, 1.2, x, 0.07, z);
    pallet(BIG_BAY.x, BIG_BAY.z);
    pallet(BIG_BAY.x + 1.7, BIG_BAY.z - 0.2);
    crate().position.set(BIG_BAY.x + 1.7, 0.615, BIG_BAY.z - 0.2);
    crate().position.set(BIG_BAY.x + 1.75, 1.57, BIG_BAY.z - 0.15);
    STACKS.forEach((x) => { pallet(x, STACK_Z); crate().position.set(x, 0.615, STACK_Z); });
    crate().position.set(STACKS[1], 1.57, STACK_Z);

    const wheelGeo = geo(new THREE.CylinderGeometry(0.26, 0.26, 0.2, 14));
    const beaconOn = keep(new THREE.MeshBasicMaterial({ color: 0xffb347, fog: false }));
    const forklift = (stackX, offset) => {
      const root = new THREE.Group();
      if (!shadows) {
        const under = part(kit.shadow, kit.shade, root, 0, 0.02, 0.1);
        under.rotation.x = -Math.PI / 2;
        under.scale.set(1.5, 2.2, 1);
      }
      box(root, C.truck, 1.3, 0.55, 1.9, 0, 0.5, 0);
      box(root, C.dark, 1.32, 0.8, 0.5, 0, 0.62, -0.8);
      [[-0.58, 0.55], [0.58, 0.55], [-0.58, -0.6], [0.58, -0.6]].forEach(([x, z]) => box(root, C.dark, 0.07, 1.5, 0.07, x, 1.5, z));
      box(root, C.dark, 1.3, 0.06, 1.3, 0, 2.27, -0.02);
      [-0.42, 0.42].forEach((x) => box(root, C.steel, 0.1, 2.5, 0.1, x, 1.35, 1.0));
      box(root, C.steel, 0.94, 0.1, 0.1, 0, 2.55, 1.0);
      [[-0.68, 0.6], [0.68, 0.6], [-0.68, -0.62], [0.68, -0.62]].forEach(([x, z]) => {
        const wheel = part(wheelGeo, mat(C.tyre), root, x, 0.26, z);
        wheel.rotation.z = Math.PI / 2;
      });
      const beacon = part(kit.ball, beaconOn, root, 0.45, 2.36, -0.5);
      halo(beacon, 0, 0, 0, 1.9, 0xffb347).opacity = 0.5;
      const forks = new THREE.Group();
      box(forks, C.steel, 1.0, 0.5, 0.06, 0, 0.28, 1.09);
      [-0.3, 0.3].forEach((x) => box(forks, C.roller, 0.14, 0.06, 1.15, x, 0, 1.66));
      root.add(forks);
      const driver = worker(root, true);
      driver.root.position.set(0, 0.4, -0.12);
      pose(driver, 0, 0, 1, -0.55, 0.06);
      scene.add(root);
      const path = track([
        [BIG_BAY.x, 1.0], // stop: the bay, nose towards it
        [24.6, FORK_OUT], [stackX + 2.8, FORK_OUT],
        [stackX, STACK_Z - 2.52], // stop: the stack, nose towards it
        [stackX + 2.8, FORK_BACK], [24.6, FORK_BACK],
      ]);
      return { root, forks, beacon, path, sStack: path.at(3), offset, load: crate(), top: new THREE.Vector3(stackX, 1.57, STACK_Z), at: { x: 0, z: 0, yaw: 0 } };
    };
    const forkStacks = [STACKS[0], STACKS[2]];
    const trucks = small ? [forklift(forkStacks[1], 0)] : [forklift(forkStacks[1], 0), forklift(forkStacks[0], 15)];
    const bayAt = new THREE.Vector3(BIG_BAY.x, 0.615, BIG_BAY.z);
    const AT_BAY = 3.2;
    const AT_STACK = 3.8;

    const moveTruck = (t, time) => {
      const lt = mod(time + t.offset, LOOP);
      const drive = LOOP - AT_BAY - AT_STACK;
      const out = (drive * t.sStack) / t.path.total;
      let s = 0;
      let nose = 0; // how far it has pushed in towards the bay or the stack
      let lift = 0.12;
      let held = false;
      let shown = 1;
      let onStack = false;
      if (lt < AT_BAY) {
        const k = lt / AT_BAY;
        nose = smooth(k / 0.3) - smooth((k - 0.5) / 0.3);
        lift = lerp(0.08, 0.5, smooth((k - 0.3) / 0.2));
        held = k > 0.3;
      } else if (lt < AT_BAY + out) {
        s = t.sStack * ramp((lt - AT_BAY) / out, 0.14);
        lift = 0.5;
        held = true;
      } else if (lt < AT_BAY + out + AT_STACK) {
        const k = (lt - AT_BAY - out) / AT_STACK;
        s = t.sStack;
        nose = smooth((k - 0.25) / 0.25) - smooth((k - 0.62) / 0.25);
        lift = lerp(0.5, 1.2, smooth(k / 0.25)) - 0.17 * smooth((k - 0.5) / 0.08) - 0.75 * smooth((k - 0.87) / 0.13);
        held = k < 0.56;
        onStack = !held;
      } else {
        const k = (lt - AT_BAY - out - AT_STACK) / (drive - out);
        s = t.sStack + (t.path.total - t.sStack) * ramp(k, 0.14);
        lift = lerp(0.28, 0.08, smooth(k / 0.3));
        // the big file stays on the stack for a while, then the next one is waiting at the bay
        onStack = k < 0.62;
        shown = onStack ? 1 - smooth((k - 0.48) / 0.14) : smooth((k - 0.72) / 0.14);
      }
      const at = t.path.place(s, t.at);
      const x = at.x + Math.sin(at.yaw) * nose * 0.9;
      const z = at.z + Math.cos(at.yaw) * nose * 0.9;
      t.root.position.set(x, 0, z);
      t.root.rotation.y = at.yaw;
      t.forks.position.y = lift;
      t.beacon.visible = mod(time, 1) < 0.5;
      if (held) {
        t.load.position.set(x + Math.sin(at.yaw) * 1.62, lift + 0.535, z + Math.cos(at.yaw) * 1.62);
        t.load.rotation.y = at.yaw;
      } else {
        t.load.position.copy(onStack ? t.top : bayAt);
        t.load.rotation.y = onStack ? 0 : Math.PI;
      }
      t.load.scale.setScalar(Math.max(0.001, shown));
    };

    const hands = new THREE.Vector3();
    const others = (time) => {
      // arrivo: one puts a file on the rollers on every beat, one keeps the pile together
      const beat = mod((time - (LOOP - RIDE)) / BEAT + 0.5, 1) - 0.5; // 0 when a file starts its ride
      const put = bell(beat, 0.2);
      pose(loader, 0, 0, 0.6 + put * 0.4, -0.35 + put * 0.2, put * 0.5);
      pose(tidier, 0, 0, 0.9, -0.5, Math.sin(mod(time, 3) / 3 * Math.PI) * 0.9);
      // controllo: a look at every file that goes by
      pose(checker, 0, 0, 0.85, -0.55, pulse.control * 0.55);
      controlLamp.color.setHex(C.mint).multiplyScalar(0.25 + pulse.control * 0.75);
      controlHalo.opacity = pulse.control * 0.5;
      // lettura: typing, and the curtain lights up
      const tap = Math.sin((time * Math.PI * 2) / 0.6);
      pose(reader, 0, 0, 1, -0.75, 0.12);
      reader.armL.rotation.x += tap * 0.12;
      reader.armR.rotation.x -= tap * 0.12;
      veilMat.opacity = 0.05 + pulse.read * 0.32;
      readHalo.opacity = 0.1 + pulse.read * 0.4;
      readLamp.color.setHex(C.mint).multiplyScalar(0.5 + pulse.read * 0.5);
      screenMat.color.setHex(C.mint).multiplyScalar(0.55 + pulse.read * 0.45);
      // qualità: the press comes down, the light says ok or "da rivedere"
      press.position.y = 2.55 - Math.pow(pulse.quality, 3) * 1.18;
      qualityLamp.color.setHex(pulse.warn ? C.review : C.mint).multiplyScalar(0.25 + pulse.quality * 0.75);
      qualityHalo.color.setHex(pulse.warn ? C.review : C.mint);
      qualityHalo.opacity = pulse.quality * 0.55;
      pose(inspector, 0, 0, 0.85, -0.3 + pulse.quality * 0.5, pulse.quality * 0.2);
      // the lift: load, go up, put the file on the fourth shelf, come down; twice in a loop
      const k = mod(time, 15) / 15;
      const up = smooth((k - 0.1) / 0.3) * (1 - smooth((k - 0.58) / 0.3));
      const y = 0.1 + up * (LEVELS[3] - 1.35);
      platform.position.y = y;
      lifter.root.position.y = y + 0.05;
      const give = smooth((k - 0.42) / 0.1);
      const reach = give * (1 - smooth((k - 0.54) / 0.06));
      pose(lifter, 0, 0, smooth(k / 0.06) * (1 - smooth((k - 0.5) / 0.08)), reach, 0);
      hands.set(LIFT_X, y + 0.05 + BODY_Y - 0.06 + reach * 0.75, STAND + 0.1 - 0.68);
      liftFile.position.copy(hands).lerp(liftSlot, give);
      liftFile.rotation.set(0, 0, (give * Math.PI) / 2);
      liftFile.scale.setScalar(Math.max(0.001, smooth(k / 0.05) * (1 - smooth((k - 0.86) / 0.1))));
      liftFile.position.z -= smooth((k - 0.86) / 0.1) * 0.5;
      // the belt that feeds the pile
      onBelt.forEach((m, i) => {
        const u = mod(time / 6 + i / onBelt.length, 1);
        if (u < 0.86) {
          m.position.copy(beltA).lerp(beltB, u / 0.86);
          m.position.y += 0.1;
          m.rotation.copy(belt.rotation);
          m.rotation.y += i * 0.7;
          m.scale.setScalar(1);
        } else {
          const v = (u - 0.86) / 0.14;
          m.position.copy(beltB).lerp(heapTop, v);
          m.position.y += 0.1 + Math.sin(v * Math.PI) * 0.6;
          m.rotation.set(v * 2.4 + i, i * 0.7, v * 1.7);
          m.scale.setScalar(Math.max(0.001, 1 - smooth((v - 0.7) / 0.3)));
        }
      });
    };

    if (shadows) {
      scene.traverse((o) => {
        if (o.isMesh && o.material.isMeshLambertMaterial) { o.castShadow = true; o.receiveShadow = true; }
      });
      floor.castShadow = false;
    }

    // ---- the names: folders over the racks, departments over the line; drawn once the mono face is in
    const fade = [];
    const sign = (text, color, x, y, z, from) => {
      const { tex, w, h } = labelTexture(text, color);
      const m = keep(new THREE.SpriteMaterial({ map: keep(tex), transparent: true, opacity: 0, depthTest: false, depthWrite: false, fog: false }));
      const spr = new THREE.Sprite(m);
      spr.scale.set(w, h, 1);
      spr.position.set(x, y, z);
      spr.renderOrder = 10;
      const lm = keep(new THREE.LineBasicMaterial({ color: 0xe3e2da, transparent: true, opacity: 0, fog: false }));
      const line = new THREE.Line(geo(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, from, z), new THREE.Vector3(x, y - h / 2, z)])), lm);
      scene.add(spr, line);
      fade.push([m, 1], [lm, 0.3]);
    };
    const addSigns = () => {
      if (disposed) return;
      FOLDERS.forEach((f, i) => {
        if (small && i % 2) return;
        sign(f.split("/").pop(), i === REVIEW ? "#e6b35a" : "#c5c6bd", rackX(i), RACK_H + 1.1, WALL_Z, RACK_H);
      });
      const dept = "#bdf5de";
      sign("arrivo", dept, HEAP.x, 3.9, HEAP.z, 1.7);
      sign("controllo", dept, STATION.control, 3.5, LINE_Z, 2.5);
      sign("lettura", dept, STATION.read, 4.4, LINE_Z, 3.2);
      sign("qualità", dept, STATION.quality, 4.2, LINE_Z, 3.2);
      sign("smistamento", dept, LINE_X1 - 0.4, 3.0, LINE_Z, 1.3);
      if (!small) sign("file grandi", dept, STACKS[1], 3.6, STACK_Z, 2.1);
    };

    // ---- camera: straight lines stay straight (no perspective), looking down from the front right
    const dir = new THREE.Vector3(1, 0.82, 1).normalize();
    const spin = new THREE.Vector3();
    const aim = new THREE.Vector3();
    const focus = new THREE.Vector3(12, 1.2, LINE_Z); // the opening starts close on the line, then pulls back
    let devZoom = 1;
    let W = 1;
    let H = 1;
    let beside = true; // the scene is the ground of the hero, beside the words
    const resize = () => {
      W = el.clientWidth || 1;
      H = el.clientHeight || 1;
      renderer.setSize(W, H, false);
      const aspect = W / H;
      const wide = W >= 900 && aspect > 1.15;
      beside = wide;
      // wide: the scene takes the right of the screen, beside the words; narrow: it has a block of its own under
      // them, and on a phone the far ends run off the sides
      const tall = wide ? Math.max(28.5, 47.5 / aspect) : Math.max(28, 21 / aspect);
      camera.top = tall / 2;
      camera.bottom = -tall / 2;
      camera.right = (tall * aspect) / 2;
      camera.left = -camera.right;
      camera.setViewOffset(W, H, wide ? -0.18 * W : 0, wide ? -0.045 * H : 0, W, H);
      camera.updateProjectionMatrix();
    };

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduce && !small) window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let visible = true;
    let born = 0;
    let lastDim = -1;
    const draw = (now) => {
      if (!born) born = now;
      const time = reduce ? 9.2 : (now - born) / 1000;
      // the opening: the lamps come on one after the other, then the signs
      const on = reduce ? 1 : ease(clamp((now - born - 150) / 1900));
      hemi.intensity = 2.3 * (0.12 + 0.88 * on);
      sun.intensity = 2.4 * on;
      pools.forEach((m, k) => (m.opacity = 0.2 * smooth((reduce ? 1 : (now - born - 150) / 1900) * pools.length - k)));
      const signs = reduce ? 1 : smooth((now - born - 2300) / 700);
      fade.forEach(([m, full]) => (m.opacity = full * signs));
      const open = reduce ? 1 : ease(clamp((now - born - 100) / 2700));
      const zoom = devZoom * (1 + (1 - open) * 0.22);
      if (zoom !== camera.zoom) { camera.zoom = zoom; camera.updateProjectionMatrix(); }
      ledMats[0].color.setHex(C.mint).multiplyScalar(0.5 * on);
      ledMats[1].color.setHex(C.mint).multiplyScalar((0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * Math.PI))) * on);
      crew.forEach((w) => {
        const shut = mod(time / w.every + w.phase, 1) * w.every < 0.13;
        w.eyes[0].scale.y = w.eyes[1].scale.y = shut ? 0.1 : 0.88;
      });

      pulse.control = pulse.read = pulse.quality = pulse.warn = 0;
      carriers.forEach((c) => {
        moveCarrier(c, time);
        c.files.forEach((f, j) => moveFile(c, f, j, time));
      });
      trucks.forEach((t) => moveTruck(t, time));
      others(time);

      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      // the pointer turns the view a little; scrolling away, the picture lags behind the page and dims
      const gone = beside ? clamp(window.scrollY / Math.max(1, H)) : 0;
      spin.copy(dir).applyAxisAngle(THREE.Object3D.DEFAULT_UP, pointer.x * 0.035);
      spin.y += pointer.y * -0.02;
      aim.copy(focus).lerp(target, open);
      camera.position.copy(aim).addScaledVector(spin, 60);
      camera.position.y += gone * 4;
      camera.lookAt(aim);
      const dim = Math.round((1 - gone * 0.8) * 50) / 50;
      if (dim !== lastDim) { lastDim = dim; renderer.domElement.style.opacity = String(dim); }
      renderer.render(scene, camera);
    };
    const loop = (now) => {
      raf = 0;
      if (disposed || !visible || document.hidden) return;
      draw(now);
      if (!reduce) raf = requestAnimationFrame(loop);
    };
    const wake = () => { if (!raf && !disposed) raf = requestAnimationFrame(loop); };

    const ro = new ResizeObserver(() => { resize(); wake(); });
    ro.observe(el);
    resize();
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); });
    io.observe(el);
    document.addEventListener("visibilitychange", wake);
    (document.fonts?.load('500 22px "Geist Mono"') || Promise.resolve()).catch(() => {}).then(() => { addSigns(); wake(); });
    wake();

    // for checking a frame by hand while developing: __scene(seconds, zoom, [x, y, z]) draws that moment of the loop
    if (import.meta.env.DEV) {
      const home = target.clone();
      window.__scene = (s = 9, zoom = 1, at = null) => {
        born = performance.now() - s * 1000;
        devZoom = zoom;
        target.copy(home);
        if (at) target.set(...at);
        draw(performance.now());
      };
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", wake);
      window.removeEventListener("pointermove", onMove);
      bin.forEach((x) => x.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="flow" ref={host} aria-hidden="true"></div>;
}
