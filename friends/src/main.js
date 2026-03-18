import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { persons } from './persons.js'

// ─── roundRect polyfill ───────────────────────────────────────────────────────
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    this.beginPath()
    this.moveTo(x + r, y)
    this.lineTo(x + w - r, y)
    this.quadraticCurveTo(x + w, y, x + w, y + r)
    this.lineTo(x + w, y + h - r)
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    this.lineTo(x + r, y + h)
    this.quadraticCurveTo(x, y + h, x, y + h - r)
    this.lineTo(x, y + r)
    this.quadraticCurveTo(x, y, x + r, y)
    this.closePath()
  }
}

// ─── State ────────────────────────────────────────────────────────────────────
let isZoomed = false
let currentPerson = null
const clickZones = []

// ─── Renderer ─────────────────────────────────────────────────────────────────
const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.95

// ─── Scene ────────────────────────────────────────────────────────────────────
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x9ecadf)
scene.fog = new THREE.FogExp2(0x9ecadf, 0.012)

// ─── Camera ───────────────────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.set(0, 16, 28)
camera.lookAt(0, 0, 0)

// ─── Controls ─────────────────────────────────────────────────────────────────
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 1.5, 0)
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.maxPolarAngle = Math.PI / 2.05
controls.minPolarAngle = 0.15
controls.enablePan = false
controls.minDistance = 6
controls.maxDistance = 26
controls.enabled = false

// ─── Helpers ──────────────────────────────────────────────────────────────────
function box(w, h, d, color, extra = {}) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshLambertMaterial({ color, ...extra })
  )
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function cyl(rT, rB, h, segs, color, extra = {}) {
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(rT, rB, h, segs),
    new THREE.MeshLambertMaterial({ color, ...extra })
  )
  m.castShadow = true
  return m
}

function place(parent, child, x, y, z, ry = 0) {
  child.position.set(x, y, z)
  child.rotation.y = ry
  parent.add(child)
  return child
}

// ─── Lighting ─────────────────────────────────────────────────────────────────
function setupLighting() {
  scene.add(new THREE.AmbientLight(0xfff5e8, 0.7))

  const sun = new THREE.DirectionalLight(0xfff0d8, 1.3)
  sun.position.set(-6, 10, 4)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.near = 0.1
  sun.shadow.camera.far = 50
  sun.shadow.camera.left = -18
  sun.shadow.camera.right = 18
  sun.shadow.camera.top = 14
  sun.shadow.camera.bottom = -14
  sun.shadow.bias = -0.002
  scene.add(sun)

  const ceilLightPos = [[-7, 3.9, -1], [0, 3.9, -2], [7, 3.9, -1], [-4, 3.9, 3.5], [4, 3.9, 3.5]]
  ceilLightPos.forEach(p => {
    const l = new THREE.PointLight(0xfff8e0, 0.9, 9)
    l.position.set(...p)
    scene.add(l)
  })
}

// ─── Screen Textures ──────────────────────────────────────────────────────────
function makeScreenTex(type, hex) {
  const W = 512, H = 320
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')

  ctx.fillStyle = '#080c14'
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = hex
  ctx.fillRect(0, 0, W, 26)
  ;[['#ff5f57', 10], ['#ffbd2e', 28], ['#28ca41', 46]].forEach(([clr, x]) => {
    ctx.fillStyle = clr
    ctx.beginPath(); ctx.arc(x, 13, 5, 0, Math.PI * 2); ctx.fill()
  })

  if (type === 'designer')   drawDesigner(ctx, W, H, hex)
  if (type === 'pm')         drawPM(ctx, W, H, hex)
  if (type === 'director')   drawDirector(ctx, W, H, hex)
  if (type === 'tester')     drawTester(ctx, W, H, hex)
  if (type === 'db')         drawDB(ctx, W, H, hex)

  return new THREE.CanvasTexture(c)
}

function drawDesigner(ctx, W, H, hex) {
  ctx.fillStyle = '#121825'
  ctx.fillRect(0, 26, 70, H - 26)
  ctx.fillStyle = '#1e2436'
  ctx.fillRect(70, 26, W - 70, H - 26)
  for (let x = 70; x < W; x += 28) {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(x, 26); ctx.lineTo(x, H); ctx.stroke()
  }
  for (let y = 26; y < H; y += 28) {
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(70, y); ctx.lineTo(W, y); ctx.stroke()
  }
  const colors = [hex, '#f472b6', '#a78bfa', '#34d399', '#fbbf24']
  ;[[100, 50, 170, 110], [110, 180, 130, 80], [290, 55, 150, 180], [290, 250, 100, 50]].forEach(([x, y, w, h], i) => {
    ctx.globalAlpha = 0.6
    ctx.fillStyle = colors[i]
    ctx.fillRect(x, y, w, h)
    ctx.globalAlpha = 1
    ctx.strokeStyle = colors[i]; ctx.lineWidth = 2
    ctx.strokeRect(x, y, w, h)
  })
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.fillRect(75, 30, 60, 20)
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.font = '9px monospace'; ctx.fillText('Layers', 82, 44)
  ;['▢', '◯', '✏', '🖼', '△'].forEach((ic, i) => {
    ctx.font = '14px sans-serif'; ctx.fillText(ic, 25, 60 + i * 26)
  })
}

function drawPM(ctx, W, H, hex) {
  ctx.fillStyle = '#0f1623'
  ctx.fillRect(0, 26, W, H - 26)
  const cols = ['Todo', 'In Progress', 'Done']
  const colBg = ['#1a2035', '#162035', '#0d2015']
  const tasks = [['Fix login 401', 'Update README', 'Code review'], ['Sprint planning', 'API design'], ['Setup CI', 'DB migration', 'v1.0 deploy']]
  cols.forEach((col, ci) => {
    const cw = (W - 20) / 3
    const cx = 8 + ci * cw
    ctx.fillStyle = colBg[ci]
    ctx.roundRect(cx, 32, cw - 6, H - 38, 6); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = 'bold 10px sans-serif'
    ctx.fillText(col, cx + 8, 48)
    tasks[ci].forEach((t, ti) => {
      ctx.fillStyle = 'rgba(255,255,255,0.07)'
      ctx.roundRect(cx + 4, 56 + ti * 50, cw - 14, 42, 4); ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.75)'; ctx.font = '9px sans-serif'
      ctx.fillText(t, cx + 10, 72 + ti * 50)
      const dotClr = [hex, '#fbbf24', '#34d399'][ti % 3]
      ctx.fillStyle = dotClr
      ctx.beginPath(); ctx.arc(cx + cw - 18, 66 + ti * 50, 4, 0, Math.PI * 2); ctx.fill()
    })
  })
}

function drawDirector(ctx, W, H, hex) {
  ctx.fillStyle = '#0a0f1e'
  ctx.fillRect(0, 26, W, H - 26)
  ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.font = 'bold 15px sans-serif'
  ctx.fillText('Q1 2026 — Strategic Overview', 18, 52)
  const bars = [0.55, 0.8, 0.42, 0.95, 0.68, 0.73]
  bars.forEach((v, i) => {
    const bh = v * 120; const bx = 18 + i * 74
    const by = 185 - bh
    ctx.fillStyle = hex + 'bb'
    ctx.fillRect(bx, by, 52, bh)
    ctx.fillStyle = hex; ctx.font = '8px sans-serif'
    ctx.fillText(['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'][i], bx + 14, 200)
  })
  ;[['Users', '1.2K', '+12%'], ['Revenue', '18K', '+24%'], ['Tasks', '47/50', '94%']].forEach(([l, v, s], i) => {
    const bx = 18 + i * 160
    ctx.fillStyle = 'rgba(255,255,255,0.06)'
    ctx.roundRect(bx, 215, 148, 52, 6); ctx.fill()
    ctx.fillStyle = hex; ctx.font = 'bold 14px sans-serif'
    ctx.fillText(v, bx + 12, 238)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '8px sans-serif'
    ctx.fillText(l, bx + 12, 252)
    ctx.fillStyle = '#34d399'; ctx.font = '8px sans-serif'
    ctx.fillText(s, bx + 12, 264)
  })
}

function drawTester(ctx, W, H, hex) {
  ctx.fillStyle = '#050c0a'
  ctx.fillRect(0, 26, W, H - 26)
  ctx.fillStyle = hex; ctx.font = 'bold 11px monospace'
  ctx.fillText('🔍 BugTracker v2.1', 12, 46)
  const bugs = [
    { id: '#142', title: 'Login timeout 401', sev: 'high', stat: 'open' },
    { id: '#141', title: 'Modal z-index issue', sev: 'med', stat: 'testing' },
    { id: '#140', title: 'Empty state missing', sev: 'low', stat: 'closed' },
    { id: '#139', title: 'API rate limit hit', sev: 'high', stat: 'open' },
    { id: '#138', title: 'Mobile scroll bug', sev: 'med', stat: 'testing' },
  ]
  const sevC = { high: '#ef4444', med: '#f59e0b', low: '#10b981' }
  const stC = { open: '#ef4444', testing: hex, closed: '#374151' }
  bugs.forEach((b, i) => {
    const by = 60 + i * 46
    ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.fillRect(6, by, W - 12, 38)
    ctx.fillStyle = sevC[b.sev]; ctx.fillRect(6, by, 3, 38)
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '8px monospace'; ctx.fillText(b.id, 14, by + 13)
    ctx.fillStyle = 'white'; ctx.font = '9px sans-serif'; ctx.fillText(b.title, 50, by + 13)
    ctx.fillStyle = stC[b.stat]
    ctx.roundRect(W - 68, by + 8, 60, 16, 3); ctx.fill()
    ctx.fillStyle = 'white'; ctx.font = '7px sans-serif'; ctx.fillText(b.stat, W - 61, by + 20)
  })
}

function drawDB(ctx, W, H, hex) {
  ctx.fillStyle = '#020912'
  ctx.fillRect(0, 26, W, H - 26)
  ctx.fillStyle = hex; ctx.font = 'bold 10px monospace'
  ctx.fillText('dalla@friendshq:~$', 10, 46)
  const lines = [
    { t: 'psql -U admin friends_db', c: 'white' },
    { t: 'psql (16.1) — connected ✓', c: hex },
    { t: '', c: '' },
    { t: 'SELECT u.name, COUNT(o.id) AS tot', c: '#a78bfa' },
    { t: '  FROM users u', c: '#a78bfa' },
    { t: '  LEFT JOIN orders o ON u.id = o.uid', c: '#a78bfa' },
    { t: '  GROUP BY u.name', c: '#a78bfa' },
    { t: '  ORDER BY tot DESC LIMIT 10;', c: '#a78bfa' },
    { t: '', c: '' },
    { t: '─────────────────────────────', c: '#1f2937' },
    { t: ' name     │ tot', c: '#6b7280' },
    { t: '─────────────────────────────', c: '#1f2937' },
    { t: ' Napo     │  312', c: hex },
    { t: ' Leo      │  247', c: 'white' },
    { t: ' Teo      │  189', c: 'white' },
    { t: '(5 rows)  — 9ms', c: '#4b5563' },
  ]
  lines.forEach((l, i) => {
    if (!l.t) return
    ctx.fillStyle = l.c; ctx.font = '8.5px monospace'
    ctx.fillText(l.t, 10, 62 + i * 14)
  })
  ctx.fillStyle = hex + 'aa'
  ctx.fillRect(10, 305, 7, 2)
}

// ─── Props ────────────────────────────────────────────────────────────────────
function makePlant(scale = 1) {
  const g = new THREE.Group()
  const pot = cyl(0.1 * scale, 0.085 * scale, 0.18 * scale, 10, 0xb45309)
  g.add(pot)
  const soil = cyl(0.09 * scale, 0.09 * scale, 0.02 * scale, 10, 0x4b3621)
  soil.position.y = 0.1 * scale; g.add(soil)
  const bush = new THREE.Mesh(new THREE.SphereGeometry(0.15 * scale, 9, 9), new THREE.MeshLambertMaterial({ color: 0x16a34a }))
  bush.position.y = 0.26 * scale; g.add(bush)
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.09 * scale, 8, 8), new THREE.MeshLambertMaterial({ color: 0x15803d }))
  leaf.position.set(0.1 * scale, 0.32 * scale, 0.05 * scale); g.add(leaf)
  return g
}

function makeMug(color = 0xffffff) {
  const g = new THREE.Group()
  const mug = cyl(0.07, 0.065, 0.14, 14, color)
  mug.position.y = 0.07; g.add(mug)
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.014, 8, 10, Math.PI), new THREE.MeshLambertMaterial({ color }))
  handle.position.set(0.09, 0.07, 0)
  handle.rotation.z = -Math.PI / 2; handle.rotation.y = Math.PI / 2
  g.add(handle)
  const coffee = cyl(0.061, 0.061, 0.01, 14, 0x3d1a00)
  coffee.position.y = 0.135; g.add(coffee)
  return g
}

function makeBook(w, h, d, color) {
  const g = new THREE.Group()
  g.add(box(w, h, d, color))
  const pg = box(w - 0.02, h - 0.02, d - 0.02, 0xfff8f0)
  pg.position.x = 0.008; g.add(pg)
  return g
}

function makeEnergyDrink(color = 0x6ee7b7) {
  const g = new THREE.Group()
  g.add(cyl(0.04, 0.04, 0.22, 12, 0x111827))
  const label = cyl(0.042, 0.042, 0.15, 12, color)
  g.add(label)
  return g
}

function makeServerRack() {
  const g = new THREE.Group()
  const frame = box(0.52, 0.72, 0.36, 0x111827)
  g.add(frame)
  for (let i = 0; i < 5; i++) {
    const unit = box(0.46, 0.09, 0.31, i % 2 === 0 ? 0x1e293b : 0x0f172a)
    unit.position.set(0, -0.27 + i * 0.13, 0.025); g.add(unit)
    const led = box(0.03, 0.03, 0.01, i < 4 ? 0x00ff66 : 0xff3300)
    led.position.set(0.17, -0.27 + i * 0.13, 0.19); g.add(led)
  }
  return g
}

function makeSticky(color = 0xfde047) {
  const g = new THREE.Group()
  const note = box(0.16, 0.001, 0.16, color)
  g.add(note)
  for (let i = 0; i < 3; i++) {
    const ln = box(0.1, 0.001, 0.007, 0x000000)
    ln.material.opacity = 0.12; ln.material.transparent = true
    ln.position.set(0, 0.001, -0.04 + i * 0.04); g.add(ln)
  }
  return g
}

function makePapers(color = 0xffffff) {
  const g = new THREE.Group()
  for (let i = 0; i < 3; i++) {
    const p = box(0.32, 0.006, 0.24, color)
    p.position.set(i * 0.012, i * 0.006, i * 0.01)
    p.rotation.y = (i - 1) * 0.06
    g.add(p)
  }
  return g
}

function makeChair(accentColor) {
  const g = new THREE.Group()
  const seat = box(0.58, 0.07, 0.56, 0x111111)
  seat.position.y = 0.48; g.add(seat)
  const back = box(0.58, 0.58, 0.07, accentColor)
  back.position.set(0, 0.82, -0.25); g.add(back)
  ;[-0.27, 0.27].forEach(x => {
    const arm = box(0.05, 0.04, 0.42, 0x1a1a1a)
    arm.position.set(x, 0.62, 0.04); g.add(arm)
  })
  const pole = cyl(0.03, 0.03, 0.38, 8, 0x2a2a2a)
  pole.position.y = 0.16; g.add(pole)
  for (let i = 0; i < 5; i++) {
    const spoke = box(0.38, 0.04, 0.05, 0x1a1a1a)
    spoke.position.y = 0.02; spoke.rotation.y = (i / 5) * Math.PI * 2
    g.add(spoke)
  }
  return g
}

// ─── Monitor ─────────────────────────────────────────────────────────────────
function makeMonitor(frameColor, screenTex, w = 0.78, h = 0.52) {
  const g = new THREE.Group()
  const base = box(0.32, 0.04, 0.22, frameColor)
  base.position.y = 0; g.add(base)
  const pole = box(0.05, 0.34, 0.05, frameColor)
  pole.position.y = 0.19; g.add(pole)
  const frame = box(w + 0.06, h + 0.06, 0.06, frameColor)
  frame.position.y = 0.37 + h / 2; g.add(frame)
  const screen = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, 0.02),
    new THREE.MeshBasicMaterial({ map: screenTex })
  )
  screen.position.set(0, 0.37 + h / 2, 0.034); g.add(screen)
  return g
}

// ─── Desk base ────────────────────────────────────────────────────────────────
function makeDeskBase(color, dw = 2.5, dd = 1.3) {
  const g = new THREE.Group()
  const surface = box(dw, 0.08, dd, color)
  surface.position.y = 0.84; g.add(surface)
  const legH = 0.82
  ;[[-dw / 2 + 0.1, 0.56], [dw / 2 - 0.1, 0.56], [-dw / 2 + 0.1, -0.56], [dw / 2 - 0.1, -0.56]].forEach(([lx, lz]) => {
    const leg = box(0.07, legH, 0.07, 0x444444)
    leg.position.set(lx, legH / 2, lz); g.add(leg)
  })
  const xbar = box(dw - 0.4, 0.05, 0.06, 0x555555)
  xbar.position.set(0, 0.28, 0); g.add(xbar)
  return g
}

// ─── Desk builders ────────────────────────────────────────────────────────────
function buildDesignerDesk(p) {
  const g = new THREE.Group()
  g.add(makeDeskBase(p.deskColor))

  const tex1 = makeScreenTex('designer', p.hex)
  const mon1 = makeMonitor(p.threeColor, tex1)
  mon1.position.set(-0.68, 0.9, -0.38); mon1.scale.setScalar(0.9); g.add(mon1)

  const tex2 = makeScreenTex('designer', p.hex)
  const mon2 = makeMonitor(p.threeColor, tex2)
  mon2.position.set(0.68, 0.9, -0.38); mon2.scale.setScalar(0.9); g.add(mon2)

  // Color swatches
  const sw = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0x6c5ce7, 0xa29bfe]
  sw.forEach((c, i) => {
    const s = box(0.1, 0.012, 0.09, c)
    s.position.set(-0.48 + i * 0.23, 0.895, 0.28); g.add(s)
  })

  // Keyboard
  const kbd = box(0.7, 0.025, 0.28, 0x1e293b)
  kbd.position.set(0, 0.895, 0.05); g.add(kbd)

  // Plant
  const pl = makePlant(0.9)
  pl.position.set(1.12, 0.88, 0.2); g.add(pl)

  // Mug
  const mug = makeMug(0xffffff)
  mug.position.set(0.92, 0.88, -0.18); g.add(mug)

  // Chair
  const ch = makeChair(p.threeColor)
  ch.position.set(0, 0, 0.95); g.add(ch)

  return g
}

function buildPMDesk(p) {
  const g = new THREE.Group()
  g.add(makeDeskBase(p.deskColor))

  const tex = makeScreenTex('pm', p.hex)
  const mon = makeMonitor(p.threeColor, tex)
  mon.position.set(0, 0.9, -0.36); g.add(mon)

  // Sticky notes cluster on desk
  const noteColors = [0xfde047, 0xfb923c, 0xa7f3d0, 0xbfdbfe, 0xf9a8d4, 0xd9f99d]
  noteColors.forEach((c, i) => {
    const note = makeSticky(c)
    const a = (i / noteColors.length) * Math.PI * 1.6 - 0.4
    note.position.set(Math.cos(a) * 0.35, 0.892, Math.sin(a) * 0.18 + 0.08)
    note.rotation.y = Math.random() * 0.5 - 0.25
    g.add(note)
  })

  // Papers
  const papers = makePapers()
  papers.position.set(-0.82, 0.9, 0.22); g.add(papers)

  // Keyboard
  const kbd = box(0.68, 0.025, 0.26, 0x1e293b)
  kbd.position.set(0, 0.895, 0.08); g.add(kbd)

  // Mug (coffee)
  const mug = makeMug(p.threeColor)
  mug.position.set(0.92, 0.88, 0.2); g.add(mug)

  // Chair
  const ch = makeChair(p.threeColor)
  ch.position.set(0, 0, 0.95); g.add(ch)

  return g
}

function buildDirectorDesk(p) {
  const g = new THREE.Group()
  // Wider desk for the boss
  g.add(makeDeskBase(p.deskColor, 3.2, 1.5))

  // Wide monitor
  const tex = makeScreenTex('director', p.hex)
  const mon = makeMonitor(p.threeColor, tex, 1.15, 0.64)
  mon.position.set(0, 0.9, -0.48); g.add(mon)

  // Book stack
  ;[0x7c3aed, 0x1d4ed8, 0xb91c1c].forEach((c, i) => {
    const bk = makeBook(0.26, 0.38, 0.06, c)
    bk.position.set(-1.28, 0.88 + i * 0.07, 0.1)
    bk.rotation.y = (i - 1) * 0.1; g.add(bk)
  })

  // Plant (bigger)
  const pl = makePlant(1.3)
  pl.position.set(1.42, 0.88, 0.32); g.add(pl)

  // Nameplate (gold)
  const plate = box(0.54, 0.045, 0.12, 0xd4af37)
  plate.position.set(0, 0.9, 0.52); g.add(plate)

  // Keyboard
  const kbd = box(0.75, 0.025, 0.28, 0x1e293b)
  kbd.position.set(0, 0.895, 0.08); g.add(kbd)

  // Mug
  const mug = makeMug(p.threeColor)
  mug.position.set(1.35, 0.88, -0.15); g.add(mug)

  // Chair (bigger/more impressive)
  const ch = makeChair(p.threeColor)
  ch.scale.set(1.1, 1.15, 1.1)
  ch.position.set(0, 0, 1.05); g.add(ch)

  return g
}

function buildTesterDesk(p) {
  const g = new THREE.Group()
  g.add(makeDeskBase(p.deskColor))

  const tex = makeScreenTex('tester', p.hex)
  const mon = makeMonitor(p.threeColor, tex)
  mon.position.set(-0.32, 0.9, -0.36); g.add(mon)

  // Laptop (slightly angled open)
  const lapBase = box(0.55, 0.03, 0.38, 0x374151)
  lapBase.position.set(0.72, 0.898, -0.08); g.add(lapBase)
  const lapScreen = box(0.53, 0.36, 0.025, 0x1f2937)
  lapScreen.position.set(0.72, 1.072, -0.27); lapScreen.rotation.x = -0.36; g.add(lapScreen)
  const lapDisplay = new THREE.Mesh(
    new THREE.BoxGeometry(0.49, 0.32, 0.01),
    new THREE.MeshBasicMaterial({ color: p.threeColor, transparent: true, opacity: 0.65 })
  )
  lapDisplay.position.set(0.72, 1.072, -0.262); lapDisplay.rotation.x = -0.36; g.add(lapDisplay)

  // Phone & tablet
  ;[{ w: 0.13, d: 0.24, x: -1.02, z: 0.08 }, { w: 0.22, d: 0.30, x: -0.72, z: 0.26 }].forEach(({ w, d, x, z }) => {
    const dev = box(w, 0.007, d, 0x111827)
    dev.position.set(x, 0.9, z); dev.rotation.y = Math.random() * 0.3 - 0.15; g.add(dev)
    const scr = box(w - 0.02, 0.007, d - 0.04, p.threeColor)
    scr.material.transparent = true; scr.material.opacity = 0.5
    scr.position.set(x, 0.908, z); scr.rotation.y = dev.rotation.y; g.add(scr)
  })

  // Checklist paper
  const check = makePapers(0xfefce8)
  check.position.set(0.3, 0.9, 0.32); g.add(check)

  // Keyboard
  const kbd = box(0.6, 0.025, 0.24, 0x1e293b)
  kbd.position.set(-0.28, 0.895, 0.08); g.add(kbd)

  // Energy drink
  const drink = makeEnergyDrink(p.threeColor)
  drink.position.set(1.06, 0.895, -0.28); g.add(drink)

  // Chair
  const ch = makeChair(p.threeColor)
  ch.position.set(0, 0, 0.95); g.add(ch)

  return g
}

function buildDBDesk(p) {
  const g = new THREE.Group()
  g.add(makeDeskBase(p.deskColor))

  // Dark dual monitors
  ;[[-0.68, 0.9, -0.38], [0.68, 0.9, -0.38]].forEach(([mx, my, mz]) => {
    const tex = makeScreenTex('db', p.hex)
    const mon = makeMonitor(0x0a0f1a, tex)
    mon.position.set(mx, my, mz); mon.scale.setScalar(0.9); g.add(mon)
  })

  // Mini server rack on floor beside desk
  const rack = makeServerRack()
  rack.position.set(1.82, 0.36, -0.28); g.add(rack)

  // Cable (simplified)
  const cable = box(0.015, 0.015, 0.5, 0x0a0f1a)
  cable.position.set(1.55, 0.88, -0.3); cable.rotation.y = 0.25; g.add(cable)

  // Keyboard
  const kbd = box(0.7, 0.025, 0.26, 0x0a0f1a)
  kbd.position.set(0, 0.895, 0.06); g.add(kbd)

  // Energy drinks (two)
  const d1 = makeEnergyDrink(p.threeColor)
  d1.position.set(1.06, 0.895, 0.12); g.add(d1)
  const d2 = makeEnergyDrink(0x22c55e)
  d2.position.set(0.86, 0.895, 0.28); d2.scale.setScalar(0.82); g.add(d2)

  // Sticker on monitor (hacker badge)
  const sticker = box(0.07, 0.001, 0.07, 0xff4400)
  sticker.position.set(-0.28, 1.16, -0.04); g.add(sticker)

  // Chair
  const ch = makeChair(p.threeColor)
  ch.position.set(0, 0, 0.95); g.add(ch)

  return g
}

// ─── Name label sprite ────────────────────────────────────────────────────────
function makeNameSprite(person) {
  const c = document.createElement('canvas')
  c.width = 256; c.height = 72
  const ctx = c.getContext('2d')
  ctx.fillStyle = person.hex + 'dd'
  ctx.roundRect(0, 0, 256, 72, 18); ctx.fill()
  ctx.fillStyle = 'white'
  ctx.font = 'bold 30px sans-serif'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(person.name, 128, 36)
  const tex = new THREE.CanvasTexture(c)
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(1.7, 0.48, 1)
  sprite.position.set(person.position[0], person.position[1] + 2.6, person.position[2])
  return sprite
}

// ─── Room ─────────────────────────────────────────────────────────────────────
function buildRoom() {
  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(32, 0.18, 26), new THREE.MeshLambertMaterial({ color: 0xc4915a }))
  floor.position.set(0, -0.09, 0); floor.receiveShadow = true; scene.add(floor)

  // Floor plank lines
  for (let z = -10; z <= 10; z += 2) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(32, 0.01, 0.05), new THREE.MeshLambertMaterial({ color: 0x7a4f2e, transparent: true, opacity: 0.25 }))
    plank.position.set(0, 0.01, z); scene.add(plank)
  }

  // Ceiling
  const ceil = new THREE.Mesh(new THREE.BoxGeometry(32, 0.18, 26), new THREE.MeshLambertMaterial({ color: 0xfaf7f2 }))
  ceil.position.set(0, 4.09, 0); scene.add(ceil)

  // Walls
  const wallMat = new THREE.MeshLambertMaterial({ color: 0xf2ede5 })
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(32, 4.3, 0.18), wallMat)
  backWall.position.set(0, 2, -13); backWall.receiveShadow = true; scene.add(backWall)

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.3, 26), wallMat)
  leftWall.position.set(-16, 2, 0); scene.add(leftWall)

  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.3, 26), wallMat)
  rightWall.position.set(16, 2, 0); scene.add(rightWall)

  // Windows in back wall
  const glassMat = new THREE.MeshLambertMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.45 })
  const frameMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  ;[-8, 0, 8].forEach(wx => {
    const fr = new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.2, 0.12), frameMat)
    fr.position.set(wx, 2.3, -12.94); scene.add(fr)
    const gl = new THREE.Mesh(new THREE.BoxGeometry(2.9, 1.9, 0.06), glassMat)
    gl.position.set(wx, 2.3, -12.91); scene.add(gl)
    const crH = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.07, 0.14), frameMat)
    crH.position.set(wx, 2.3, -12.89); scene.add(crH)
    const crV = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.9, 0.14), frameMat)
    crV.position.set(wx, 2.3, -12.89); scene.add(crV)
  })

  // Ceiling light fixtures
  const fixMat = new THREE.MeshLambertMaterial({ color: 0xfffff0 })
  ;[[-7, 3.96, -1], [0, 3.96, -2], [7, 3.96, -1], [-4, 3.96, 3.5], [4, 3.96, 3.5]].forEach(p => {
    const fix = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.07, 0.32), fixMat)
    fix.position.set(...p); scene.add(fix)
    const glow = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.01, 0.27), new THREE.MeshBasicMaterial({ color: 0xfffff8, transparent: true, opacity: 0.85 }))
    glow.position.set(p[0], p[1] - 0.05, p[2]); scene.add(glow)
  })

  // Corner plants
  ;[[-14.5, 0, -11], [14.5, 0, -11], [-14.5, 0, 9]].forEach(([px, py, pz]) => {
    const pl = makePlant(2.0)
    pl.position.set(px, py, pz); scene.add(pl)
  })

  // Coffee machine corner
  const cm = new THREE.Group()
  const cmBody = box(0.55, 0.65, 0.44, 0x1e293b)
  cmBody.position.y = 0.325; cm.add(cmBody)
  const cmTop = box(0.53, 0.09, 0.42, 0x334155)
  cmTop.position.y = 0.7; cm.add(cmTop)
  const cmBtn = cyl(0.04, 0.04, 0.05, 10, 0xef4444)
  cmBtn.position.set(0.12, 0.46, 0.23); cmBtn.rotation.x = Math.PI / 2; cm.add(cmBtn)
  cm.position.set(-14.5, 0.65, 9.5); scene.add(cm)

  // "Friends HQ" sign bar on back wall
  const signBg = box(7, 0.55, 0.06, 0x1e1b4b)
  signBg.position.set(0, 3.45, -12.9); scene.add(signBg)

  // Rug under center
  const rug = new THREE.Mesh(new THREE.BoxGeometry(18, 0.02, 10), new THREE.MeshLambertMaterial({ color: 0x4c1d95, transparent: true, opacity: 0.55 }))
  rug.position.set(0, 0.01, -1); scene.add(rug)
}

// ─── Click zones ──────────────────────────────────────────────────────────────
function makeClickZone(person) {
  const geo = new THREE.BoxGeometry(3.4, 2.2, 3)
  const mat = new THREE.MeshBasicMaterial({ visible: false })
  const m = new THREE.Mesh(geo, mat)
  m.position.set(person.position[0], person.position[1] + 1.1, person.position[2])
  m.userData.person = person
  scene.add(m)
  clickZones.push(m)
}

// ─── Dust particles ───────────────────────────────────────────────────────────
let dustGeo, dustPositions
function makeDust() {
  const count = 250
  dustPositions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    dustPositions[i * 3]     = (Math.random() - 0.5) * 28
    dustPositions[i * 3 + 1] = Math.random() * 4
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 22
  }
  dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.025, transparent: true, opacity: 0.3 }))
  scene.add(dust)
}

// ─── Build everything ─────────────────────────────────────────────────────────
function buildScene() {
  setupLighting()
  buildRoom()
  makeDust()

  persons.forEach(p => {
    let desk
    if (p.deskType === 'designer')  desk = buildDesignerDesk(p)
    if (p.deskType === 'pm')        desk = buildPMDesk(p)
    if (p.deskType === 'director')  desk = buildDirectorDesk(p)
    if (p.deskType === 'tester')    desk = buildTesterDesk(p)
    if (p.deskType === 'db')        desk = buildDBDesk(p)

    desk.position.set(...p.position)
    scene.add(desk)

    scene.add(makeNameSprite(p))
    makeClickZone(p)
  })
}

// ─── Raycaster ────────────────────────────────────────────────────────────────
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

window.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

  if (isZoomed) return
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(clickZones)
  canvas.style.cursor = hits.length > 0 ? 'pointer' : 'grab'
})

window.addEventListener('click', e => {
  if (isZoomed) return
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(clickZones)
  if (hits.length > 0) zoomToPerson(hits[0].object.userData.person)
})

// ─── Camera animation ─────────────────────────────────────────────────────────
function zoomToPerson(p) {
  isZoomed = true
  currentPerson = p
  controls.enabled = false
  document.getElementById('hints').classList.add('hidden')
  document.getElementById('person-nav').classList.add('hidden')
  document.getElementById('back-btn').classList.remove('hidden')

  gsap.to(camera.position, { x: p.camPos[0], y: p.camPos[1], z: p.camPos[2], duration: 1.5, ease: 'power3.inOut' })
  gsap.to(controls.target, {
    x: p.camTarget[0], y: p.camTarget[1], z: p.camTarget[2],
    duration: 1.5, ease: 'power3.inOut',
    onComplete: () => showCard(p)
  })
}

function zoomOut() {
  isZoomed = false
  currentPerson = null
  hideCard()
  document.getElementById('back-btn').classList.add('hidden')

  gsap.to(camera.position, { x: 0, y: 9, z: 17, duration: 1.5, ease: 'power3.inOut' })
  gsap.to(controls.target, {
    x: 0, y: 1.5, z: 0, duration: 1.5, ease: 'power3.inOut',
    onComplete: () => {
      controls.enabled = true
      document.getElementById('hints').classList.remove('hidden')
      document.getElementById('person-nav').classList.remove('hidden')
    }
  })
}

// ─── UI card ──────────────────────────────────────────────────────────────────
function showCard(p) {
  const card = document.getElementById('info-card')
  card.classList.remove('hidden')

  document.getElementById('card-avatar').textContent = p.emoji
  document.getElementById('card-avatar').style.cssText = `background:${p.hex}22;border:2px solid ${p.hex};width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:1.4rem;`
  document.getElementById('card-name').textContent = p.name
  document.getElementById('card-name').style.color = p.hex
  document.getElementById('card-fullname').textContent = p.fullName
  document.getElementById('card-role').textContent = p.role
  document.getElementById('card-role').style.cssText = `display:inline-block;font-size:0.78rem;font-weight:600;letter-spacing:0.05em;padding:0.35rem 0.9rem;border-radius:50px;margin-bottom:1.6rem;background:${p.hex}22;color:${p.hex};`
  document.getElementById('card-bio').textContent = p.bio
  document.getElementById('card-tags').innerHTML = p.tags.map(t =>
    `<span class="tag" style="color:${p.hex};border-color:${p.hex}55">${t}</span>`
  ).join('')
  document.getElementById('card-funfact').textContent = p.funFact
  document.getElementById('card-funfact').style.borderLeft = `3px solid ${p.hex}`

  requestAnimationFrame(() => card.classList.add('show'))
}

function hideCard() {
  const card = document.getElementById('info-card')
  card.classList.remove('show')
  setTimeout(() => card.classList.add('hidden'), 560)
}

// ─── Intro ────────────────────────────────────────────────────────────────────
function setupIntro() {
  document.getElementById('enter-btn').addEventListener('click', () => {
    const intro = document.getElementById('intro')

    gsap.to(intro, {
      opacity: 0, duration: 0.9, ease: 'power2.inOut',
      onComplete: () => {
        intro.style.display = 'none'
        controls.enabled = true

        // Build nav dots
        const navDots = document.getElementById('nav-dots')
        persons.forEach(p => {
          const dot = document.createElement('div')
          dot.className = 'nav-dot'
          dot.title = p.name
          dot.innerHTML = `<span class="nav-dot-label">${p.name}</span><span class="nav-dot-circle" style="background:${p.hex}"></span>`
          dot.addEventListener('click', () => zoomToPerson(p))
          navDots.appendChild(dot)
        })

        document.getElementById('hints').classList.remove('hidden')
        document.getElementById('person-nav').classList.remove('hidden')
      }
    })

    // Fly-in camera
    gsap.to(camera.position, { x: 0, y: 9, z: 17, duration: 2.4, ease: 'power2.out', delay: 0.25 })
    gsap.to(controls.target, { x: 0, y: 1.5, z: 0, duration: 2.4, ease: 'power2.out', delay: 0.25 })
  })

  document.getElementById('back-btn').addEventListener('click', zoomOut)
  document.getElementById('card-close').addEventListener('click', zoomOut)
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && isZoomed) zoomOut() })
}

// ─── Animate loop ─────────────────────────────────────────────────────────────
const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()

  // Animate dust particles
  if (dustGeo) {
    const pos = dustGeo.attributes.position
    for (let i = 0; i < 250; i++) {
      pos.array[i * 3 + 1] += Math.sin(t * 0.4 + i * 0.8) * 0.0012
      pos.array[i * 3]     += Math.cos(t * 0.3 + i) * 0.0006
      if (pos.array[i * 3 + 1] > 4) pos.array[i * 3 + 1] = 0
      if (pos.array[i * 3 + 1] < 0) pos.array[i * 3 + 1] = 4
    }
    pos.needsUpdate = true
  }

  controls.update()
  renderer.render(scene, camera)
}

// ─── Resize ───────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// ─── Init ─────────────────────────────────────────────────────────────────────
buildScene()
setupIntro()
animate()
