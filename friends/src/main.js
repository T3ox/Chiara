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
let officeReady = false
let doorOpenedOnce = false
let introActive = true
const chairSitDrop = 0.012
const chairMap = {}
const nameSprites = []
const clickZones = []
let doorClickZone = null
const screenGlows = []   // animated screen glow lights
let neonSignLight = null // pulsing sign light
let windowBlueLights = [] // cool blue ambient from windows
const doorPanels = []    // left and right sliding panels

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
scene.background = new THREE.Color(0xb8cfe0)
scene.fog = new THREE.FogExp2(0xb8cfe0, 0.020)

// ─── Camera ───────────────────────────────────────────────────────────────────
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 300)
camera.position.set(0, 20, 32)
camera.lookAt(0, 0, 0)

// ─── Controls ─────────────────────────────────────────────────────────────────
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 1.2, 0)
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
  scene.add(new THREE.AmbientLight(0xfff5e8, 0.65))

  const sun = new THREE.DirectionalLight(0xfff0d8, 1.3)
  sun.position.set(-6, 10, 4)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.near = 0.1
  sun.shadow.camera.far = 50
  sun.shadow.camera.left = -14
  sun.shadow.camera.right = 14
  sun.shadow.camera.top = 14
  sun.shadow.camera.bottom = -14
  sun.shadow.bias = -0.002
  scene.add(sun)

  // Ceiling office fixtures — slightly warm, tracked for subtle flicker
  const ceilLightPos = [[-7, 3.9, -1], [0, 3.9, -2], [7, 3.9, -1], [-4, 3.9, 3.5], [4, 3.9, 3.5]]
  ceilLightPos.forEach((p, i) => {
    const l = new THREE.PointLight(0xfff8e0, 0.88, 9)
    l.position.set(...p)
    l.userData.baseIntensity = 0.88
    l.userData.phase = i * 1.3   // offset so they don't all flicker in sync
    scene.add(l)
    screenGlows.push({ light: l, type: 'ceil' })
  })

  // Neon "Friends HQ" sign light — purple/indigo glow behind the sign
  neonSignLight = new THREE.PointLight(0x6366f1, 1.4, 8)
  neonSignLight.position.set(0, 3.5, -9.6)
  scene.add(neonSignLight)

  // Cool blue fill from back windows (city night sky)
  ;[-7, 0, 7].forEach((wx, i) => {
    const bl = new THREE.PointLight(0x7bb8d4, 0.28, 10)
    bl.position.set(wx, 2.3, -8.8)
    bl.userData.phase = i * 2.1
    scene.add(bl)
    windowBlueLights.push(bl)
  })

  // Warm lounge accent — like sunlight through front facade
  const lounge = new THREE.PointLight(0xffb347, 0.55, 12)
  lounge.position.set(0, 2.8, 8)
  scene.add(lounge)

  // Subtle under-desk fill for each work zone
  ;[[-7, 0.3, -3], [-3, 0.3, 1.5], [0, 0.3, -5], [3, 0.3, 1.5], [7, 0.3, -3]].forEach((p, i) => {
    const fl = new THREE.PointLight(0x1e293b, 0.18, 4)
    fl.position.set(...p)
    scene.add(fl)
  })
}

// ─── Screen Textures ──────────────────────────────────────────────────────────
function makeScreenTex(type, hex) {
  const W = 640, H = 400
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')

  // Title bar
  ctx.fillStyle = '#080c14'; ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = '#111827'; ctx.fillRect(0, 0, W, 30)
  // Traffic lights
  ;[['#ff5f57', 14], ['#ffbd2e', 34], ['#28ca41', 54]].forEach(([clr, x]) => {
    ctx.fillStyle = clr; ctx.beginPath(); ctx.arc(x, 15, 6, 0, Math.PI * 2); ctx.fill()
  })
  // App name in title bar
  const titles = { designer: 'Figma  —  Dashboard.fig', pm: 'Linear  —  Sprint 12', director: 'Analytics  —  Q1 2026', tester: 'Jest  —  friends-hq suite', db: 'psql  —  friends_db' }
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '10px sans-serif'
  ctx.textAlign = 'center'; ctx.fillText(titles[type] || type, W / 2, 20); ctx.textAlign = 'left'

  if (type === 'designer')  drawDesigner(ctx, W, H, hex)
  if (type === 'pm')        drawPM(ctx, W, H, hex)
  if (type === 'director')  drawDirector(ctx, W, H, hex)
  if (type === 'tester')    drawTester(ctx, W, H, hex)
  if (type === 'db')        drawDB(ctx, W, H, hex)

  return new THREE.CanvasTexture(c)
}

function drawDesigner(ctx, W, H, hex) {
  const LP = 100, RP = 108
  const CP = W - LP - RP

  // ── Left: Layers panel ──────────────────────────────────────────────────────
  ctx.fillStyle = '#1b1f2b'; ctx.fillRect(0, 30, LP, H - 30)
  ctx.fillStyle = '#23283c'; ctx.fillRect(0, 30, LP, 20)
  ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = 'bold 9px sans-serif'
  ctx.fillText('LAYERS', 8, 44)

  const layers = [
    { d:0, s:false, ic:'⬡', n:'Frame 1' },
    { d:1, s:false, ic:'▭', n:'Navbar' },
    { d:2, s:false, ic:'T',  n:'Logo' },
    { d:2, s:false, ic:'⬡', n:'NavLinks' },
    { d:1, s:false, ic:'▭', n:'Hero' },
    { d:2, s:false, ic:'T',  n:'Headline' },
    { d:2, s:true,  ic:'▭', n:'CTA Button' },
    { d:1, s:false, ic:'▭', n:'Cards' },
    { d:2, s:false, ic:'▭', n:'Card_01' },
    { d:2, s:false, ic:'▭', n:'Card_02' },
  ]
  layers.forEach(({ d, s, ic, n }, i) => {
    const ty = 64 + i * 18
    if (s) { ctx.fillStyle = hex + '2a'; ctx.fillRect(0, ty - 12, LP, 16) }
    const alpha = d === 0 ? '0.85' : d === 1 ? '0.58' : '0.38'
    ctx.fillStyle = s ? hex : `rgba(255,255,255,${alpha})`
    ctx.font = (d === 0 ? 'bold ' : '') + '8.5px sans-serif'
    ctx.fillText(`${ic} ${n}`, 4 + d * 10, ty)
  })

  // ── Center: Canvas ──────────────────────────────────────────────────────────
  ctx.fillStyle = '#2d2d2d'; ctx.fillRect(LP, 30, CP, H - 30)
  for (let gx = LP + 8; gx < LP + CP; gx += 18)
    for (let gy = 40; gy < H; gy += 18) {
      ctx.fillStyle = 'rgba(255,255,255,0.035)'; ctx.fillRect(gx, gy, 1.5, 1.5)
    }

  // Artboard
  const fw = 256, fh = 246
  const fx = LP + (CP - fw) / 2, fy = 44
  ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.font = '8px sans-serif'
  ctx.fillText('Dashboard / 1440×900', fx, fy - 4)
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(fx, fy, fw, fh)

  // Navbar
  ctx.fillStyle = '#0f172a'; ctx.fillRect(fx, fy, fw, 24)
  ctx.fillStyle = hex; ctx.font = 'bold 9px sans-serif'; ctx.fillText('FHQ', fx + 8, fy + 16)
  ;['Home', 'Team', 'Work'].forEach((l, i) => {
    ctx.fillStyle = 'rgba(255,255,255,0.42)'; ctx.font = '7.5px sans-serif'
    ctx.fillText(l, fx + fw - 82 + i * 28, fy + 16)
  })

  // Hero gradient
  const hg = ctx.createLinearGradient(fx, fy + 24, fx, fy + 108)
  hg.addColorStop(0, '#0f172a'); hg.addColorStop(1, '#1e3058')
  ctx.fillStyle = hg; ctx.fillRect(fx, fy + 24, fw, 84)
  ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.font = 'bold 13px sans-serif'
  ctx.fillText('Build · Ship · Grow', fx + 10, fy + 56)
  ctx.fillStyle = 'rgba(255,255,255,0.42)'; ctx.font = '9px sans-serif'
  ctx.fillText('Il tuo team, in 3D.', fx + 10, fy + 72)

  // CTA — selected
  ctx.fillStyle = hex; ctx.beginPath(); ctx.roundRect(fx + 10, fy + 82, 70, 18, 9); ctx.fill()
  ctx.fillStyle = 'white'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('Entra →', fx + 24, fy + 94)
  ctx.strokeStyle = hex; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.rect(fx + 8, fy + 80, 74, 22); ctx.stroke()
  ;[[0, 0],[1, 0],[0, 1],[1, 1]].forEach(([hx, hy]) => {
    ctx.fillStyle = 'white'; ctx.fillRect(fx + 8 + hx * 74 - 3, fy + 80 + hy * 22 - 3, 6, 6)
    ctx.strokeStyle = hex; ctx.lineWidth = 1; ctx.strokeRect(fx + 8 + hx * 74 - 3, fy + 80 + hy * 22 - 3, 6, 6)
  })

  // Cards section
  ctx.fillStyle = '#f1f5f9'; ctx.fillRect(fx, fy + 108, fw, fh - 108)
  ctx.fillStyle = '#64748b'; ctx.font = 'bold 8px sans-serif'; ctx.fillText('Features', fx + 10, fy + 122)
  ;[0, 1, 2].forEach(ci => {
    const cx = fx + 8 + ci * 82, cw = 74, cy2 = fy + 130
    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.roundRect(cx, cy2, cw, 68, 5); ctx.fill()
    ctx.fillStyle = [hex, '#f472b6', '#34d399'][ci]
    ctx.beginPath(); ctx.roundRect(cx, cy2, cw, 16, [5, 5, 0, 0]); ctx.fill()
    ctx.fillStyle = 'white'; ctx.font = 'bold 8px sans-serif'
    ctx.fillText(['Design', 'Dev', 'Launch'][ci], cx + 7, cy2 + 12)
    ctx.fillStyle = '#334155'; ctx.font = '7.5px sans-serif'
    ctx.fillText(['UI/UX first', 'API robusta', 'Deploy 🚀'][ci], cx + 7, cy2 + 27)
    ;[0, 1, 2].forEach(li => {
      ctx.fillStyle = li === 0 ? '#e2e8f0' : '#f8fafc'
      ctx.fillRect(cx + 7, cy2 + 34 + li * 9, cw - 14, 5)
    })
  })

  // ── Right: Properties ───────────────────────────────────────────────────────
  ctx.fillStyle = '#1b1f2b'; ctx.fillRect(W - RP, 30, RP, H - 30)
  ctx.fillStyle = '#23283c'; ctx.fillRect(W - RP, 30, RP, 20)
  ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = 'bold 9px sans-serif'
  ctx.fillText('DESIGN', W - RP + 8, 44)

  ;[['W','70px'],['H','18px'],['X','8'],['Y','80'],['R','9'],['O','100%']].forEach(([lbl, val], i) => {
    const px = W - RP + (i % 2) * 52 + 6, py = 60 + Math.floor(i / 2) * 28
    ctx.fillStyle = '#252b3a'; ctx.beginPath(); ctx.roundRect(px, py - 13, 48, 18, 3); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.font = '7px sans-serif'; ctx.fillText(lbl, px + 4, py - 1)
    ctx.fillStyle = 'rgba(255,255,255,0.82)'; ctx.font = '8.5px sans-serif'; ctx.fillText(val, px + 20, py)
  })

  ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(W - RP + 6, 150, RP - 12, 1)

  ctx.fillStyle = 'rgba(255,255,255,0.32)'; ctx.font = '8px sans-serif'; ctx.fillText('Fill', W - RP + 6, 165)
  ctx.fillStyle = hex; ctx.beginPath(); ctx.roundRect(W - RP + 6, 168, 20, 20, 4); ctx.fill()
  ctx.fillStyle = '#252b3a'; ctx.beginPath(); ctx.roundRect(W - RP + 30, 168, 72, 20, 4); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '8.5px monospace'
  ctx.fillText(hex.slice(1).toUpperCase(), W - RP + 34, 181)

  ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(W - RP + 6, 196, RP - 12, 1)

  ctx.fillStyle = 'rgba(255,255,255,0.32)'; ctx.font = '8px sans-serif'; ctx.fillText('Stroke', W - RP + 6, 212)
  ctx.strokeStyle = hex; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(W - RP + 6, 215, 20, 20, 3); ctx.stroke()
  ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = '8px sans-serif'; ctx.fillText('1.5  Outside', W - RP + 32, 228)

  ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(W - RP + 6, 244, RP - 12, 1)

  ctx.fillStyle = 'rgba(255,255,255,0.32)'; ctx.font = '8px sans-serif'; ctx.fillText('Effects', W - RP + 6, 260)
  ctx.fillStyle = '#1e2a3e'; ctx.beginPath(); ctx.roundRect(W - RP + 6, 263, RP - 12, 20, 3); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '8px sans-serif'; ctx.fillText('↓  Drop Shadow', W - RP + 10, 276)

  ctx.fillStyle = hex + '20'; ctx.beginPath(); ctx.roundRect(W - RP + 6, 294, RP - 12, 24, 5); ctx.fill()
  ctx.strokeStyle = hex; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(W - RP + 6, 294, RP - 12, 24, 5); ctx.stroke()
  ctx.fillStyle = hex; ctx.font = 'bold 9.5px sans-serif'; ctx.fillText('Export 1×', W - RP + 24, 310)
}

function drawPM(ctx, W, H, hex) {
  ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 30, W, H - 30)

  // ── Sprint header bar ────────────────────────────────────────────────────────
  ctx.fillStyle = '#161b27'; ctx.fillRect(0, 30, W, 32)
  ctx.fillStyle = hex; ctx.font = 'bold 11px sans-serif'; ctx.fillText('Sprint 12', 14, 50)
  ctx.fillStyle = 'rgba(255,255,255,0.38)'; ctx.font = '9px sans-serif'
  ctx.fillText('8 Mar – 22 Mar  ·  8 issues  ·  67% done', 104, 50)
  // Sprint progress strip
  ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.roundRect(14, 57, W - 28, 5, 3); ctx.fill()
  ctx.fillStyle = hex + 'cc'; ctx.beginPath(); ctx.roundRect(14, 57, (W - 28) * 0.67, 5, 3); ctx.fill()

  // ── Columns ─────────────────────────────────────────────────────────────────
  const priC = { high: '#ef4444', med: '#f59e0b', low: '#6b7280' }
  const tagBg = { Bug: '#ef444420', Docs: '#3b82f620', Review: '#a78bfa20', Planning: hex + '20', Dev: '#34d39920', DevOps: '#f9731620', DB: '#06b6d420', Release: '#22c55e20' }
  const tagFg = { Bug: '#ef4444', Docs: '#3b82f6', Review: '#a78bfa', Planning: hex, Dev: '#34d399', DevOps: '#f97316', DB: '#06b6d4', Release: '#22c55e' }

  const cols = [
    { name: 'Backlog', clr: '#64748b', tasks: [
      { title: 'Fix login 401',     pri: 'high', tag: 'Bug',      usr: 'T' },
      { title: 'Update README',     pri: 'low',  tag: 'Docs',     usr: 'L' },
      { title: 'Code review #18',   pri: 'med',  tag: 'Review',   usr: 'N' },
    ]},
    { name: 'In Progress', clr: hex, tasks: [
      { title: 'Sprint planning',   pri: 'high', tag: 'Planning', usr: 'T' },
      { title: 'API design v2',     pri: 'high', tag: 'Dev',      usr: 'D' },
    ]},
    { name: 'Done ✓', clr: '#22c55e', tasks: [
      { title: 'Setup CI pipeline', pri: 'med',  tag: 'DevOps',   usr: 'N' },
      { title: 'DB migration',      pri: 'high', tag: 'DB',       usr: 'D' },
      { title: 'v1.0 deploy 🚀',   pri: 'high', tag: 'Release',  usr: 'T' },
    ]},
  ]

  const cw = Math.floor((W - 24) / 3)
  cols.forEach((col, ci) => {
    const cx = 8 + ci * (cw + 4)
    // Column bg
    ctx.fillStyle = '#161b27'; ctx.beginPath(); ctx.roundRect(cx, 68, cw, H - 76, 7); ctx.fill()
    // Column header
    ctx.fillStyle = col.clr + '18'; ctx.beginPath(); ctx.roundRect(cx, 68, cw, 28, [7, 7, 0, 0]); ctx.fill()
    ctx.fillStyle = col.clr; ctx.font = 'bold 10px sans-serif'; ctx.fillText(col.name, cx + 10, 87)
    // Count badge
    ctx.fillStyle = col.clr + '30'; ctx.beginPath(); ctx.roundRect(cx + cw - 28, 73, 20, 16, 8); ctx.fill()
    ctx.fillStyle = col.clr; ctx.font = 'bold 8.5px sans-serif'; ctx.fillText(String(col.tasks.length), cx + cw - 21, 85)

    // Task cards
    col.tasks.forEach((task, ti) => {
      const ty = 102 + ti * 72
      if (ty + 64 > H) return
      // Card bg
      ctx.fillStyle = '#1e2538'; ctx.beginPath(); ctx.roundRect(cx + 4, ty, cw - 8, 64, 6); ctx.fill()
      // Priority left bar
      ctx.fillStyle = priC[task.pri]; ctx.beginPath(); ctx.roundRect(cx + 4, ty, 3, 64, [6, 0, 0, 6]); ctx.fill()
      // Title
      ctx.fillStyle = ci === 2 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.88)'
      ctx.font = '9.5px sans-serif'
      const titleW = cw - 24
      const words = task.title.split(' ')
      let line = '', row = 0
      words.forEach(w => {
        const t2 = line + w + ' '
        if (ctx.measureText(t2).width > titleW) { ctx.fillText(line.trim(), cx + 12, ty + 17 + row * 14); line = w + ' '; row++ }
        else line = t2
      })
      ctx.fillText(line.trim(), cx + 12, ty + 17 + row * 14)
      // Tag pill
      const tagW = ctx.measureText(task.tag).width + 12
      ctx.fillStyle = tagBg[task.tag] || 'rgba(255,255,255,0.06)'
      ctx.beginPath(); ctx.roundRect(cx + 11, ty + 44, tagW, 14, 7); ctx.fill()
      ctx.fillStyle = tagFg[task.tag] || 'rgba(255,255,255,0.4)'; ctx.font = '7.5px sans-serif'
      ctx.fillText(task.tag, cx + 17, ty + 54)
      // User avatar
      ctx.fillStyle = hex + '38'; ctx.beginPath(); ctx.arc(cx + cw - 16, ty + 51, 8, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = hex; ctx.font = 'bold 8px sans-serif'; ctx.fillText(task.usr, cx + cw - 19, ty + 55)
    })
  })
}

function drawDirector(ctx, W, H, hex) {
  const bg = ctx.createLinearGradient(0, 30, 0, H)
  bg.addColorStop(0, '#07081a'); bg.addColorStop(1, '#0b0f22')
  ctx.fillStyle = bg; ctx.fillRect(0, 30, W, H - 30)

  // ── Header ───────────────────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = 'bold 15px sans-serif'
  ctx.fillText('Strategic Overview', 20, 60)
  ctx.fillStyle = 'rgba(255,255,255,0.32)'; ctx.font = '9.5px sans-serif'
  ctx.fillText('Q1 2026  ·  FriendsHQ  ·  Live', 20, 76)
  // Live indicator
  ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(W - 20, 66, 4, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#22c55e44'; ctx.beginPath(); ctx.arc(W - 20, 66, 8, 0, Math.PI * 2); ctx.fill()

  // ── KPI cards row ────────────────────────────────────────────────────────────
  const kpis = [
    { label: 'MRR',    value: '€ 18K', delta: '+24%', up: true },
    { label: 'Users',  value: '1.24K', delta: '+12%', up: true },
    { label: 'NPS',    value: '72',    delta: '+8pt',  up: true },
    { label: 'Sprint', value: '94%',   delta: '47/50', up: true },
  ]
  const kw = Math.floor((W - 28) / 4)
  kpis.forEach((k, i) => {
    const kx = 8 + i * (kw + 4)
    ctx.fillStyle = 'rgba(255,255,255,0.04)'
    ctx.beginPath(); ctx.roundRect(kx, 82, kw, 64, 6); ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1
    ctx.beginPath(); ctx.roundRect(kx, 82, kw, 64, 6); ctx.stroke()
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '8.5px sans-serif'
    ctx.fillText(k.label, kx + 12, 100)
    ctx.fillStyle = hex; ctx.font = 'bold 19px sans-serif'
    ctx.fillText(k.value, kx + 12, 127)
    ctx.fillStyle = '#22c55e'; ctx.font = '8.5px sans-serif'
    ctx.fillText('↑ ' + k.delta, kx + 12, 141)
  })

  // ── Area chart ───────────────────────────────────────────────────────────────
  const chX = 14, chY = 155, chW = W - 28, chH = 106
  ctx.fillStyle = 'rgba(255,255,255,0.025)'; ctx.beginPath(); ctx.roundRect(chX, chY, chW, chH, 6); ctx.fill()
  // Horizontal grid lines
  ;[0.25, 0.5, 0.75].forEach(r => {
    const gy = chY + chH - r * chH
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4])
    ctx.beginPath(); ctx.moveTo(chX, gy); ctx.lineTo(chX + chW, gy); ctx.stroke()
  })
  ctx.setLineDash([])

  const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu']
  const vals   = [0.30, 0.46, 0.58, 0.72, 0.82, 0.93]
  const stepX  = chW / (months.length - 1)

  // Area fill
  ctx.beginPath()
  ctx.moveTo(chX, chY + chH)
  vals.forEach((v, i) => ctx.lineTo(chX + i * stepX, chY + chH - v * chH * 0.9))
  ctx.lineTo(chX + (months.length - 1) * stepX, chY + chH)
  ctx.closePath()
  const ag = ctx.createLinearGradient(0, chY, 0, chY + chH)
  ag.addColorStop(0, hex + '66'); ag.addColorStop(1, hex + '06')
  ctx.fillStyle = ag; ctx.fill()

  // Line
  ctx.beginPath()
  vals.forEach((v, i) => {
    const px = chX + i * stepX, py = chY + chH - v * chH * 0.9
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  })
  ctx.strokeStyle = hex; ctx.lineWidth = 2.5; ctx.stroke()

  // Dots + month labels
  vals.forEach((v, i) => {
    const px = chX + i * stepX, py = chY + chH - v * chH * 0.9
    ctx.fillStyle = hex; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#08091a'; ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.32)'; ctx.font = '8px sans-serif'
    ctx.fillText(months[i], px - 9, chY + chH + 14)
  })

  // ── Goal progress bars ───────────────────────────────────────────────────────
  const goals = [
    { name: 'Product Launch',  pct: 0.78 },
    { name: 'Revenue Target',  pct: 0.91 },
    { name: 'Team Growth',     pct: 0.60 },
  ]
  goals.forEach((g, i) => {
    const gy = 278 + i * 34
    ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = '9px sans-serif'; ctx.fillText(g.name, 14, gy)
    ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.beginPath(); ctx.roundRect(14, gy + 4, chW, 10, 5); ctx.fill()
    ctx.fillStyle = hex + 'cc'; ctx.beginPath(); ctx.roundRect(14, gy + 4, chW * g.pct, 10, 5); ctx.fill()
    ctx.fillStyle = 'rgba(255,255,255,0.42)'; ctx.font = '8.5px sans-serif'
    ctx.fillText(Math.round(g.pct * 100) + '%', 14 + chW * g.pct + 6, gy + 13)
  })
}

function drawTester(ctx, W, H, hex) {
  ctx.fillStyle = '#050d0a'; ctx.fillRect(0, 30, W, H - 30)

  // ── Header ───────────────────────────────────────────────────────────────────
  ctx.fillStyle = '#0c1a12'; ctx.fillRect(0, 30, W, 28)
  ctx.fillStyle = hex; ctx.font = 'bold 11px monospace'
  ctx.fillText('JEST  v29.7', 14, 49)
  ctx.fillStyle = 'rgba(255,255,255,0.38)'; ctx.font = '9px monospace'
  ctx.fillText('friends-hq  ·  5 suites  ·  running...', 120, 49)
  // Running indicator
  ctx.fillStyle = hex; ctx.beginPath(); ctx.arc(W - 16, 45, 4, 0, Math.PI * 2); ctx.fill()

  // ── Test suites ──────────────────────────────────────────────────────────────
  const tests = [
    { file: 'auth.test.ts',     passed: 8,  failed: 0, time: '12ms', cov: 94 },
    { file: 'api.test.ts',      passed: 14, failed: 0, time: '31ms', cov: 88 },
    { file: 'checkout.test.ts', passed: 6,  failed: 1, time: '88ms', cov: 71 },
    { file: 'ui.test.ts',       passed: 11, failed: 0, time: '9ms',  cov: 96 },
    { file: 'db.test.ts',       passed: 9,  failed: 0, time: '22ms', cov: 91 },
  ]
  tests.forEach((t, i) => {
    const ty = 64 + i * 46
    const ok = t.failed === 0
    // Row bg
    ctx.fillStyle = ok ? '#071209' : '#1a0707'
    ctx.beginPath(); ctx.roundRect(8, ty, W - 16, 38, 4); ctx.fill()
    // Left bar
    ctx.fillStyle = ok ? hex : '#ef4444'
    ctx.beginPath(); ctx.roundRect(8, ty, 3, 38, [4, 0, 0, 4]); ctx.fill()
    // Icon
    ctx.fillStyle = ok ? hex : '#ef4444'; ctx.font = 'bold 12px monospace'
    ctx.fillText(ok ? '✓' : '✗', 18, ty + 16)
    // File name
    ctx.fillStyle = ok ? 'rgba(255,255,255,0.85)' : '#ef4444'; ctx.font = '10px monospace'
    ctx.fillText(t.file, 34, ty + 16)
    // Sub-row: passed/failed count + time
    ctx.fillStyle = ok ? 'rgba(255,255,255,0.3)' : '#ef4444aa'; ctx.font = '8.5px sans-serif'
    ctx.fillText(`${t.passed} passed${t.failed ? '  ·  1 FAILED' : ''}  ·  ${t.time}`, 34, ty + 29)
    // Coverage pill
    const covC = t.cov >= 90 ? '#22c55e' : t.cov >= 75 ? '#f59e0b' : '#ef4444'
    ctx.fillStyle = covC + '25'
    ctx.beginPath(); ctx.roundRect(W - 58, ty + 8, 46, 20, 5); ctx.fill()
    ctx.fillStyle = covC; ctx.font = '8.5px monospace'
    ctx.fillText(t.cov + '% cov', W - 54, ty + 21)

    // For failed test — show error snippet
    if (!ok) {
      ctx.fillStyle = '#1f0808'; ctx.beginPath(); ctx.roundRect(34, ty + 33, W - 58, 0, 2); ctx.fill()
    }
  })

  // ── Error detail (for the failing test) ─────────────────────────────────────
  const errY = 300
  ctx.fillStyle = '#1a0707'; ctx.beginPath(); ctx.roundRect(8, errY, W - 16, 42, 5); ctx.fill()
  ctx.strokeStyle = '#ef444440'; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(8, errY, W - 16, 42, 5); ctx.stroke()
  ctx.fillStyle = '#ef4444'; ctx.font = 'bold 8.5px monospace'; ctx.fillText('● checkout.test.ts  >  should process payment', 14, errY + 13)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.font = '8px monospace'
  ctx.fillText('Expected: 200   Received: 422', 14, errY + 25)
  ctx.fillStyle = '#ef4444aa'; ctx.font = '8px monospace'
  ctx.fillText('at checkout.spec.ts:42:18', 14, errY + 37)

  // ── Summary footer ───────────────────────────────────────────────────────────
  ctx.fillStyle = '#0a1a0d'; ctx.fillRect(0, H - 38, W, 38)
  ctx.fillStyle = '#22c55e'; ctx.font = 'bold 9.5px monospace'; ctx.fillText('✓ 48 passed', 14, H - 22)
  ctx.fillStyle = '#ef4444'; ctx.font = 'bold 9.5px monospace'; ctx.fillText('✗ 1 failed', 120, H - 22)
  ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '8.5px monospace'; ctx.fillText('5 suites  ·  2.6s', 214, H - 22)
  // Progress bar
  const bw = W - 28
  ctx.fillStyle = '#1a2f1a'; ctx.beginPath(); ctx.roundRect(14, H - 10, bw, 5, 3); ctx.fill()
  ctx.fillStyle = hex; ctx.beginPath(); ctx.roundRect(14, H - 10, bw * 0.979, 5, 3); ctx.fill()
  ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.roundRect(14 + bw * 0.979, H - 10, bw * 0.021, 5, [0, 3, 3, 0]); ctx.fill()
}

function drawDB(ctx, W, H, hex) {
  ctx.fillStyle = '#02080f'; ctx.fillRect(0, 30, W, H - 30)

  // Helper: draw a line of syntax-highlighted tokens at (x, y)
  function sqlLine(tokens, x, y) {
    let cx = x
    tokens.forEach(([text, color]) => {
      ctx.fillStyle = color; ctx.fillText(text, cx, y)
      cx += ctx.measureText(text).width
    })
  }

  ctx.font = '10px monospace'

  // ── Prompt + connection ──────────────────────────────────────────────────────
  sqlLine([[' dalla', hex], ['@friendshq', 'rgba(255,255,255,0.4)'], [':~$ ', 'rgba(255,255,255,0.25)']], 10, 52)
  sqlLine([['psql -U admin friends_db', 'rgba(255,255,255,0.85)']], 96, 52)
  sqlLine([['psql (16.1)  —  SSL connection  ✓', hex]], 10, 67)

  // ── Query ────────────────────────────────────────────────────────────────────
  const KW = hex           // SQL keywords
  const ID = 'rgba(255,255,255,0.82)' // identifiers
  const OP = '#a78bfa'     // operators / clauses
  const ST = '#34d399'     // strings / aliases
  const CM = 'rgba(255,255,255,0.28)' // comments / punctuation

  const query = [
    [[' SELECT ', KW], ['u.name', ID], [', ', CM], ['COUNT', KW], ['(o.id)', ID], [' AS ', OP], ['total', ST]],
    [['   FROM ', KW], ['users ', ID], ['u', ST]],
    [['   LEFT JOIN ', KW], ['orders ', ID], ['o', ST], [' ON ', OP], ['u.id = o.uid', ID]],
    [['   GROUP BY ', KW], ['u.name', ID]],
    [['   ORDER BY ', KW], ['total ', ID], ['DESC ', OP], ['LIMIT ', KW], ['10', '#fbbf24'], [';', CM]],
  ]
  query.forEach((tokens, i) => sqlLine(tokens, 10, 86 + i * 16))

  // ── Result table ─────────────────────────────────────────────────────────────
  const tY = 172
  const rows = [
    { name: 'Napo',  total: '312', clr: hex },
    { name: 'Dalla', total: '298', clr: 'rgba(255,255,255,0.8)' },
    { name: 'Leo',   total: '247', clr: 'rgba(255,255,255,0.8)' },
    { name: 'Teo',   total: '189', clr: 'rgba(255,255,255,0.8)' },
    { name: 'Andre', total: '154', clr: 'rgba(255,255,255,0.8)' },
  ]
  const colW = [160, 100], colX = [14, 180]
  // Table header
  ctx.fillStyle = '#101c2a'; ctx.beginPath(); ctx.roundRect(10, tY - 2, 290, 20, [4, 4, 0, 0]); ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = 'bold 9px monospace'
  ctx.fillText('name', colX[0] + 4, tY + 13)
  ctx.fillText('total', colX[1] + 4, tY + 13)
  // Separator
  ctx.fillStyle = '#1e3050'; ctx.fillRect(10, tY + 18, 290, 1)
  // Data rows
  rows.forEach((r, i) => {
    const ry = tY + 24 + i * 22
    if (i % 2 === 0) { ctx.fillStyle = '#0a1520'; ctx.fillRect(10, ry - 6, 290, 22) }
    ctx.fillStyle = r.clr; ctx.font = '10px monospace'
    ctx.fillText(r.name, colX[0] + 4, ry + 8)
    ctx.fillText(r.total, colX[1] + 4, ry + 8)
  })
  // Bottom border
  ctx.fillStyle = '#1e3050'; ctx.fillRect(10, tY + 24 + rows.length * 22 - 4, 290, 1)
  ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '9px monospace'
  ctx.fillText('(5 rows)  —  9 ms', 14, tY + 24 + rows.length * 22 + 10)

  // ── Second prompt + cursor ───────────────────────────────────────────────────
  const promptY = tY + 24 + rows.length * 22 + 28
  sqlLine([[' dalla', hex], ['@friendshq', 'rgba(255,255,255,0.4)'], [':~$ ', 'rgba(255,255,255,0.25)']], 10, promptY)
  // Blinking cursor block
  ctx.fillStyle = hex + 'cc'; ctx.fillRect(96, promptY - 10, 7, 13)
}

function makeWhiteboard() {
  const g = new THREE.Group()
  const frame = box(2.4, 1.4, 0.07, 0x94a3b8)
  g.add(frame)
  const surface = box(2.2, 1.2, 0.04, 0xf8fafc)
  surface.position.z = 0.055; g.add(surface)
  const tray = box(2.2, 0.07, 0.12, 0x64748b)
  tray.position.set(0, -0.66, 0.09); g.add(tray)
  const colors = [0x3b82f6, 0xf97316, 0x10b981, 0x8b5cf6]
  const lines = [[0.9, 0.008, 0.01, -0.2, 0.15], [0.6, 0.008, 0.01, 0.3, -0.05], [0.5, 0.008, 0.01, -0.5, -0.05]]
  lines.forEach(([w, h, d, x, y], i) => {
    const l = box(w, h, d, colors[i])
    l.position.set(x, y, 0.078); g.add(l)
  })
  ;[[-0.7, -0.05], [0.1, 0.3], [0.6, -0.2]].forEach(([x, y], i) => {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshLambertMaterial({ color: colors[i] }))
    dot.position.set(x, y, 0.079); g.add(dot)
  })
  const marker = box(0.04, 0.18, 0.04, 0x1e293b)
  marker.position.set(-0.8, -0.6, 0.12); marker.rotation.z = 0.3; g.add(marker)
  return g
}

function makeBookshelf() {
  const g = new THREE.Group()
  const wood = 0x92400e
  const back = box(1.6, 2.0, 0.05, wood); g.add(back)
  const left = box(0.05, 2.0, 0.32, wood); left.position.x = -0.775; g.add(left)
  const right = box(0.05, 2.0, 0.32, wood); right.position.x = 0.775; g.add(right)
  const btm = box(1.6, 0.05, 0.32, wood); btm.position.y = -0.975; g.add(btm)
  const top = box(1.6, 0.05, 0.32, wood); top.position.y = 0.975; g.add(top)
  const shelfY = [-0.5, 0.1, 0.7]
  shelfY.forEach(sy => {
    const sh = box(1.5, 0.04, 0.3, 0xa16207); sh.position.y = sy; g.add(sh)
  })
  const bookColors = [0x7c3aed, 0xdc2626, 0x2563eb, 0xd97706, 0x059669, 0xdb2777, 0x0891b2, 0x65a30d]
  shelfY.forEach(sy => {
    let bx = -0.68
    let bi = Math.floor(Math.random() * bookColors.length)
    while (bx < 0.65) {
      const bw = 0.055 + Math.random() * 0.04
      const bh = 0.22 + Math.random() * 0.14
      const bk = box(bw, bh, 0.24, bookColors[bi % bookColors.length])
      bk.position.set(bx + bw / 2, sy + bh / 2 + 0.02, 0.03); g.add(bk)
      bx += bw + 0.007; bi++
    }
  })
  return g
}

function makeWaterCooler() {
  const g = new THREE.Group()
  const base = box(0.32, 0.85, 0.32, 0xe2e8f0); base.position.y = 0.425; g.add(base)
  const trim = box(0.34, 0.06, 0.34, 0xcbd5e1); trim.position.y = 0.86; g.add(trim)
  const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.52, 14), new THREE.MeshLambertMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.75 }))
  bottle.position.y = 1.12; g.add(bottle)
  const cap = cyl(0.102, 0.102, 0.04, 14, 0x1d4ed8); cap.position.y = 0.88; g.add(cap)
  const tapB = box(0.07, 0.045, 0.06, 0x3b82f6); tapB.position.set(-0.09, 0.38, 0.19); g.add(tapB)
  const tapR = box(0.07, 0.045, 0.06, 0xef4444); tapR.position.set(0.09, 0.38, 0.19); g.add(tapR)
  return g
}

function makePrinter() {
  const g = new THREE.Group()
  const body = box(0.58, 0.24, 0.46, 0xe2e8f0); body.position.y = 0.12; g.add(body)
  const lid = box(0.56, 0.05, 0.44, 0xd1d5db); lid.position.y = 0.265; g.add(lid)
  const slot = box(0.42, 0.025, 0.045, 0x9ca3af); slot.position.set(0, 0.19, 0.235); g.add(slot)
  const panel = box(0.18, 0.06, 0.02, 0xf1f5f9); panel.position.set(0.16, 0.215, 0.235); g.add(panel)
  const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.018, 10), new THREE.MeshLambertMaterial({ color: 0x22c55e }))
  btn.rotation.x = Math.PI / 2; btn.position.set(0.2, 0.215, 0.247); g.add(btn)
  const tray = box(0.42, 0.008, 0.22, 0xf8fafc); tray.position.set(0, 0.055, 0.33); tray.rotation.x = 0.18; g.add(tray)
  return g
}

function makeSofa() {
  const g = new THREE.Group()
  const seat = box(2.0, 0.22, 0.82, 0x374151); seat.position.y = 0.44; g.add(seat)
  const back = box(2.0, 0.62, 0.2, 0x374151); back.position.set(0, 0.76, -0.32); g.add(back)
  const armL = box(0.2, 0.38, 0.82, 0x374151); armL.position.set(-0.9, 0.63, 0); g.add(armL)
  const armR = box(0.2, 0.38, 0.82, 0x374151); armR.position.set(0.9, 0.63, 0); g.add(armR)
  const legPositions = [[-0.85, 0, 0.32], [0.85, 0, 0.32], [-0.85, 0, -0.32], [0.85, 0, -0.32]]
  legPositions.forEach(([x, y, z]) => {
    const leg = cyl(0.04, 0.04, 0.36, 8, 0x1a1a1a); leg.position.set(x, 0.18, z); g.add(leg)
  })
  ;[-0.55, 0, 0.55].forEach(x => {
    const cushion = box(0.56, 0.1, 0.7, 0x4b5563); cushion.position.set(x, 0.56, 0.04); g.add(cushion)
  })
  return g
}

function makeCoffeeTable() {
  const g = new THREE.Group()
  const top = box(1.1, 0.06, 0.58, 0x92400e); top.position.y = 0.4; g.add(top)
  ;[[-0.45, 0.2], [0.45, 0.2], [-0.45, -0.2], [0.45, -0.2]].forEach(([x, z]) => {
    const leg = cyl(0.03, 0.03, 0.38, 8, 0x44403c); leg.position.set(x, 0.19, z); g.add(leg)
  })
  const mag = box(0.22, 0.008, 0.3, 0xfef3c7); mag.position.set(-0.2, 0.435, 0.06); mag.rotation.y = 0.15; g.add(mag)
  const mug = makeMug(0xffffff); mug.scale.setScalar(0.8); mug.position.set(0.28, 0.43, -0.08); g.add(mug)
  return g
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

function makeMouse(color = 0x1e293b) {
  const g = new THREE.Group()
  const body = box(0.058, 0.024, 0.105, color)
  body.position.y = 0.012; g.add(body)
  // Slightly rounded front
  const nose = box(0.04, 0.016, 0.025, color)
  nose.position.set(0, 0.012, -0.062); g.add(nose)
  // Scroll wheel
  const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.009, 0.022, 8), new THREE.MeshLambertMaterial({ color: 0x555555 }))
  wheel.rotation.x = Math.PI / 2
  wheel.position.set(0, 0.024, 0.01); g.add(wheel)
  // Separator line between buttons
  const line = box(0.002, 0.002, 0.065, 0x000000)
  line.position.set(0, 0.025, 0.018); g.add(line)
  return g
}

function makePCTower(accentColor = 0x3b82f6) {
  const g = new THREE.Group()
  const body = box(0.19, 0.44, 0.44, 0x111827)
  body.position.y = 0.22; g.add(body)
  // Front panel
  const front = box(0.18, 0.40, 0.018, 0x1a2235)
  front.position.set(0, 0.22, 0.22); g.add(front)
  // Power LED strip
  const led = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.22, 0.008), new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.85 }))
  led.position.set(-0.07, 0.25, 0.23); g.add(led)
  // Power button
  const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.012, 10), new THREE.MeshLambertMaterial({ color: accentColor }))
  btn.rotation.x = Math.PI / 2
  btn.position.set(0.05, 0.38, 0.232); g.add(btn)
  // USB slots
  ;[0.30, 0.27].forEach(by => {
    const usb = box(0.032, 0.012, 0.014, 0x334155)
    usb.position.set(0.05, by, 0.232); g.add(usb)
  })
  // Optical drive slot
  const dvd = box(0.11, 0.018, 0.012, 0x0f172a)
  dvd.position.set(-0.02, 0.34, 0.232); g.add(dvd)
  // Ventilation rear grille
  for (let i = 0; i < 6; i++) {
    const slot = box(0.15, 0.008, 0.006, 0x0a0f1a)
    slot.position.set(0, 0.1 + i * 0.038, -0.222); g.add(slot)
  }
  return g
}

function makeCactus(scale = 1) {
  const g = new THREE.Group()
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.09 * scale, 0.075 * scale, 0.16 * scale, 10), new THREE.MeshLambertMaterial({ color: 0xb45309 }))
  g.add(pot)
  // Main trunk
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.04 * scale, 0.045 * scale, 0.32 * scale, 8), new THREE.MeshLambertMaterial({ color: 0x4d7c0f }))
  trunk.position.y = 0.24 * scale; g.add(trunk)
  // Left arm
  const armL = new THREE.Group()
  const armLH = new THREE.Mesh(new THREE.CylinderGeometry(0.028 * scale, 0.03 * scale, 0.12 * scale, 8), new THREE.MeshLambertMaterial({ color: 0x4d7c0f }))
  armLH.rotation.z = Math.PI / 2; armLH.position.y = 0; armL.add(armLH)
  const armLV = new THREE.Mesh(new THREE.CylinderGeometry(0.028 * scale, 0.03 * scale, 0.12 * scale, 8), new THREE.MeshLambertMaterial({ color: 0x4d7c0f }))
  armLV.position.y = 0.08 * scale; armL.add(armLV)
  armL.position.set(-0.1 * scale, 0.28 * scale, 0); g.add(armL)
  // Right arm (higher)
  const armR = new THREE.Group()
  const armRH = new THREE.Mesh(new THREE.CylinderGeometry(0.025 * scale, 0.028 * scale, 0.1 * scale, 8), new THREE.MeshLambertMaterial({ color: 0x4d7c0f }))
  armRH.rotation.z = -Math.PI / 2; armRH.position.y = 0; armR.add(armRH)
  const armRV = new THREE.Mesh(new THREE.CylinderGeometry(0.025 * scale, 0.028 * scale, 0.1 * scale, 8), new THREE.MeshLambertMaterial({ color: 0x4d7c0f }))
  armRV.position.y = 0.07 * scale; armR.add(armRV)
  armR.position.set(0.1 * scale, 0.32 * scale, 0); g.add(armR)
  return g
}

function makeFloorLamp(shade = 0xfff8e0) {
  const g = new THREE.Group()
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.06, 14), new THREE.MeshLambertMaterial({ color: 0x374151 }))
  base.position.y = 0.03; g.add(base)
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.022, 1.55, 8), new THREE.MeshLambertMaterial({ color: 0x4b5563 }))
  pole.position.y = 0.835; g.add(pole)
  // Curved arm
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.42, 8), new THREE.MeshLambertMaterial({ color: 0x4b5563 }))
  arm.position.set(0.18, 1.56, 0); arm.rotation.z = -Math.PI / 4; g.add(arm)
  // Lamp shade
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.08, 0.18, 14), new THREE.MeshLambertMaterial({ color: shade }))
  head.position.set(0.31, 1.69, 0); g.add(head)
  // Glow
  const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.06, 0.01, 14), new THREE.MeshBasicMaterial({ color: 0xfffff0, transparent: true, opacity: 0.7 }))
  glow.position.set(0.31, 1.6, 0); g.add(glow)
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

// ─── Office door (sliding glass, starts closed, opens on click) ───────────────
function makeDoor() {
  const g = new THREE.Group()
  const fMat = new THREE.MeshLambertMaterial({ color: 0x2a3140 })
  const gMat = new THREE.MeshLambertMaterial({ color: 0xadd8e6, transparent: true, opacity: 0.42, side: THREE.DoubleSide })
  const hMat = new THREE.MeshLambertMaterial({ color: 0x9ca3af })
  const openingWidth = 6.0
  const jambWidth = 0.2
  const panelWidth = 2.8
  const panelTravel = 4.4
  const frameHalfSpan = openingWidth / 2 - jambWidth / 2
  const closedPanelX = panelWidth / 2
  const doorHeight = 3.2
  const panelHeight = 3.14
  const panelCenterY = 1.57

  // Frame — top bar and two jambs only (no sill = no step)
  const topBar = new THREE.Mesh(new THREE.BoxGeometry(openingWidth, 0.2, 0.22), fMat)
  topBar.position.set(0, doorHeight, 0); g.add(topBar)
  ;[-frameHalfSpan, frameHalfSpan].forEach(jx => {
    const jamb = new THREE.Mesh(new THREE.BoxGeometry(jambWidth, doorHeight, 0.22), fMat)
    jamb.position.set(jx, doorHeight / 2, 0); g.add(jamb)
  })

  // Two panels — start CLOSED (meeting at center), slide open on enter
  ;[-1, 1].forEach(side => {
    const panel = new THREE.Group()
    panel.userData.openX = side * panelTravel
    panel.userData.closedX = side * closedPanelX

    // Glass pane
    const glass = new THREE.Mesh(new THREE.BoxGeometry(panelWidth, panelHeight, 0.06), gMat)
    glass.position.y = panelCenterY; panel.add(glass)
    // Top + bottom rails
    ;[panelHeight - 0.01, 0.05].forEach(ry => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(panelWidth, 0.14, 0.16), fMat)
      rail.position.set(0, ry, 0.05); panel.add(rail)
    })
    // Outer vertical stile
    const stile = new THREE.Mesh(new THREE.BoxGeometry(0.12, panelHeight, 0.16), fMat)
    stile.position.set(side * (panelWidth / 2 - 0.06), panelCenterY, 0.05); panel.add(stile)
    // Pull handle on inner edge
    const handleX = -side * (panelWidth / 2 - 0.25)
    const hBar = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.52, 10), hMat)
    hBar.rotation.x = Math.PI / 2; hBar.position.set(handleX, 1.52, 0.1); panel.add(hBar)
    ;[-0.22, 0.22].forEach(hy => {
      const brk = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.12), hMat)
      brk.position.set(handleX, 1.52 + hy, 0.1); panel.add(brk)
    })
    // Horizontal cross-bar mid-panel
    const mid = new THREE.Mesh(new THREE.BoxGeometry(panelWidth, 0.07, 0.1), fMat)
    mid.position.set(0, panelCenterY, 0.05); panel.add(mid)

    panel.position.x = panel.userData.closedX  // start closed
    doorPanels.push(panel)
    g.add(panel)
  })

  // Sensor strip
  const sensor = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.06, 0.18), new THREE.MeshBasicMaterial({ color: 0x1e293b }))
  sensor.position.set(0, 3.3, -0.04); g.add(sensor)
  const sensorGlow = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.01, 0.14), new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.7 }))
  sensorGlow.position.set(0, 3.27, -0.04); g.add(sensorGlow)

  const clickArea = new THREE.Mesh(
    new THREE.BoxGeometry(openingWidth, 3.5, 0.8),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
  )
  clickArea.position.set(0, 1.75, 0)
  clickArea.userData.action = 'open-door'
  doorClickZone = clickArea
  g.add(clickArea)

  return g
}

function makeChair(accentColor) {
  const g = new THREE.Group()
  const seat = box(0.58, 0.07, 0.56, 0x111111)
  seat.position.y = 0.48; g.add(seat)
  const back = box(0.58, 0.58, 0.07, accentColor)
  back.position.set(0, 0.82, 0.25); g.add(back)
  const headrest = box(0.38, 0.2, 0.07, accentColor)
  headrest.position.set(0, 1.14, 0.25); g.add(headrest)
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
function makeMonitor(frameColor, screenTex, w = 1.4, h = 0.85) {
  const g = new THREE.Group()

  // Base — circular disc
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.32, 0.022, 24),
    new THREE.MeshLambertMaterial({ color: 0x181818 })
  )
  base.position.y = 0.011; g.add(base)

  // Tapered neck
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.038, 0.38, 10),
    new THREE.MeshLambertMaterial({ color: 0x1e1e1e })
  )
  neck.position.y = 0.26; g.add(neck)

  // Panel group — slight backward tilt gives 3-D depth
  const panel = new THREE.Group()
  panel.position.y = 0.47 + h / 2
  panel.rotation.x = -0.10

  // Solid bezel frame
  panel.add(new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.018, h + 0.018, 0.034),
    new THREE.MeshLambertMaterial({ color: 0x0d0d0d })
  ))

  // Screen plane — perfectly flush with bezel face, MeshBasicMaterial = self-lit
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: screenTex })
  )
  screen.position.z = 0.018
  screen.material.polygonOffset = true
  screen.material.polygonOffsetFactor = -1
  screen.material.polygonOffsetUnits = -1
  panel.add(screen)

  // Bottom LED backlight strip
  const led = new THREE.Mesh(
    new THREE.BoxGeometry(w - 0.02, 0.010, 0.004),
    new THREE.MeshBasicMaterial({ color: 0x2266ff, transparent: true, opacity: 0.9 })
  )
  led.position.set(0, -(h / 2 + 0.012), 0.018)
  panel.add(led)

  g.add(panel)
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

// ─── Desk base variants ───────────────────────────────────────────────────────

// Leo — minimal trestle: white surface on two A-frame legs
function makeDeskDesignerBase(color) {
  const g = new THREE.Group()
  const surf = box(2.6, 0.07, 1.28, color)
  surf.position.y = 0.88; g.add(surf)
  // Thin colour-matched edge strip
  const edge = box(2.6, 0.025, 0.014, 0x93c5fd)
  edge.position.set(0, 0.857, -0.637); g.add(edge)
  // Two A-frame supports
  ;[-0.88, 0.88].forEach(lx => {
    const frame = new THREE.Group()
    // Diagonal legs
    ;[-1, 1].forEach(side => {
      const leg = box(0.05, 0.9, 0.06, 0xd1d5db)
      leg.position.set(side * 0.28, 0.45, 0)
      leg.rotation.z = -side * 0.18; frame.add(leg)
    })
    // Crossbar
    const xbar = box(0.62, 0.04, 0.06, 0xd1d5db)
    xbar.position.set(0, 0.26, 0); frame.add(xbar)
    frame.position.set(lx, 0, 0); g.add(frame)
  })
  return g
}

// Teo — standard desk + filing cabinet on left
function makeDeskPMBase(color) {
  const g = new THREE.Group()
  const surf = box(2.5, 0.07, 1.32, color)
  surf.position.y = 0.88; g.add(surf)
  // Right legs pair (standard metal)
  ;[0.56, -0.56].forEach(lz => {
    const leg = box(0.06, 0.84, 0.06, 0x6b7280)
    leg.position.set(1.15, 0.42, lz); g.add(leg)
  })
  const rbar = box(0.06, 0.04, 1.18, 0x6b7280)
  rbar.position.set(1.15, 0.2, 0); g.add(rbar)
  // Filing cabinet replaces left legs
  const cab = box(0.42, 0.84, 1.1, 0x94a3b8)
  cab.position.set(-1.04, 0.42, 0); g.add(cab)
  // Cabinet drawer lines
  ;[0.22, 0.44, 0.66].forEach(dy => {
    const drawer = box(0.38, 0.018, 1.0, 0x7f8ea3)
    drawer.position.set(-1.04, dy, 0.006); g.add(drawer)
    const handle = box(0.12, 0.018, 0.025, 0xd1d5db)
    handle.position.set(-1.04, dy, 0.56); g.add(handle)
  })
  return g
}

// Napo — dark walnut executive: solid panel sides, wide return
function makeDeskDirectorBase(color) {
  const g = new THREE.Group()
  const walnut = 0x3d2b1f
  // Main surface
  const surf = box(3.4, 0.09, 1.6, walnut)
  surf.position.y = 0.88; g.add(surf)
  // Thin brass edge strip
  const edge = box(3.4, 0.02, 0.012, 0xd4af37)
  edge.position.set(0, 0.875, -0.794); g.add(edge)
  // Solid panel sides (no visible legs)
  ;[-1.65, 1.65].forEach(px => {
    const panel = box(0.09, 0.88, 1.56, walnut)
    panel.position.set(px, 0.44, 0); g.add(panel)
    // Panel decorative groove
    const groove = box(0.01, 0.6, 1.3, 0x2a1e14)
    groove.position.set(px + (px > 0 ? -0.05 : 0.05), 0.44, 0); g.add(groove)
  })
  // Back modesty panel
  const back = box(3.2, 0.7, 0.06, walnut)
  back.position.set(0, 0.44, -0.75); g.add(back)
  // Return desk (L-shape, right side)
  const ret = box(1.4, 0.09, 1.0, walnut)
  ret.position.set(2.4, 0.88, 0.8); g.add(ret)
  const retLeg = box(0.09, 0.88, 0.96, walnut)
  retLeg.position.set(3.14, 0.44, 0.8); g.add(retLeg)
  return g
}

// Andre — sit-stand desk: visible gas-lift columns, black frame
function makeDeskTesterBase(color) {
  const g = new THREE.Group()
  const surf = box(2.4, 0.065, 1.22, color)
  surf.position.y = 0.94; g.add(surf)
  // Adjustable column legs (inner + outer cylinder)
  ;[-0.95, 0.95].forEach(lx => {
    ;[-0.45, 0.45].forEach(lz => {
      const outer = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.68, 10), new THREE.MeshLambertMaterial({ color: 0x1e293b }))
      outer.position.set(lx, 0.34, lz); g.add(outer)
      const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.28, 10), new THREE.MeshLambertMaterial({ color: 0x374151 }))
      inner.position.set(lx, 0.8, lz); g.add(inner)
    })
    const hbar = box(0.04, 0.04, 0.94, 0x1e293b)
    hbar.position.set(lx, 0.12, 0); g.add(hbar)
  })
  const xbar = box(1.94, 0.04, 0.04, 0x1e293b)
  xbar.position.set(0, 0.12, 0); g.add(xbar)
  // Control panel on desk edge
  const ctrl = box(0.22, 0.03, 0.09, 0x111827)
  ctrl.position.set(-0.82, 0.97, 0.55); g.add(ctrl)
  // LED strip on control
  const led = box(0.16, 0.01, 0.02, 0x22c55e)
  led.position.set(-0.82, 0.988, 0.555); g.add(led)
  return g
}

// Dalla — industrial metal: cross-braced frame + under-shelf
function makeDeskDBBase(color) {
  const g = new THREE.Group()
  const metal = 0x374151
  const surf = box(2.6, 0.07, 1.34, color)
  surf.position.y = 0.88; g.add(surf)
  // Heavy square tube legs
  ;[[-1.2, -0.56], [-1.2, 0.56], [1.2, -0.56], [1.2, 0.56]].forEach(([lx, lz]) => {
    const leg = box(0.08, 0.88, 0.08, metal)
    leg.position.set(lx, 0.44, lz); g.add(leg)
  })
  // Cross braces
  ;[-0.56, 0.56].forEach(lz => {
    const brace = box(2.46, 0.04, 0.04, metal)
    brace.position.set(0, 0.28, lz); g.add(brace)
  })
  const zbrace = box(0.04, 0.04, 1.18, metal)
  zbrace.position.set(0, 0.28, 0); g.add(zbrace)
  // Under-shelf for equipment
  const shelf = box(2.4, 0.04, 1.1, 0x4b5563)
  shelf.position.set(0, 0.46, 0); g.add(shelf)
  // Equipment on shelf: NAS unit
  const nas = box(0.38, 0.22, 0.84, 0x1e293b)
  nas.position.set(-0.88, 0.6, 0.04); g.add(nas)
  // NAS drive bays
  ;[0,1,2,3].forEach(i => {
    const bay = box(0.34, 0.03, 0.78, 0x111827)
    bay.position.set(-0.88, 0.5 + i * 0.05, 0.04); g.add(bay)
  })
  // UPS unit
  const ups = box(0.4, 0.18, 0.72, 0x1a1a2e)
  ups.position.set(0.78, 0.58, 0.04); g.add(ups)
  const upsLed = box(0.28, 0.01, 0.04, 0x22c55e)
  upsLed.position.set(0.78, 0.675, -0.36); g.add(upsLed)
  return g
}

// ─── Chair variants ───────────────────────────────────────────────────────────

// Aeron-style: open mesh back (horizontal slats), no headrest
function makeChairAeron(accent) {
  const g = new THREE.Group()
  // Seat — thin, wider
  const seat = box(0.62, 0.06, 0.58, 0x1e1e1e)
  seat.position.y = 0.48; g.add(seat)
  // Seat shell underside
  const shell = box(0.58, 0.04, 0.54, 0x2a2a2a)
  shell.position.y = 0.43; g.add(shell)
  // Mesh back — 6 horizontal slats with gaps (open look)
  for (let i = 0; i < 6; i++) {
    const slat = box(0.56, 0.055, 0.045, accent)
    slat.position.set(0, 0.58 + i * 0.115, 0.24); g.add(slat)
  }
  // Back frame verticals
  ;[-0.29, 0.29].forEach(x => {
    const fr = box(0.03, 0.7, 0.05, 0x1e1e1e)
    fr.position.set(x, 0.95, 0.24); g.add(fr)
  })
  // Arms — thin, colorful
  ;[-0.3, 0.3].forEach(x => {
    const arm = box(0.04, 0.035, 0.36, accent)
    arm.position.set(x, 0.62, 0.06); g.add(arm)
    const pad = box(0.07, 0.025, 0.14, 0x1e1e1e)
    pad.position.set(x, 0.638, 0.14); g.add(pad)
  })
  // Column + base
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.4, 8), new THREE.MeshLambertMaterial({ color: 0x888888 }))
  pole.position.y = 0.16; g.add(pole)
  for (let i = 0; i < 5; i++) {
    const spoke = box(0.42, 0.03, 0.04, 0x333333)
    spoke.position.y = 0.02; spoke.rotation.y = (i / 5) * Math.PI * 2; g.add(spoke)
    // Caster wheel
    const caster = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.04, 8), new THREE.MeshLambertMaterial({ color: 0x222222 }))
    const angle = (i / 5) * Math.PI * 2
    caster.rotation.z = Math.PI / 2
    caster.position.set(Math.cos(angle) * 0.2, 0.025, Math.sin(angle) * 0.2); g.add(caster)
  }
  return g
}

// Executive high-back chair
function makeChairExec(accent) {
  const g = new THREE.Group()
  const dark = 0x0d0d0d
  // Wide padded seat
  const seat = box(0.68, 0.1, 0.64, dark)
  seat.position.y = 0.5; g.add(seat)
  // Seat cushion top
  const cushion = box(0.62, 0.06, 0.58, 0x1a1a1a)
  cushion.position.y = 0.56; g.add(cushion)
  // Tall back (leather panel)
  const back = box(0.66, 0.82, 0.1, dark)
  back.position.set(0, 1.06, 0.27); g.add(back)
  // Back panel accent stripe
  const stripe = box(0.52, 0.6, 0.02, accent)
  stripe.position.set(0, 1.06, 0.32); g.add(stripe)
  // High headrest
  const head = box(0.5, 0.28, 0.1, dark)
  head.position.set(0, 1.6, 0.27); g.add(head)
  const headPad = box(0.38, 0.2, 0.04, 0x1a1a1a)
  headPad.position.set(0, 1.6, 0.32); g.add(headPad)
  // Wide padded armrests
  ;[-0.36, 0.36].forEach(x => {
    const armPost = box(0.06, 0.14, 0.06, dark)
    armPost.position.set(x, 0.66, 0.12); g.add(armPost)
    const armRest = box(0.1, 0.04, 0.42, dark)
    armRest.position.set(x, 0.74, -0.04); g.add(armRest)
    const armPad = box(0.09, 0.025, 0.36, 0x1a1a1a)
    armPad.position.set(x, 0.762, -0.04); g.add(armPad)
  })
  // Polished metal column
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.42, 10), new THREE.MeshLambertMaterial({ color: 0xaaaaaa }))
  pole.position.y = 0.16; g.add(pole)
  for (let i = 0; i < 5; i++) {
    const spoke = box(0.44, 0.035, 0.045, 0x888888)
    spoke.position.y = 0.02; spoke.rotation.y = (i / 5) * Math.PI * 2; g.add(spoke)
    const caster = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.04, 8), new THREE.MeshLambertMaterial({ color: 0x333333 }))
    caster.rotation.z = Math.PI / 2
    const angle = (i / 5) * Math.PI * 2
    caster.position.set(Math.cos(angle) * 0.21, 0.025, Math.sin(angle) * 0.21); g.add(caster)
  }
  return g
}

// Gaming chair: reclined, wide headrest, bold side bolsters
function makeChairGaming(accent) {
  const g = new THREE.Group()
  // Wide sport seat with side bolsters
  const seat = box(0.66, 0.09, 0.62, 0x111111)
  seat.position.y = 0.5; g.add(seat)
  ;[-0.36, 0.36].forEach(x => {
    const bolster = box(0.07, 0.12, 0.58, accent)
    bolster.position.set(x, 0.555, 0); g.add(bolster)
  })
  // Back — slightly reclined (rotation.x)
  const backGroup = new THREE.Group()
  backGroup.position.set(0, 0.5, 0.24)
  backGroup.rotation.x = 0.14   // slightly reclined
  const back = box(0.64, 0.78, 0.1, 0x111111)
  back.position.y = 0.38; backGroup.add(back)
  // Accent side stripes on back
  ;[-0.34, 0.34].forEach(x => {
    const stripe = box(0.04, 0.78, 0.02, accent)
    stripe.position.set(x, 0.38, 0.06); backGroup.add(stripe)
  })
  // Wide gaming headrest
  const head = box(0.52, 0.26, 0.12, 0x111111)
  head.position.set(0, 0.88, 0); backGroup.add(head)
  const headPad = box(0.32, 0.18, 0.04, accent)
  headPad.position.set(0, 0.88, 0.07); backGroup.add(headPad)
  g.add(backGroup)
  // Thick padded armrests
  ;[-0.32, 0.32].forEach(x => {
    const arm = box(0.08, 0.06, 0.38, 0x222222)
    arm.position.set(x, 0.68, 0.04); g.add(arm)
  })
  // Column + star base
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4, 8), new THREE.MeshLambertMaterial({ color: 0x555555 }))
  pole.position.y = 0.16; g.add(pole)
  for (let i = 0; i < 5; i++) {
    const spoke = box(0.4, 0.04, 0.05, 0x333333)
    spoke.position.y = 0.02; spoke.rotation.y = (i / 5) * Math.PI * 2; g.add(spoke)
    const caster = new THREE.Mesh(new THREE.CylinderGeometry(0.026, 0.026, 0.04, 8), new THREE.MeshLambertMaterial({ color: 0x222222 }))
    caster.rotation.z = Math.PI / 2
    const angle = (i / 5) * Math.PI * 2
    caster.position.set(Math.cos(angle) * 0.19, 0.025, Math.sin(angle) * 0.19); g.add(caster)
  }
  return g
}

// ─── Desk builders ────────────────────────────────────────────────────────────
function buildDesignerDesk(p) {
  const g = new THREE.Group()
  const SY = 0.915
  g.add(makeDeskDesignerBase(p.deskColor))

  const tex1 = makeScreenTex('designer', p.hex)
  const mon1 = makeMonitor(0x111111, tex1)
  mon1.position.set(-0.85, SY, -0.38); mon1.rotation.y = 0.18; g.add(mon1)

  const tex2 = makeScreenTex('designer', p.hex)
  const mon2 = makeMonitor(0x111111, tex2)
  mon2.position.set(0.85, SY, -0.38); mon2.rotation.y = -0.18; g.add(mon2)

  // Screen glow — lights up the desk surface like a real monitor
  const scl = new THREE.PointLight(p.threeColor, 0.4, 3.0)
  scl.position.set(0, 1.8, 0.1); g.add(scl)
  scl.userData.baseIntensity = 0.4; scl.userData.phase = 0.7
  screenGlows.push({ light: scl, type: 'screen' })

  // Color swatches
  const sw = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0x6c5ce7, 0xa29bfe]
  sw.forEach((c, i) => {
    const s = box(0.1, 0.012, 0.09, c)
    s.position.set(-0.48 + i * 0.23, SY + 0.006, 0.28); g.add(s)
  })

  // Keyboard
  const kbd = box(0.68, 0.025, 0.26, 0x1e293b)
  kbd.position.set(0, SY + 0.0125, 0.05); g.add(kbd)

  // Mouse
  const mse = makeMouse()
  mse.position.set(0.44, SY, 0.08); g.add(mse)

  // Plant
  const pl = makePlant(0.9)
  pl.position.set(1.1, SY, 0.22); g.add(pl)

  // Mug
  const mug = makeMug(0xffffff)
  mug.position.set(0.88, SY, -0.15); g.add(mug)

  // Wacom tablet
  const wacom = box(0.58, 0.012, 0.38, 0x111111)
  wacom.position.set(-0.08, SY + 0.006, 0.3); g.add(wacom)
  const wacomSurf = box(0.44, 0.01, 0.28, 0x1e293b)
  wacomSurf.position.set(-0.08, SY + 0.011, 0.3); g.add(wacomSurf)
  const stylus = box(0.008, 0.008, 0.2, 0xf1f5f9)
  stylus.position.set(0.24, SY + 0.004, 0.3); stylus.rotation.z = 0.3; g.add(stylus)
  // Headphones on stand
  const hpStand = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.025, 0.22, 8), new THREE.MeshLambertMaterial({ color: 0x374151 }))
  hpStand.position.set(-1.0, SY + 0.11, -0.1); g.add(hpStand)
  const hpBand = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.018, 6, 14, Math.PI), new THREE.MeshLambertMaterial({ color: 0x0f172a }))
  hpBand.position.set(-1.0, SY + 0.22 + 0.04, -0.1); hpBand.rotation.z = Math.PI; g.add(hpBand)
  ;[-0.12, 0.12].forEach(hx => {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 12), new THREE.MeshLambertMaterial({ color: p.threeColor }))
    cup.position.set(-1.0 + hx, SY + 0.04, -0.1); cup.rotation.z = Math.PI / 2; g.add(cup)
  })

  // PC Tower
  const tower = makePCTower(p.threeColor)
  tower.position.set(1.22, 0, 0.3); tower.rotation.y = -Math.PI / 2; g.add(tower)

  // Chair
  const ch = makeChairAeron(p.threeColor)
  ch.position.set(0, 0, 0.95); ch.userData.restY = ch.position.y; chairMap[p.id] = ch; g.add(ch)

  return g
}

function buildPMDesk(p) {
  const g = new THREE.Group()
  const SY = 0.915
  g.add(makeDeskPMBase(p.deskColor))

  const tex = makeScreenTex('pm', p.hex)
  const mon = makeMonitor(0x111111, tex)
  mon.position.set(0, SY, -0.38); g.add(mon)

  // Screen glow
  const scl = new THREE.PointLight(p.threeColor, 0.4, 3.0)
  scl.position.set(0, 1.8, 0.1); g.add(scl)
  scl.userData.baseIntensity = 0.4; scl.userData.phase = 1.4
  screenGlows.push({ light: scl, type: 'screen' })

  // Sticky notes cluster on desk
  const noteColors = [0xfde047, 0xfb923c, 0xa7f3d0, 0xbfdbfe, 0xf9a8d4, 0xd9f99d]
  noteColors.forEach((c, i) => {
    const note = makeSticky(c)
    const a = (i / noteColors.length) * Math.PI * 1.6 - 0.4
    note.position.set(Math.cos(a) * 0.35, SY + 0.0005, Math.sin(a) * 0.18 + 0.08)
    note.rotation.y = Math.random() * 0.5 - 0.25
    g.add(note)
  })

  // Papers
  const papers = makePapers()
  papers.position.set(-0.82, SY, 0.22); g.add(papers)

  // Keyboard
  const kbd = box(0.68, 0.025, 0.26, 0x1e293b)
  kbd.position.set(0, SY + 0.0125, 0.08); g.add(kbd)

  // Mouse
  const mse = makeMouse()
  mse.position.set(0.45, SY, 0.12); g.add(mse)

  // Mug (coffee)
  const mug = makeMug(p.threeColor)
  mug.position.set(0.9, SY, 0.2); g.add(mug)

  // Small desk whiteboard / task board
  const twb = box(0.62, 0.38, 0.018, 0xf1f5f9)
  twb.position.set(0.72, 1.18, -0.36); twb.rotation.x = 0.18; g.add(twb)
  const twbFrame = box(0.66, 0.42, 0.012, 0x94a3b8)
  twbFrame.position.set(0.72, 1.18, -0.368); twbFrame.rotation.x = 0.18; g.add(twbFrame)
  // Tiny sticky notes on the mini board
  ;[[0xfde047,-0.2,1.08],[0xfb923c,0.0,1.22],[0xa7f3d0,0.2,1.08]].forEach(([clr, bx2, by2]) => {
    const s = box(0.12, 0.1, 0.008, clr)
    s.position.set(0.72 + bx2, by2, -0.355); s.rotation.x = 0.18; g.add(s)
  })
  // Phone on desk
  const phone = box(0.07, 0.012, 0.14, 0x1e293b)
  phone.position.set(-0.5, SY + 0.006, -0.2); g.add(phone)
  const phoneScr = box(0.05, 0.01, 0.1, p.threeColor)
  phoneScr.material.transparent = true; phoneScr.material.opacity = 0.7
  phoneScr.position.set(-0.5, SY + 0.012, -0.2); g.add(phoneScr)

  // PC Tower
  const tower = makePCTower(p.threeColor)
  tower.position.set(-1.62, 0, 0); tower.rotation.y = Math.PI / 2; g.add(tower)

  // Chair (standard, slightly taller back)
  const ch = makeChair(p.threeColor)
  ch.position.set(0, 0, 0.95); ch.userData.restY = ch.position.y; chairMap[p.id] = ch; g.add(ch)

  return g
}

function buildDirectorDesk(p) {
  const g = new THREE.Group()
  const SY = 0.925
  // Wider desk for the boss
  g.add(makeDeskDirectorBase(p.deskColor))

  // Ultrawide monitor (21:9)
  const tex = makeScreenTex('director', p.hex)
  const mon = makeMonitor(0x111111, tex, 1.9, 0.82)
  mon.position.set(0, SY, -0.52); g.add(mon)

  // Screen glow
  const scl = new THREE.PointLight(p.threeColor, 0.5, 3.5)
  scl.position.set(0, 1.8, 0.1); g.add(scl)
  scl.userData.baseIntensity = 0.5; scl.userData.phase = 2.1
  screenGlows.push({ light: scl, type: 'screen' })

  // Book stack
  ;[0x7c3aed, 0x1d4ed8, 0xb91c1c].forEach((c, i) => {
    const bk = makeBook(0.26, 0.38, 0.06, c)
    bk.position.set(-1.28, SY + i * 0.07, 0.1)
    bk.rotation.y = (i - 1) * 0.1; g.add(bk)
  })

  // Plant (bigger)
  const pl = makePlant(1.3)
  pl.position.set(1.5, SY, 0.3); g.add(pl)

  // Nameplate (gold)
  const plate = box(0.54, 0.045, 0.12, 0xd4af37)
  plate.position.set(0, SY + 0.0225, 0.5); g.add(plate)

  // Keyboard
  const kbd = box(0.75, 0.025, 0.28, 0x1e293b)
  kbd.position.set(0, SY + 0.0125, 0.08); g.add(kbd)

  // Mouse
  const mse = makeMouse()
  mse.position.set(0.5, SY, 0.12); g.add(mse)

  // Mug
  const mug = makeMug(p.threeColor)
  mug.position.set(1.3, SY, -0.12); g.add(mug)

  // Trophy / award
  const trophyBase = box(0.18, 0.04, 0.12, 0xd4af37)
  trophyBase.position.set(-1.3, SY + 0.02, -0.25); g.add(trophyBase)
  const trophyPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.025, 0.22, 8), new THREE.MeshLambertMaterial({ color: 0xd4af37 }))
  trophyPole.position.set(-1.3, SY + 0.15, -0.25); g.add(trophyPole)
  const trophyCup = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.028, 0.1, 10), new THREE.MeshLambertMaterial({ color: 0xd4af37 }))
  trophyCup.position.set(-1.3, SY + 0.31, -0.25); g.add(trophyCup)
  // Picture frame on return desk
  const frame = box(0.28, 0.22, 0.015, 0x1e1e1e)
  frame.position.set(2.5, SY + 0.05, 0.6); frame.rotation.x = -0.15; g.add(frame)
  const photo = box(0.22, 0.16, 0.012, 0x334155)
  photo.position.set(2.5, SY + 0.05, 0.605); photo.rotation.x = -0.15; g.add(photo)
  // Executive pen set
  const penHolder = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.1, 8), new THREE.MeshLambertMaterial({ color: 0xd4af37 }))
  penHolder.position.set(0.5, SY + 0.05, 0.44); g.add(penHolder)
  ;[-0.015, 0, 0.015].forEach(px2 => {
    const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.16, 6), new THREE.MeshLambertMaterial({ color: 0x0f172a }))
    pen.position.set(0.5 + px2, SY + 0.13, 0.44); g.add(pen)
  })

  // PC Tower
  const tower = makePCTower(p.threeColor)
  tower.position.set(3.0, 0, 0.9); tower.rotation.y = -Math.PI / 2; g.add(tower)

  // Chair
  const ch = makeChairExec(p.threeColor)
  ch.position.set(0, 0, 1.05); ch.userData.restY = ch.position.y; chairMap[p.id] = ch; g.add(ch)

  return g
}

function buildTesterDesk(p) {
  const g = new THREE.Group()
  const SY = 0.9725
  g.add(makeDeskTesterBase(p.deskColor))

  const tex = makeScreenTex('tester', p.hex)
  const mon = makeMonitor(0x111111, tex)
  mon.position.set(-0.38, SY, -0.38); g.add(mon)

  // Screen glow
  const scl = new THREE.PointLight(p.threeColor, 0.4, 3.0)
  scl.position.set(-0.38, 1.8, 0.1); g.add(scl)
  scl.userData.baseIntensity = 0.4; scl.userData.phase = 2.8
  screenGlows.push({ light: scl, type: 'screen' })

  // Laptop (slightly angled open)
  const lapBase = box(0.55, 0.03, 0.38, 0x374151)
  lapBase.position.set(0.72, SY + 0.015, -0.08); g.add(lapBase)
  const lapScreen = box(0.53, 0.36, 0.025, 0x1f2937)
  lapScreen.position.set(0.72, SY + 0.03 + 0.18, -0.27); lapScreen.rotation.x = -0.36; g.add(lapScreen)
  const lapDisplay = new THREE.Mesh(
    new THREE.BoxGeometry(0.49, 0.32, 0.01),
    new THREE.MeshBasicMaterial({ color: p.threeColor, transparent: true, opacity: 0.65 })
  )
  lapDisplay.material.polygonOffset = true
  lapDisplay.material.polygonOffsetFactor = -2
  lapDisplay.material.polygonOffsetUnits = -2
  lapDisplay.position.set(0.72, SY + 0.03 + 0.18, -0.250); lapDisplay.rotation.x = -0.36; g.add(lapDisplay)

  // Phone & tablet
  ;[{ w: 0.13, d: 0.24, x: -1.02, z: 0.08 }, { w: 0.22, d: 0.30, x: -0.72, z: 0.26 }].forEach(({ w, d, x, z }) => {
    const dev = box(w, 0.007, d, 0x111827)
    dev.position.set(x, SY + 0.0035, z); dev.rotation.y = Math.random() * 0.3 - 0.15; g.add(dev)
    const scr = box(w - 0.02, 0.007, d - 0.04, p.threeColor)
    scr.material.transparent = true; scr.material.opacity = 0.5
    scr.position.set(x, SY + 0.007, z); scr.rotation.y = dev.rotation.y; g.add(scr)
  })

  // Checklist paper
  const check = makePapers(0xfefce8)
  check.position.set(0.3, SY, 0.32); g.add(check)

  // Keyboard
  const kbd = box(0.6, 0.025, 0.24, 0x1e293b)
  kbd.position.set(-0.28, SY + 0.0125, 0.08); g.add(kbd)

  // Mouse
  const mse = makeMouse()
  mse.position.set(0.18, SY, 0.12); g.add(mse)

  // Energy drink
  const drink = makeEnergyDrink(p.threeColor)
  drink.position.set(1.02, SY, -0.24); g.add(drink)

  // Bug spray (humorous)
  const sprayBody = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.2, 10), new THREE.MeshLambertMaterial({ color: 0xdc2626 }))
  sprayBody.position.set(-0.8, SY + 0.1, -0.2); g.add(sprayBody)
  const sprayCap = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.035, 0.06, 10), new THREE.MeshLambertMaterial({ color: 0x7f1d1d }))
  sprayCap.position.set(-0.8, SY + 0.1 + 0.13, -0.2); g.add(sprayCap)
  // Post-it stuck on the monitor bezel
  const postit = box(0.15, 0.13, 0.005, 0xfde047)
  postit.position.set(-0.38 + 0.5, 1.48, -0.37); g.add(postit)
  // Extra scattered papers
  const p2 = makePapers(0xfef9c3)
  p2.position.set(-0.92, SY, -0.16); p2.rotation.y = 0.4; g.add(p2)

  // PC Tower
  const tower = makePCTower(p.threeColor)
  tower.position.set(0.96, 0, 0.3); tower.rotation.y = -Math.PI / 2; g.add(tower)

  // Chair
  const ch = makeChairGaming(p.threeColor)
  ch.position.set(0, 0, 0.95); ch.userData.restY = ch.position.y; chairMap[p.id] = ch; g.add(ch)

  return g
}

function buildDBDesk(p) {
  const g = new THREE.Group()
  const SY = 0.915
  g.add(makeDeskDBBase(p.deskColor))

  // Dual monitors, slightly angled inward
  const dbMonData = [[-0.85, 0.18], [0.85, -0.18]]
  dbMonData.forEach(([mx, ry]) => {
    const tex = makeScreenTex('db', p.hex)
    const mon = makeMonitor(0x111111, tex)
    mon.position.set(mx, SY, -0.38); mon.rotation.y = ry; g.add(mon)
  })

  // Screen glow
  const scl = new THREE.PointLight(p.threeColor, 0.45, 3.0)
  scl.position.set(0, 1.8, 0.1); g.add(scl)
  scl.userData.baseIntensity = 0.45; scl.userData.phase = 3.5
  screenGlows.push({ light: scl, type: 'screen' })

  // Cable (simplified)
  const cable = box(0.015, 0.015, 0.5, 0x0a0f1a)
  cable.position.set(1.55, SY, -0.3); cable.rotation.y = 0.25; g.add(cable)

  // Keyboard
  const kbd = box(0.7, 0.025, 0.26, 0x0a0f1a)
  kbd.position.set(0, SY + 0.0125, 0.06); g.add(kbd)

  // Mouse
  const mse = makeMouse()
  mse.position.set(0.45, SY, 0.1); g.add(mse)

  // Energy drinks (two)
  const d1 = makeEnergyDrink(p.threeColor)
  d1.position.set(1.06, SY, 0.12); g.add(d1)
  const d2 = makeEnergyDrink(0x22c55e)
  d2.position.set(0.86, SY, 0.28); d2.scale.setScalar(0.82); g.add(d2)

  // Sticker on desk
  const sticker = box(0.07, 0.001, 0.07, 0xff4400)
  sticker.position.set(-0.28, SY + 0.0005, -0.02); g.add(sticker)

  // External hard drives stacked
  ;[0, 1, 2].forEach(i => {
    const hdd = box(0.11, 0.025, 0.19, i === 0 ? 0x1e293b : i === 1 ? 0x0f172a : 0x1a1a2e)
    hdd.position.set(-0.52, SY + 0.0125 + i * 0.028, 0.28); g.add(hdd)
    const hddLed = box(0.014, 0.01, 0.014, i === 1 ? p.threeColor : 0x22c55e)
    hddLed.position.set(-0.465, SY + 0.0175 + i * 0.028, 0.195); g.add(hddLed)
  })
  // Thermal insulated mug (programmer's mug, not a regular mug)
  const thermos = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.042, 0.18, 12), new THREE.MeshLambertMaterial({ color: 0x1e293b }))
  thermos.position.set(-1.04, SY + 0.09, 0.24); g.add(thermos)
  const thermosCap = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 12), new THREE.MeshLambertMaterial({ color: p.threeColor }))
  thermosCap.position.set(-1.04, SY + 0.09 + 0.105, 0.24); g.add(thermosCap)

  // PC Tower
  const tower = makePCTower(p.threeColor)
  tower.position.set(1.6, 0, 0.3); tower.rotation.y = -Math.PI / 2; g.add(tower)

  // Chair
  const ch = makeChair(p.threeColor)
  ch.position.set(0, 0, 0.95); ch.userData.restY = ch.position.y; chairMap[p.id] = ch; g.add(ch)

  return g
}

// ─── Name label sprite ────────────────────────────────────────────────────────
function makeNameSprite(person) {
  const c = document.createElement('canvas')
  c.width = 320; c.height = 88
  const ctx = c.getContext('2d')
  ctx.fillStyle = 'rgba(15, 23, 42, 0.88)'
  ctx.roundRect(0, 0, 320, 88, 22); ctx.fill()
  ctx.strokeStyle = person.hex
  ctx.lineWidth = 4
  ctx.roundRect(2, 2, 316, 84, 20); ctx.stroke()
  ctx.fillStyle = 'rgba(255,255,255,0.28)'
  ctx.font = 'bold 16px sans-serif'
  ctx.fillText(person.role.split('·')[0].trim(), 160, 24)
  ctx.fillStyle = 'rgba(0,0,0,0.45)'
  ctx.font = 'bold 36px sans-serif'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(person.name, 160, 51)
  ctx.fillStyle = 'white'
  ctx.font = 'bold 36px sans-serif'
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(person.name, 160, 48)
  const tex = new THREE.CanvasTexture(c)
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true, depthWrite: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(2.2, 0.62, 1)
  sprite.position.set(person.position[0], person.position[1] + 2.6, person.position[2])
  sprite.visible = false
  nameSprites.push(sprite)
  return sprite
}

// ─── Room ─────────────────────────────────────────────────────────────────────
function buildRoom() {
  const RW = 22, RD = 20  // room width (±11) and depth (z: -10 to +10)

  // Floor
  const floor = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.18, RD), new THREE.MeshLambertMaterial({ color: 0xc4915a }))
  floor.position.set(0, -0.09, 0); floor.receiveShadow = true; scene.add(floor)

  // Floor plank lines
  for (let z = -9; z <= 9; z += 2) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.01, 0.05), new THREE.MeshLambertMaterial({ color: 0x7a4f2e, transparent: true, opacity: 0.25 }))
    plank.position.set(0, 0.01, z); scene.add(plank)
  }

  // Ceiling
  const ceil = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.18, RD), new THREE.MeshLambertMaterial({ color: 0xfaf7f2 }))
  ceil.position.set(0, 4.09, 0); scene.add(ceil)

  // Walls
  const wallMat = new THREE.MeshLambertMaterial({ color: 0xf2ede5 })
  // Back wall — segmented to leave real openings where the windows are.
  // Window glass centres: x = -7, 0, +7  (glass 2.7 × 1.9, centre y = 2.3)
  // Opening per window: x ± 1.35, y: 1.35 → 3.25
  const wallD = 0.18
  ;[
    // top strip above all windows (y: 3.25 → 4.28)
    [RW, 1.03, wallD,      0, 3.765, -10],
    // bottom strip below all windows (y: 0 → 1.35)
    [RW, 1.35, wallD,      0, 0.675, -10],
    // left solid section  (x: -11 → -8.35)
    [2.65, 1.9, wallD, -9.675,   2.3, -10],
    // between window 1 and 2 (x: -5.65 → -1.35)
    [4.30, 1.9, wallD,  -3.5,    2.3, -10],
    // between window 2 and 3 (x: 1.35 → 5.65)
    [4.30, 1.9, wallD,   3.5,    2.3, -10],
    // right solid section (x: 8.35 → 11)
    [2.65, 1.9, wallD,  9.675,   2.3, -10],
  ].forEach(([w, h, d, px, py, pz]) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat)
    m.position.set(px, py, pz); m.receiveShadow = true; scene.add(m)
  })

  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.28, RD), wallMat)
  leftWall.position.set(-11, 2, 0); scene.add(leftWall)
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.18, 4.28, RD), wallMat)
  rightWall.position.set(11, 2, 0); scene.add(rightWall)

  // Front glass facade — closes the room, camera is just outside at z=14
  const colMat = new THREE.MeshLambertMaterial({ color: 0x2d3748 })
  // Structural columns and beams
  ;[-11, -3, 3, 11].forEach(cx => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.28, 0.2), colMat)
    col.position.set(cx, 2, 10); scene.add(col)
  })
  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.32, 0.2), colMat)
  topBeam.position.set(0, 4.05, 10); scene.add(topBeam)
  const botBeam = new THREE.Mesh(new THREE.BoxGeometry(RW, 0.2, 0.2), colMat)
  botBeam.position.set(0, 0.05, 10); scene.add(botBeam)
  // Glass panels left and right, centre is open entrance
  const fgMat = new THREE.MeshLambertMaterial({ color: 0x9ecadf, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
  const glL = new THREE.Mesh(new THREE.BoxGeometry(8, 3.82, 0.06), fgMat)
  glL.position.set(-7, 1.96, 10); scene.add(glL)
  const glR = new THREE.Mesh(new THREE.BoxGeometry(8, 3.82, 0.06), fgMat)
  glR.position.set(7, 1.96, 10); scene.add(glR)
  // Horizontal glass rails
  ;[1.2, 2.4, 3.6].forEach(gy => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(8, 0.05, 0.08), colMat)
    ;[-7, 7].forEach(gx => { const r = rail.clone(); r.position.set(gx, gy, 10); scene.add(r) })
  })

  // Sliding glass entrance door
  const door = makeDoor()
  door.position.set(0, 0, 10)
  scene.add(door)

  // Windows in back wall
  const glassMat = new THREE.MeshLambertMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.45, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 })
  const wFrameMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  ;[-7, 0, 7].forEach(wx => {
    const fr = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.2, 0.12), wFrameMat)
    fr.position.set(wx, 2.3, -9.94); scene.add(fr)
    const gl = new THREE.Mesh(new THREE.BoxGeometry(2.7, 1.9, 0.06), glassMat)
    gl.position.set(wx, 2.3, -9.88); scene.add(gl)
    const crH = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.07, 0.14), wFrameMat)
    crH.position.set(wx, 2.3, -9.80); scene.add(crH)
    const crV = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.9, 0.14), wFrameMat)
    crV.position.set(wx, 2.3, -9.80); scene.add(crV)
  })

  // Ceiling light fixtures — repositioned within new room bounds
  const fixMat = new THREE.MeshLambertMaterial({ color: 0xfffff0 })
  ;[[-6, 3.96, -4], [0, 3.96, -2], [6, 3.96, -4], [-4, 3.96, 3], [4, 3.96, 3]].forEach(p => {
    const fix = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.07, 0.32), fixMat)
    fix.position.set(...p); scene.add(fix)
    const glow = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.01, 0.27), new THREE.MeshBasicMaterial({ color: 0xfffff8, transparent: true, opacity: 0.85 }))
    glow.position.set(p[0], p[1] - 0.05, p[2]); scene.add(glow)
  })

  // Whiteboard — left wall, at a depth the FOV can see (z ≈ -7)
  const wb = makeWhiteboard()
  wb.position.set(-10.94, 2.2, -7)
  wb.rotation.y = Math.PI / 2
  scene.add(wb)

  // Bookshelf — right wall, matching depth
  const bs = makeBookshelf()
  bs.position.set(10.94, 1.0, -7)
  bs.rotation.y = -Math.PI / 2
  scene.add(bs)

  // Water cooler — right side, mid-room (within FOV at z≈0)
  const wc = makeWaterCooler()
  wc.position.set(8, 0, 0)
  scene.add(wc)


  // Plants — positioned within the camera FOV
  // Back-left corner: big plant
  const plantBL = makePlant(2.0); plantBL.position.set(-9, 0, -9); scene.add(plantBL)
  // Back-right corner: taller plant
  const plantBR = makePlant(2.4); plantBR.position.set(9, 0, -9); scene.add(plantBR)
  // Mid-left: floor lamp
  const lampML = makeFloorLamp(0xfff8e0); lampML.position.set(-9, 0, -4); scene.add(lampML)
  // Mid-right: cactus (large)
  const cactML = makeCactus(2.2); cactML.position.set(9, 0, -4); scene.add(cactML)

  // Rug under desk area
  const rug = new THREE.Mesh(new THREE.BoxGeometry(16, 0.02, 10), new THREE.MeshLambertMaterial({ color: 0x4c1d95, transparent: true, opacity: 0.55 }))
  rug.position.set(0, 0.01, -1); scene.add(rug)
}

// ─── Cityscape ────────────────────────────────────────────────────────────────
function buildCityscape() {
  // City pavement extending beyond the office footprint
  const pavement = new THREE.Mesh(
    new THREE.BoxGeometry(200, 0.12, 200),
    new THREE.MeshLambertMaterial({ color: 0x2c2c30 })
  )
  pavement.position.set(0, -0.15, 0); scene.add(pavement)

  // Road markings in front and behind
  ;[[-14, -16, 0], [14, -16, 0], [-14, 18, 0], [14, 18, 0]].forEach(([x, z]) => {
    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.01, 10),
      new THREE.MeshLambertMaterial({ color: 0xfafafa, transparent: true, opacity: 0.6 })
    )
    strip.position.set(x, -0.08, z); scene.add(strip)
  })

  function makeCityBuilding(w, h, d, wallColor) {
    const g = new THREE.Group()

    // Main body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshLambertMaterial({ color: wallColor })
    )
    body.position.y = h / 2; g.add(body)

    // Rooftop detail (equipment box + small penthouse)
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.4, 0.6, d * 0.4),
      new THREE.MeshLambertMaterial({ color: wallColor })
    )
    roof.position.set(w * 0.15, h + 0.3, 0); g.add(roof)

    // Window grid canvas — warm/blue lit rooms on dark facade
    function makeWinTex(faceCols, faceRows) {
      const cv = document.createElement('canvas')
      cv.width = faceCols * 8; cv.height = faceRows * 8
      const ctx = cv.getContext('2d')
      const hex = '#' + wallColor.toString(16).padStart(6, '0')
      ctx.fillStyle = hex; ctx.fillRect(0, 0, cv.width, cv.height)
      for (let r = 0; r < faceRows; r++) {
        for (let c = 0; c < faceCols; c++) {
          const lit = Math.random() > 0.32
          ctx.fillStyle = lit
            ? (Math.random() > 0.45 ? '#fff3c0' : '#c5e8ff')
            : '#0b1118'
          ctx.fillRect(c * 8 + 1, (faceRows - 1 - r) * 8 + 1, 6, 6)
        }
      }
      return new THREE.CanvasTexture(cv)
    }

    const colsF = Math.max(2, Math.round(w * 2.2))
    const colsS = Math.max(2, Math.round(d * 2.2))
    const rows  = Math.max(4, Math.round(h * 1.8))
    const texF  = makeWinTex(colsF, rows)
    const texS  = makeWinTex(colsS, rows)

    ;[
      [0,          h / 2,  d / 2 + 0.06, 0,            texF, w * 0.9, h * 0.95],
      [0,          h / 2, -d / 2 - 0.06, Math.PI,      texF, w * 0.9, h * 0.95],
      [ w / 2 + 0.06, h / 2, 0,  Math.PI / 2,  texS, d * 0.9, h * 0.95],
      [-w / 2 - 0.06, h / 2, 0, -Math.PI / 2,  texS, d * 0.9, h * 0.95],
    ].forEach(([px, py, pz, ry, tex, fw, fh]) => {
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(fw, fh),
        new THREE.MeshBasicMaterial({ map: tex })
      )
      face.position.set(px, py, pz); face.rotation.y = ry; g.add(face)
    })

    return g
  }

  const palette = [0x3d4f63, 0x4a5e74, 0x374455, 0x2d3a4c, 0x455869,
                   0x536070, 0x3a5068, 0x4e5f72, 0x2e404f, 0x415264]

  // [x, z, w, h, d] — 10 palazzi ben distanziati per una skyline credibile
  const layout = [
    // Dietro (visibili attraverso le finestre)
    [ -8, -22, 6, 28, 5],
    [  4, -26, 5, 36, 5],
    [ 14, -30, 7, 22, 6],
    // Davanti (visibili attraverso la facciata a vetri)
    [-14,  22, 6, 24, 5],
    [  0,  28, 7, 34, 6],
    [ 14,  22, 5, 20, 5],
    // Lati
    [-18,  -8, 5, 26, 5],
    [-18,   6, 5, 18, 4],
    [ 18,  -8, 5, 30, 5],
    [ 18,   6, 4, 16, 4],
  ]

  layout.forEach(([x, z, w, h, d]) => {
    const col = palette[Math.floor(Math.random() * palette.length)]
    const b = makeCityBuilding(w, h, d, col)
    b.position.set(x, 0, z); scene.add(b)
  })

  // ── Roads ──────────────────────────────────────────────────────────────────
  // Two roads: one in front of the office (z≈14–20), one behind (z≈-14 to -20)
  // Plus a cross-road on the sides (x≈±13)
  const roadMat  = new THREE.MeshLambertMaterial({ color: 0x222226 })
  const lineMat  = new THREE.MeshLambertMaterial({ color: 0xf0f0f0, transparent: true, opacity: 0.75 })
  const dashMat  = new THREE.MeshLambertMaterial({ color: 0xf0f0f0, transparent: true, opacity: 0.6 })

  // Front road (z: 13–20, full width)
  const roadFront = new THREE.Mesh(new THREE.BoxGeometry(60, 0.04, 7), roadMat)
  roadFront.position.set(0, -0.11, 16.5); scene.add(roadFront)
  // Back road
  const roadBack = new THREE.Mesh(new THREE.BoxGeometry(60, 0.04, 7), roadMat)
  roadBack.position.set(0, -0.11, -15.5); scene.add(roadBack)
  // Side roads
  const roadLeft  = new THREE.Mesh(new THREE.BoxGeometry(7, 0.04, 60), roadMat)
  roadLeft.position.set(-14, -0.11, 0); scene.add(roadLeft)
  const roadRight = new THREE.Mesh(new THREE.BoxGeometry(7, 0.04, 60), roadMat)
  roadRight.position.set(14, -0.11, 0); scene.add(roadRight)

  // Centre dashes on front/back roads
  for (let x = -25; x < 26; x += 4) {
    ;[16.5, -15.5].forEach(rz => {
      const dash = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.01, 0.18), dashMat)
      dash.position.set(x, -0.08, rz); scene.add(dash)
    })
  }
  // Centre dashes on side roads
  for (let z = -25; z < 26; z += 4) {
    ;[-14, 14].forEach(rx => {
      const dash = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.01, 2.2), dashMat)
      dash.position.set(rx, -0.08, z); scene.add(dash)
    })
  }
  // Kerb lines (edge of road, white)
  ;[
    [60, 0.04, 0.12,  0, -0.08, 13.1],   // front road near edge
    [60, 0.04, 0.12,  0, -0.08, 19.9],   // front road far edge
    [60, 0.04, 0.12,  0, -0.08, -12.1],  // back road near edge
    [60, 0.04, 0.12,  0, -0.08, -18.9],  // back road far edge
  ].forEach(([w, h, d, px, py, pz]) => {
    const k = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lineMat)
    k.position.set(px, py, pz); scene.add(k)
  })

  // ── Sidewalks (pavements between road and buildings) ───────────────────────
  const swMat = new THREE.MeshLambertMaterial({ color: 0x6b6b72 })
  ;[
    [60, 0.06, 2,  0, -0.09, 11.5],   // front of office, between office and road
    [60, 0.06, 2,  0, -0.09, 21.0],   // far side of front road
    [60, 0.06, 2,  0, -0.09, -12.7],  // back of office
    [60, 0.06, 2,  0, -0.09, -20.5],  // far side of back road
  ].forEach(([w, h, d, px, py, pz]) => {
    const sw = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), swMat)
    sw.position.set(px, py, pz); scene.add(sw)
  })

  // ── Green areas (grass patches between sidewalk and buildings) ─────────────
  const grassMat = new THREE.MeshLambertMaterial({ color: 0x4a7c3f })
  ;[
    [60, 0.06, 4,  0, -0.09, 23.5],   // green strip in front
    [60, 0.06, 4,  0, -0.09, -22.5],  // green strip behind
    [4,  0.06, 30, -16.5, -0.09, 0],  // green strip left
    [4,  0.06, 30,  16.5, -0.09, 0],  // green strip right
  ].forEach(([w, h, d, px, py, pz]) => {
    const gr = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), grassMat)
    gr.position.set(px, py, pz); scene.add(gr)
  })

  // ── Trees ──────────────────────────────────────────────────────────────────
  function makeTree(trunkH = 2.2, foliageR = 1.0) {
    const g = new THREE.Group()
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.18, trunkH, 7),
      new THREE.MeshLambertMaterial({ color: 0x5c3d1e })
    )
    trunk.position.y = trunkH / 2; g.add(trunk)
    // Two overlapping spheres for fuller foliage
    ;[[0, trunkH + foliageR * 0.6, 0, foliageR],
      [0.2, trunkH + foliageR * 0.9, 0.15, foliageR * 0.75]
    ].forEach(([fx, fy, fz, fr]) => {
      const foliage = new THREE.Mesh(
        new THREE.SphereGeometry(fr, 8, 7),
        new THREE.MeshLambertMaterial({ color: 0x2d6a2d })
      )
      foliage.position.set(fx, fy, fz); g.add(foliage)
    })
    return g
  }

  // Trees along front sidewalk
  ;[-20, -12, -4, 4, 12, 20].forEach(tx => {
    const t = makeTree(2.4, 1.1); t.position.set(tx, 0, 11.5); scene.add(t)
    const t2 = makeTree(2.2, 1.0); t2.position.set(tx, 0, 21.0); scene.add(t2)
  })
  // Trees along back sidewalk
  ;[-18, -8, 2, 10].forEach(tx => {
    const t = makeTree(2.3, 1.0); t.position.set(tx, 0, -12.7); scene.add(t)
  })
  // Trees in the green strips (scattered)
  ;[[-16, -10], [-16, 5], [16, -8], [16, 7], [-16, -22], [16, -22],
    [-8, 23.5], [6, 23.5], [-20, 23.5]].forEach(([tx, tz]) => {
    const t = makeTree(2.0 + Math.random() * 0.6, 0.9 + Math.random() * 0.3)
    t.position.set(tx, 0, tz); scene.add(t)
  })

  // ── Street lamps ──────────────────────────────────────────────────────────
  function makeStreetLamp(x, z) {
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x4a4a55 })
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 4.5, 6), poleMat)
    pole.position.set(x, 2.25, z); scene.add(pole)
    // Horizontal arm
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.07, 0.07), poleMat)
    arm.position.set(x + 0.35, 4.6, z); scene.add(arm)
    // Lamp head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.18, 0.22),
      new THREE.MeshLambertMaterial({ color: 0x333340 })
    )
    head.position.set(x + 0.72, 4.52, z); scene.add(head)
    const glow = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.05, 0.18),
      new THREE.MeshBasicMaterial({ color: 0xfffbe0 })
    )
    glow.position.set(x + 0.72, 4.42, z); scene.add(glow)
    const light = new THREE.PointLight(0xfffbe0, 0.5, 14)
    light.position.set(x + 0.72, 4.3, z); scene.add(light)
  }

  // Front road lamps
  ;[-18, -10, -2, 6, 14, 22].forEach(lx => makeStreetLamp(lx, 12.8))
  // Back road lamps
  ;[-16, -6, 4, 12].forEach(lx => makeStreetLamp(lx, -13.5))
  // Side road lamps
  ;[-20, -10, 0, 10].forEach(lz => makeStreetLamp(-13.2, lz))

  // ── Cars ──────────────────────────────────────────────────────────────────
  function makeCar(bodyColor) {
    const g = new THREE.Group()
    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.6, 0.9),
      new THREE.MeshLambertMaterial({ color: bodyColor })
    )
    body.position.y = 0.55; g.add(body)
    // Cabin
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.45, 0.82),
      new THREE.MeshLambertMaterial({ color: bodyColor })
    )
    cabin.position.set(-0.1, 0.98, 0); g.add(cabin)
    // Windshield (dark glass)
    const wsf = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.38, 0.74),
      new THREE.MeshLambertMaterial({ color: 0x1a2a3a, transparent: true, opacity: 0.7 })
    )
    wsf.position.set(0.43, 0.96, 0); g.add(wsf)
    // Wheels
    ;[[ 0.55, 0.22,  0.5], [ 0.55, 0.22, -0.5],
      [-0.55, 0.22,  0.5], [-0.55, 0.22, -0.5]].forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.14, 10),
        new THREE.MeshLambertMaterial({ color: 0x111111 })
      )
      wheel.rotation.x = Math.PI / 2
      wheel.position.set(wx, wy, wz); g.add(wheel)
    })
    // Headlights
    const hlMat = new THREE.MeshBasicMaterial({ color: 0xfff8d0 })
    ;[[0.92, 0.55, 0.3], [0.92, 0.55, -0.3]].forEach(([hx, hy, hz]) => {
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.12, 0.18), hlMat)
      hl.position.set(hx, hy, hz); g.add(hl)
    })
    return g
  }

  // A few parked / driving cars — rotation.y = 0 means car faces +X
  ;[
    [0x2a4a6e, -8,  13.5, 0],       // blue, front road
    [0xb03030, 5,   13.5, 0],       // red, front road
    [0xe8e0d0, 18,  16.5, 0],       // white, front road far lane
    [0x3a3a3a, -16, -14.5, Math.PI], // dark, back road
    [0x4a7a3a, 2,   -14.5, Math.PI], // green, back road
  ].forEach(([col, cx, cz, ry]) => {
    const car = makeCar(col)
    car.position.set(cx, 0, cz)
    car.rotation.y = ry
    scene.add(car)
  })
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
    dustPositions[i * 3]     = (Math.random() - 0.5) * 20
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
  buildCityscape()
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

  if (!introActive && !officeReady && !doorOpenedOnce && doorClickZone) {
    raycaster.setFromCamera(mouse, camera)
    const doorHits = raycaster.intersectObject(doorClickZone)
    canvas.style.cursor = doorHits.length > 0 ? 'pointer' : 'default'
    return
  }

  if (isZoomed) return
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(clickZones)
  canvas.style.cursor = hits.length > 0 ? 'pointer' : 'grab'
})

window.addEventListener('click', e => {
  if (!introActive && !officeReady && !doorOpenedOnce && doorClickZone) {
    raycaster.setFromCamera(mouse, camera)
    const doorHits = raycaster.intersectObject(doorClickZone)
    if (doorHits.length > 0) openEntranceDoor()
    return
  }

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
  document.getElementById('back-btn').classList.remove('hidden')

  // Highlight active person in dock
  document.querySelectorAll('.nav-person').forEach(el => {
    el.style.opacity = el.querySelector('.nav-person-name').textContent === p.name ? '1' : '0.35'
  })

  gsap.to(camera.position, { x: p.camPos[0], y: p.camPos[1], z: p.camPos[2], duration: 1.5, ease: 'power3.inOut' })
  gsap.to(controls.target, {
    x: p.camTarget[0], y: p.camTarget[1], z: p.camTarget[2],
    duration: 1.5, ease: 'power3.inOut',
    onComplete: () => { controls.enabled = true; showCard(p) }
  })

  // Chair sit-down bounce
  const chair = chairMap[p.id]
  if (chair) {
    const restY = chair.userData.restY ?? 0
    gsap.to(chair.position, { y: restY - chairSitDrop, duration: 0.32, ease: 'power2.out', delay: 1.0, yoyo: true, repeat: 1 })
  }
}

function zoomOut() {
  isZoomed = false
  currentPerson = null
  hideCard()
  document.getElementById('back-btn').classList.add('hidden')
  document.querySelectorAll('.nav-person').forEach(el => { el.style.opacity = '' })
  // Reset chair
  if (currentPerson) {
    const chair = chairMap[currentPerson.id]
    if (chair) gsap.to(chair.position, { y: chair.userData.restY ?? 0, duration: 0.3, ease: 'power2.out' })
  }

  gsap.to(camera.position, { x: 0, y: 2, z: 14, duration: 1.5, ease: 'power3.inOut' })
  gsap.to(controls.target, {
    x: 0, y: 1.2, z: 0, duration: 1.5, ease: 'power3.inOut',
    onComplete: () => {
      controls.enabled = false
      document.getElementById('hints').classList.remove('hidden')
      document.getElementById('person-nav').classList.remove('hidden')
    }
  })
}

function openEntranceDoor() {
  if (doorOpenedOnce) return
  doorOpenedOnce = true
  officeReady = true

  doorPanels.forEach(panel => {
    gsap.to(panel.position, { x: panel.userData.openX, duration: 0.9, ease: 'power2.out' })
  })
  nameSprites.forEach(sprite => { sprite.visible = true })

  document.getElementById('hints').classList.remove('hidden')
  document.getElementById('person-nav').classList.remove('hidden')
  canvas.style.cursor = 'grab'
}

function resetEntranceDoor() {
  doorOpenedOnce = false
  officeReady = false
  doorPanels.forEach(panel => {
    gsap.killTweensOf(panel.position)
    panel.position.x = panel.userData.closedX
  })
  nameSprites.forEach(sprite => { sprite.visible = false })
  canvas.style.cursor = 'default'
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

  // Skill bars
  document.getElementById('card-skills').innerHTML = p.skills.map(s =>
    `<div class="skill-row">
      <div class="skill-row-header">
        <span class="skill-row-name">${s.name}</span>
        <span class="skill-row-pct">${s.level}%</span>
      </div>
      <div class="skill-track"><div class="skill-fill" style="width:0%;background:${p.hex}"></div></div>
    </div>`
  ).join('')
  // Animate bars after paint
  requestAnimationFrame(() => {
    document.querySelectorAll('#card-skills .skill-fill').forEach((el, i) => {
      el.style.width = p.skills[i].level + '%'
    })
  })

  document.getElementById('card-funfact').textContent = p.funFact
  document.getElementById('card-funfact').style.borderLeft = `3px solid ${p.hex}`

  // Social links
  const socialLinks = []
  if (p.social?.github)   socialLinks.push(`<a class="social-link" href="${p.social.github}" target="_blank">⌥ GitHub</a>`)
  if (p.social?.linkedin) socialLinks.push(`<a class="social-link" href="${p.social.linkedin}" target="_blank">in LinkedIn</a>`)
  if (p.social?.email)    socialLinks.push(`<a class="social-link" href="mailto:${p.social.email}">✉ Email</a>`)
  document.getElementById('card-social').innerHTML = socialLinks.join('')
  document.getElementById('card-social').style.display = socialLinks.length ? 'flex' : 'none'

  // Prev / Next buttons
  const idx = persons.findIndex(x => x.id === p.id)
  const prev = persons[(idx - 1 + persons.length) % persons.length]
  const next = persons[(idx + 1) % persons.length]
  const btnPrev = document.getElementById('card-prev')
  const btnNext = document.getElementById('card-next')
  btnPrev.textContent = `← ${prev.name}`
  btnPrev.style.borderColor = prev.hex + '55'
  btnPrev.onmouseenter = () => { btnPrev.style.background = prev.hex + '22'; btnPrev.style.color = prev.hex }
  btnPrev.onmouseleave = () => { btnPrev.style.background = ''; btnPrev.style.color = '' }
  btnNext.textContent = `${next.name} →`
  btnNext.style.borderColor = next.hex + '55'
  btnNext.onmouseenter = () => { btnNext.style.background = next.hex + '22'; btnNext.style.color = next.hex }
  btnNext.onmouseleave = () => { btnNext.style.background = ''; btnNext.style.color = '' }

  requestAnimationFrame(() => card.classList.add('show'))
}

function hideCard() {
  const card = document.getElementById('info-card')
  card.classList.remove('show')
  setTimeout(() => card.classList.add('hidden'), 560)
}

// ─── Intro Code Rain ──────────────────────────────────────────────────────────
function startCodeRain() {
  const container = document.getElementById('code-rain-container')
  if (!container) return () => {}

  const snippets = [
    { color: '#3b82f6', code: `function render(props) {\n  return (\n    <Hero\n      title={props.title}\n      team={props.members}\n    />\n  )\n}` },
    { color: '#06b6d4', code: `SELECT u.name,\n  COUNT(*) AS orders\nFROM users u\nJOIN orders o\n  ON u.id = o.user_id\nGROUP BY u.name\nORDER BY 2 DESC;` },
    { color: '#f472b6', code: `.hero {\n  display: grid;\n  place-items: center;\n  background: #000;\n  animation: glow\n    3s ease infinite;\n}` },
    { color: '#10b981', code: `describe('auth', () => {\n  it('should login', () => {\n    const res = post('/login')\n    expect(res.status)\n      .toBe(200)\n  })\n})` },
    { color: '#8b5cf6', code: `const roadmap = [\n  { sprint: 1,\n    goal: 'MVP launch' },\n  { sprint: 2,\n    goal: 'User testing' },\n  { sprint: 3,\n    goal: 'v1.0 release' },\n]` },
    { color: '#f97316', code: `$ npm run build\n\n✓ 3 modules bundled\n✓ dist/index.html\n✓ dist/assets/\n\nDone in 1.2s` },
    { color: '#a78bfa', code: `CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE,\n  created_at TIMESTAMP\n    DEFAULT NOW()\n);` },
    { color: '#34d399', code: `interface Member {\n  id: string\n  name: string\n  role: Role\n  skills: string[]\n  active: boolean\n}` },
    { color: '#60a5fa', code: `const [data, setData] =\n  useState(null)\n\nuseEffect(() => {\n  api.getTeam()\n    .then(setData)\n}, [])` },
    { color: '#fb923c', code: `def sprint_review():\n  team = load_team()\n  bugs = tracker.open()\n  for b in bugs:\n    team.assign(b)\n  team.ship()` },
  ]

  let active = true
  const elements = new Set()

  function spawnSnippet() {
    if (!active) return
    const s = snippets[Math.floor(Math.random() * snippets.length)]
    const el = document.createElement('pre')
    const left = Math.random() * 88 + 2
    const top  = Math.random() * 82 + 2
    const targetOpacity = 0.35 + Math.random() * 0.25

    const depth = 0.015 + Math.random() * 0.045
    el.dataset.depth = String(depth)
    el.style.cssText = `
      position:absolute;
      left:${left}%;
      top:${top}%;
      color:${s.color};
      font-size:clamp(0.52rem,0.85vw,0.7rem);
      line-height:1.55;
      opacity:0;
      white-space:pre;
      pointer-events:none;
      transition:opacity 0.6s ease, filter 0.9s ease;
      text-shadow:0 0 12px ${s.color}99;
      font-family:ui-monospace,'Cascadia Code','Fira Code','Courier New',monospace;
      filter:blur(0px);
      will-change:transform;
    `
    container.appendChild(el)
    elements.add(el)

    // Fade in after next two frames so transition triggers
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = String(targetOpacity)
    }))

    const chars = s.code.split('')
    let idx = 0
    const charDelay = 20 + Math.random() * 18

    const typeInterval = setInterval(() => {
      if (!active) { clearInterval(typeInterval); return }
      el.textContent += chars[idx]
      idx++
      if (idx >= chars.length) {
        clearInterval(typeInterval)
        const pause = 1400 + Math.random() * 1800
        setTimeout(() => {
          el.style.opacity = '0'
          el.style.filter = 'blur(8px)'
          setTimeout(() => { el.remove(); elements.delete(el) }, 950)
        }, pause)
      }
    }, charDelay)
  }

  spawnSnippet()
  const spawnLoop = setInterval(() => {
    if (active && elements.size < 10) spawnSnippet()
  }, 950)

  // Parallax on mouse move
  let rafPending = false
  function onMouseMove(e) {
    if (!active || rafPending) return
    rafPending = true
    requestAnimationFrame(() => {
      rafPending = false
      const mx = (e.clientX / window.innerWidth  - 0.5)
      const my = (e.clientY / window.innerHeight - 0.5)
      elements.forEach(el => {
        const d = parseFloat(el.dataset.depth || '0.03')
        el.style.transform = `translate(${mx * d * 500}px, ${my * d * 380}px)`
      })
    })
  }
  window.addEventListener('mousemove', onMouseMove)

  return function stop() {
    active = false
    clearInterval(spawnLoop)
    window.removeEventListener('mousemove', onMouseMove)
    elements.forEach(el => el.remove())
    elements.clear()
  }
}

// ─── Intro ────────────────────────────────────────────────────────────────────
function setupIntro() {
  const stopRain = startCodeRain()

  document.getElementById('enter-btn').addEventListener('click', () => {
    stopRain()
    const intro = document.getElementById('intro')
    resetEntranceDoor()
    document.getElementById('hints').classList.add('hidden')
    document.getElementById('person-nav').classList.add('hidden')

    gsap.to(intro, {
      opacity: 0, duration: 0.9, ease: 'power2.inOut',
      onComplete: () => {
        intro.style.display = 'none'
        introActive = false

        // Build person nav dock
        const nav = document.getElementById('person-nav')
        persons.forEach(p => {
          const card = document.createElement('div')
          card.className = 'nav-person'
          card.style.cssText = `border-color:${p.hex}30;`
          card.innerHTML = `
            <div class="nav-person-avatar" style="background:${p.hex}1a;border-color:${p.hex}55;">${p.emoji}</div>
            <span class="nav-person-name">${p.name}</span>
            <span class="nav-person-role">${p.role.split('·')[0].trim()}</span>
          `
          card.addEventListener('mouseenter', () => {
            card.style.background = `${p.hex}18`
            card.style.borderColor = `${p.hex}66`
            card.style.boxShadow = `0 0 18px ${p.hex}33`
          })
          card.addEventListener('mouseleave', () => {
            card.style.background = ''
            card.style.borderColor = `${p.hex}30`
            card.style.boxShadow = ''
          })
          card.addEventListener('click', () => zoomToPerson(p))
          nav.appendChild(card)
        })

      }
    })

    // Fly-in camera
    gsap.to(camera.position, { x: 0, y: 2, z: 14, duration: 2.4, ease: 'power2.out', delay: 0.25 })
    gsap.to(controls.target, { x: 0, y: 1.2, z: 0, duration: 2.4, ease: 'power2.out', delay: 0.25 })
  })

  document.getElementById('back-btn').addEventListener('click', zoomOut)
  document.getElementById('card-close').addEventListener('click', zoomOut)

  // Prev / Next click handlers (wired once)
  document.getElementById('card-prev').addEventListener('click', () => {
    if (!currentPerson) return
    const idx = persons.findIndex(p => p.id === currentPerson.id)
    zoomToPerson(persons[(idx - 1 + persons.length) % persons.length])
  })
  document.getElementById('card-next').addEventListener('click', () => {
    if (!currentPerson) return
    const idx = persons.findIndex(p => p.id === currentPerson.id)
    zoomToPerson(persons[(idx + 1) % persons.length])
  })

  // Keyboard shortcuts
  window.addEventListener('keydown', e => {
    if (!officeReady) return
    if (e.key === 'Escape' && isZoomed) { zoomOut(); return }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && isZoomed && currentPerson) {
      const idx = persons.findIndex(p => p.id === currentPerson.id)
      zoomToPerson(persons[(idx - 1 + persons.length) % persons.length]); return
    }
    if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && isZoomed && currentPerson) {
      const idx = persons.findIndex(p => p.id === currentPerson.id)
      zoomToPerson(persons[(idx + 1) % persons.length]); return
    }
    if (!isZoomed && e.key >= '1' && e.key <= '5') {
      zoomToPerson(persons[parseInt(e.key) - 1])
    }
  })
}

// ─── Camera scenes for auto-tour ──────────────────────────────────────────────
const clock = new THREE.Clock()

function animate() {
  requestAnimationFrame(animate)
  const t = clock.getElapsedTime()

  // ── Dynamic lighting ────────────────────────────────────────────────────────
  // Screen glow + ceiling lights: gentle breathe / flicker
  screenGlows.forEach(({ light, type }) => {
    const base = light.userData.baseIntensity ?? 0.4
    const ph   = light.userData.phase ?? 0
    if (type === 'screen') {
      // Slow breathe ± 15%
      light.intensity = base * (0.88 + 0.12 * Math.sin(t * 0.9 + ph))
    } else {
      // Ceiling: very subtle warm flicker — high-frequency tiny noise
      const flicker = 0.96 + 0.04 * Math.sin(t * 3.7 + ph) * Math.sin(t * 11.3 + ph * 1.7)
      light.intensity = base * flicker
    }
  })

  // Neon sign: pulse between dim and bright
  if (neonSignLight) {
    neonSignLight.intensity = 1.1 + 0.5 * Math.sin(t * 1.8) + 0.15 * Math.sin(t * 4.3)
  }

  // Window blue lights: slow drift (simulating clouds / city movement)
  windowBlueLights.forEach((l, i) => {
    l.intensity = 0.22 + 0.08 * Math.sin(t * 0.4 + l.userData.phase)
  })

  // ── Dust particles ──────────────────────────────────────────────────────────
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

  // ── Idle auto-cam ───────────────────────────────────────────────────────────
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

// Deep link: ?person=leo opens directly to that person
const _urlPerson = new URLSearchParams(window.location.search).get('person')
if (_urlPerson) {
  const _target = persons.find(p => p.id === _urlPerson)
  if (_target) {
    setTimeout(() => document.getElementById('enter-btn').click(), 400)
    setTimeout(() => zoomToPerson(_target), 3400)
  }
}
