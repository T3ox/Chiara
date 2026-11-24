import * as THREE from "three";

/*
  The road: a flat ribbon laid along the curve, drawn entirely by a shader.
  - two fine edge lines and a dashed centre line, like a lane seen from above;
  - the part already travelled is lit in the accent, the rest stays a faint outline;
  - light flows forward along the lit part, and a soft bloom marks where the journey is now;
  - it fades out with distance, so the far road dissolves into the background instead of ending.
  The ribbon's u runs along the curve's own parameter (getPoint), the same one the camera and the gates use,
  so uProgress = t lights exactly up to the camera's point.
*/

const SEGMENTS = 1200;
const WIDTH = 2.4;

const vertex = /* glsl */ `
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform float uLength;
  uniform vec3 uLit;
  uniform vec3 uDim;
  varying vec2 vUv;
  varying float vDepth;

  // a line of a given half-width, antialiased with screen-space derivatives
  float line(float d, float w) {
    float aa = fwidth(d) * 1.2;
    return 1.0 - smoothstep(w - aa, w + aa, abs(d));
  }

  void main() {
    float along = vUv.x * uLength;            // world units from the start
    float across = vUv.y - 0.5;               // -0.5 .. 0.5 across the ribbon

    float lit = 1.0 - smoothstep(uProgress - 0.0015, uProgress + 0.0015, vUv.x);
    float edges = line(abs(across) - 0.47, 0.012);
    float dash = step(0.45, fract(along / 1.6));
    float centre = line(across, 0.012) * dash;
    float fill = 1.0 - smoothstep(0.0, 0.5, abs(across));    // brightest in the middle of the lane

    // light flowing forward on the travelled part: soft streaks that move towards the current point
    float streak = pow(0.5 + 0.5 * sin(along * 0.9 - uTime * 2.4), 14.0) * lit;
    // the bloom at the current point
    float head = exp(-pow((vUv.x - uProgress) * uLength / 2.2, 2.0));

    vec3 col = mix(uDim, uLit, lit);
    float a = fill * (0.035 + 0.11 * lit)
            + edges * (0.18 + 0.55 * lit)
            + centre * (0.12 + 0.45 * lit)
            + streak * fill * 0.45
            + head * (0.25 + 0.75 * fill);

    // distance: the far road dissolves into the background
    a *= exp(-vDepth * 0.011);
    gl_FragColor = vec4(col * (1.0 + head * 0.8), a);
  }
`;

export default class RoadRibbon {
  constructor(curve, { lit = "#9fc7b8", dim = "#7b8a84" } = {}) {
    const pos = new Float32Array((SEGMENTS + 1) * 2 * 3);
    const uv = new Float32Array((SEGMENTS + 1) * 2 * 2);
    const index = [];
    const up = new THREE.Vector3(0, 1, 0);
    const side = new THREE.Vector3();
    let length = 0;
    let prev = null;
    for (let i = 0; i <= SEGMENTS; i++) {
      const u = i / SEGMENTS;
      const p = curve.getPoint(u);
      const tangent = curve.getTangent(u);
      // lay the ribbon flat: its width runs across the road, level with the ground
      side.crossVectors(tangent, up).normalize().multiplyScalar(WIDTH / 2);
      pos.set([p.x + side.x, p.y + side.y, p.z + side.z, p.x - side.x, p.y - side.y, p.z - side.z], i * 6);
      uv.set([u, 0, u, 1], i * 4);
      if (prev) length += prev.distanceTo(p);
      prev = p;
      if (i < SEGMENTS) {
        const a = i * 2;
        index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
      }
    }
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    this.geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    this.geometry.setIndex(index);

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uLength: { value: length },
        uLit: { value: new THREE.Color(lit) },
        uDim: { value: new THREE.Color(dim) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
  }

  update(progress, time) {
    this.material.uniforms.uProgress.value = progress;
    this.material.uniforms.uTime.value = time;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
