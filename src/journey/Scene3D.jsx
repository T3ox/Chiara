import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FILES, FOLDERS, STATIONS } from "./data";
import { flight, state, subscribe } from "./engine";
import RoadRibbon from "./road";

/*
  The 3D road. One WebGL canvas fixed behind the journey.
  - The road is a Catmull-Rom curve through one waypoint per station: it runs left to right with the page,
    swings into depth (z) and climbs and falls (y).
  - The camera rides it: the scroll position picks a point on the curve between the two stations on screen.
  - Each station is a gate (a thin ring and its number); the nine files are cards that float in a tangle at the
    start, line up on the road while they are processed and fly into their folder towers at the end.
  Everything is driven by scroll, so nothing moves on its own except the rings' slow turn and the cards' bob.
*/

const ACCENT = new THREE.Color("#9fc7b8");
const WARN = new THREE.Color("#e6b35a");
const BG = new THREE.Color("#0b0f0e");

const smooth = (x) => x * x * (3 - 2 * x);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// waypoints: forward on x, into depth on z, up and down on y
const WAYPOINTS = [
  [0, 1.5, 0], [26, 4.5, -10], [52, 2, -22], [78, 7, -12], [104, 3.5, 4],
  [130, 9, -6], [156, 5, -20], [182, 10, -8], [208, 6, 6], [236, 3, -4],
].map(([x, y, z]) => new THREE.Vector3(x, y, z));

const KIND_COLOR = { PDF: "#e5786d", DOCX: "#6aa2f0", DOC: "#6aa2f0", XLSX: "#5fc28a", NUMBERS: "#5fc28a", IMAGE: "#e6b35a" };

function textCanvas(draw, w, h) {
  const c = document.createElement("canvas");
  const dpr = 2;
  c.width = w * dpr;
  c.height = h * dpr;
  const g = c.getContext("2d");
  g.scale(dpr, dpr);
  draw(g, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function fileCard(file) {
  return textCanvas((g, w, h) => {
    roundRect(g, 1, 1, w - 2, h - 2, 14);
    g.fillStyle = "rgba(22,28,26,0.92)";
    g.fill();
    g.strokeStyle = "rgba(227,226,218,0.22)";
    g.lineWidth = 2;
    g.stroke();
    roundRect(g, 14, 14, 44, 52, 7);
    g.fillStyle = KIND_COLOR[file.kind] || "#9fc7b8";
    g.fill();
    g.fillStyle = "#0b0f0e";
    g.font = "600 13px 'Geist Mono', monospace";
    g.textAlign = "center";
    g.fillText(file.kind.slice(0, 4), 36, 46);
    g.textAlign = "left";
    g.fillStyle = "#e3e2da";
    g.font = "500 17px 'Mona Sans', sans-serif";
    const name = file.name.length > 24 ? `${file.name.slice(0, 23)}…` : file.name;
    g.fillText(name, 72, 36);
    g.fillStyle = "#8e948d";
    g.font = "400 13px 'Geist Mono', monospace";
    g.fillText(file.size, 72, 58);
  }, 300, 80);
}

function label(text, sub, color = "#e3e2da") {
  return textCanvas((g, w) => {
    g.fillStyle = color;
    g.font = "500 64px 'Geist Mono', monospace";
    g.fillText(text, 0, 64);
    if (sub) {
      g.fillStyle = "rgba(227,226,218,0.75)";
      g.font = "500 26px 'Mona Sans', sans-serif";
      g.fillText(sub, 4, 104);
    }
    g.fillStyle = color;
    g.fillRect(0, 118, Math.min(w, 120), 3);
  }, 420, 124);
}

function towerLabel(text) {
  return textCanvas((g) => {
    g.fillStyle = "#e3e2da";
    g.font = "500 22px 'Geist Mono', monospace";
    g.fillText(text, 0, 26);
  }, 360, 34);
}

export default function Scene3D() {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: (window.devicePixelRatio || 1) < 1.5, alpha: true, powerPreference: "high-performance" });
    } catch {
      // no WebGL: the CSS ground stays, the page works without the road
      el.classList.add("is-fallback");
      return undefined;
    }
    let disposed = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.innerWidth < 760;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setClearColor(BG, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(BG, 0.016);
    const camera = new THREE.PerspectiveCamera(phone ? 62 : 48, 1, 0.1, 400);

    const disposables = [];
    const keep = (o) => (disposables.push(o), o);
    // every texture with text in it: drawn now, drawn again once the web fonts are in (one path for all of them)
    const painted = [];
    const paint = (mat, make) => {
      painted.push({ mat, make });
      mat.map = make();
      return mat;
    };
    const repaint = () => painted.forEach((p) => {
      const old = p.mat.map;
      p.mat.map = p.make();
      p.mat.needsUpdate = true;
      old?.dispose();
    });

    // ---- the road
    const curve = new THREE.CatmullRomCurve3(WAYPOINTS, false, "catmullrom", 0.35);
    const road = keep(new RoadRibbon(curve));
    scene.add(road.mesh);

    // ---- station gates: one thin ring standing across the road, its number floating above
    const ringGeo = keep(new THREE.TorusGeometry(2.2, 0.03, 12, 128));
    const gates = STATIONS.map((st, i) => {
      const t = i / (STATIONS.length - 1);
      const p = curve.getPoint(t);
      const tng = curve.getTangent(t);
      const g = new THREE.Group();
      g.position.copy(p);
      g.lookAt(p.clone().add(tng));
      const ringMat = keep(new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
      const ring = new THREE.Mesh(ringGeo, ringMat);
      g.add(ring);
      scene.add(g);
      const sprMat = paint(keep(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, opacity: 0.55 })), () => label(st.n, st.short));
      const spr = new THREE.Sprite(sprMat);
      spr.scale.set(4.2, 1.24, 1);
      spr.center.set(0, 0);
      spr.position.set(p.x + 0.6, p.y + 2.9, p.z);
      scene.add(spr);
      // the start and the end have their own content on screen: no gate there
      if (i === 0 || i === STATIONS.length - 1) { g.visible = false; spr.visible = false; }
      return { ring, ringMat, sprMat, t };
    });

    // ---- folder towers at the end of the road
    // one tower per destination folder, named by its last part
    const towerNames = FOLDERS.map((f) => f.split("/").pop());
    const end = curve.getPoint(1);
    const towers = towerNames.map((n, i) => {
      const angle = -0.9 + (i / (towerNames.length - 1)) * 1.8;
      const r = 13;
      const pos = new THREE.Vector3(end.x + Math.cos(angle) * r * 0.6 + 6, -3, end.z + Math.sin(angle) * r);
      const h = 3 + (i % 3) * 1.6;
      const geo = keep(new THREE.BoxGeometry(2.6, h, 2.6));
      const isRev = n === "DaRevisionare";
      const mat = keep(new THREE.MeshBasicMaterial({ color: isRev ? 0x2a2216 : 0x15201c, transparent: true, opacity: 0.85 }));
      const box = new THREE.Mesh(geo, mat);
      box.position.set(pos.x, pos.y + h / 2, pos.z);
      scene.add(box);
      const edges = new THREE.LineSegments(keep(new THREE.EdgesGeometry(geo)), keep(new THREE.LineBasicMaterial({ color: isRev ? WARN : ACCENT, transparent: true, opacity: 0.55 })));
      edges.position.copy(box.position);
      scene.add(edges);
      const lm = paint(keep(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, opacity: 0.8 })), () => towerLabel(n));
      const ls = new THREE.Sprite(lm);
      ls.scale.set(5.4, 0.51, 1);
      ls.center.set(0.5, 0);
      ls.position.set(pos.x, pos.y + h + 0.5, pos.z);
      scene.add(ls);
      return { top: new THREE.Vector3(pos.x, pos.y + h, pos.z), stack: 0, edges, base: new THREE.Color(isRev ? WARN : ACCENT), landed: 0 };
    });

    // ---- the nine files
    const start = curve.getPoint(1 / 9);
    const cards = FILES.map((f, k) => {
      const mat = paint(keep(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, opacity: 0.95 })), () => fileCard(f));
      const spr = new THREE.Sprite(mat);
      spr.scale.set(3.75, 1, 1);
      scene.add(spr);
      const seed = k * 1.731;
      const chaos = new THREE.Vector3(
        start.x - 6 + ((k * 37) % 13),
        start.y + 1 + ((k * 53) % 7) * 0.9,
        start.z - 4 + ((k * 29) % 11),
      );
      const tower = towers[FOLDERS.indexOf(f.folder)];
      const slot = tower.stack++;
      const home = tower.top.clone().add(new THREE.Vector3(0, 0.7 + slot * 1.15, 0));
      return { spr, seed, chaos, home, tower, file: f, fl: 0 };
    });

    // ---- scroll -> curve parameter, aligned so each station's gate is reached as its panel arrives
    const stationP = () => state.stations.map((s) => clamp(s.left / state.max));
    let sp = stationP();
    const curveT = (p) => {
      const n = sp.length;
      if (n < 2) return p;
      if (p <= sp[0]) return 0;
      for (let i = 0; i < n - 1; i++) {
        if (p <= sp[i + 1]) {
          const f = (p - sp[i]) / Math.max(1e-6, sp[i + 1] - sp[i]);
          return (i + f) / (n - 1);
        }
      }
      return 1;
    };

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    // the last time the visitor did something: after IDLE_MS without input the scene stops drawing
    const IDLE_MS = 4000;
    let lastInput = performance.now();
    const onMove = (e) => {
      lastInput = performance.now();
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduce && !phone) window.addEventListener("pointermove", onMove);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      sp = stationP();
    };
    resize();
    window.addEventListener("resize", resize);

    let tSmooth = curveT(state.x / state.max);
    let raf = 0;
    let running = true;
    const camPos = new THREE.Vector3();
    const look = new THREE.Vector3();
    const v = new THREE.Vector3();
    const clock = new THREE.Clock();
    const chaosTmp = new THREE.Vector3();
    const WHITE = new THREE.Color(0xffffff);
    const edgeTmp = new THREE.Color();
    let idleTick = 0;
    let settling = false; // a card still easing toward its flight value (set in the previous frame)

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      const target = curveT(clamp(state.x / state.max));
      const moving = settling || Math.abs(target - tSmooth) > 1e-5 || Math.abs(mouse.tx - mouse.x) > 0.002 || Math.abs(mouse.ty - mouse.y) > 0.002;
      // at rest only the ambient motion is left (the road's flowing light, the rings): half the frame rate for
      // a few seconds, then nothing until the next scroll or pointer move; nothing at all under reduced motion
      if (!moving) {
        if (reduce || performance.now() - lastInput > IDLE_MS) return;
        idleTick = (idleTick + 1) % 2;
        if (idleTick) return;
      }
      const time = clock.getElapsedTime();
      tSmooth += (target - tSmooth) * (reduce ? 1 : 0.14);
      const t = tSmooth;

      // camera: behind and above the point, a little to the side, looking a bit ahead
      const p = curve.getPoint(Math.min(1, t));
      const ahead = curve.getPoint(Math.min(1, t + 0.07));
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const endPull = smooth(clamp((t - 0.86) / 0.14));
      camPos.set(p.x - 12 + mouse.x * 1.5, p.y + 10 + endPull * 5 - mouse.y, p.z + 22 + endPull * 8);
      camera.position.lerp(camPos, reduce ? 1 : 0.18);
      look.copy(ahead).add(v.set(2 + endPull * 2, 3.5, -4));
      camera.lookAt(look);

      // the road: lit up to the current point, light flowing along the lit part
      road.update(t, reduce ? 0 : time);

      // gates: the near one bright and turning slowly
      gates.forEach((g, i) => {
        const d = Math.abs(t - g.t) * (STATIONS.length - 1);
        const near = clamp(1 - d);
        const passed = t >= g.t - 0.002;
        g.ringMat.opacity = 0.18 + near * 0.7 + (passed ? 0.12 : 0);
        g.sprMat.opacity = 0.35 + near * 0.65;
        g.ring.rotation.z = (reduce ? 0 : time * 0.15) + i;
        const s = 1 + near * 0.12;
        g.ring.scale.setScalar(s);
      });

      // cards: tangle -> queue on the road -> their tower
      const qStart = 2 / 9;
      towers.forEach((tw) => (tw.landed = 0));
      settling = false;
      cards.forEach((c, k) => {
        const bob = reduce ? 0 : Math.sin(time * 0.9 + c.seed) * 0.18;
        const toQueue = smooth(clamp((t - qStart + 0.06) / 0.1));
        // the flight ends on the frame the demo shows the file in its folder and the HUD counts it (engine.flight);
        // eased toward the scroll at the camera's rate, so the card and the road move as one
        const fl = flight(c.file);
        c.fl += (fl - c.fl) * (reduce ? 1 : 0.14);
        if (Math.abs(fl - c.fl) > 1e-4) settling = true;
        const toHome = smooth(c.fl);
        c.tower.landed = Math.max(c.tower.landed, toHome);
        const qt = Math.min(0.995, t + 0.018 + k * 0.011);
        const qp = curve.getPoint(qt);
        const queue = v.set(qp.x, qp.y + 1.25 + (k % 2) * 0.35, qp.z + 0.4);
        const a = chaosTmp.copy(c.chaos);
        if (!reduce) { a.x += Math.sin(time * 0.3 + c.seed) * 0.6; a.y += Math.cos(time * 0.4 + c.seed) * 0.4; }
        const mid = a.lerp(queue, toQueue);
        mid.lerp(c.home, toHome);
        mid.y += bob * (1 - toHome);
        c.spr.position.copy(mid);
        const near = 1 - toHome * 0.15;
        c.spr.scale.set(3.75 * near, 1 * near, 1);
      });
      towers.forEach((tw) => {
        tw.edges.material.opacity = 0.25 + endPull * 0.25 + tw.landed * 0.5;
        if (reduce || tw.landed < 0.7) {
          tw.edges.material.color.copy(tw.base);            // before the landing's last 30%: base colour
        } else {
          const settle = smooth(clamp((tw.landed - 0.7) / 0.3)); // 0 at landed 0.7 -> 1 at landed 1
          tw.edges.material.color.copy(edgeTmp.copy(WHITE).lerp(tw.base, settle)); // white, easing back to base
        }
      });

      renderer.render(scene, camera);
    };

    // labels and cards are canvas text: start once the web fonts are in, so no fallback face is baked in;
    // never start (or touch the GPU) after the component has gone
    (document.fonts?.ready || Promise.resolve()).then(() => {
      if (disposed) return;
      repaint();
      sp = stationP();
      frame();
    });

    // the stations are re-measured on resize and font load: follow them only when they really change
    let lastStations = state.stations;
    const unsub = subscribe(() => {
      lastInput = performance.now();
      if (state.stations !== lastStations) {
        lastStations = state.stations;
        sp = stationP();
      }
    });
    // inside the home page the scene is one section among others: it draws only while that section is on screen
    let seen = true;
    const onVis = () => { running = seen && !document.hidden; };
    const watch = new IntersectionObserver(([entry]) => { seen = entry.isIntersecting; onVis(); });
    watch.observe(el);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      unsub();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      watch.disconnect();
      painted.forEach((p) => p.mat.map?.dispose());
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="scene3d" aria-hidden="true"></div>;
}
