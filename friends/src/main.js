import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { persons } from './persons.js'
import { makeLeoOffice } from './leoOffice.js'

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

let introComplete = false
let focusMode = false
let activeIndex = 0
let activeTween = null
let wheelLock = false
const officeEntries = []
const navDots = []
const clickTargets = []

const canvas = document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x020409)
scene.fog = new THREE.FogExp2(0x020409, 0.02)

const INTRO_CAMERA = {
  position: new THREE.Vector3(0, 2.8, 15),
  target: new THREE.Vector3(0, 1.4, 4),
}

const OVERVIEW_CAMERA = {
  position: new THREE.Vector3(0, 10.5, 22),
  target: new THREE.Vector3(0, 1.2, 0),
}

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120)
camera.position.copy(INTRO_CAMERA.position)
camera.lookAt(INTRO_CAMERA.target)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.copy(INTRO_CAMERA.target)
controls.enableDamping = true
controls.dampingFactor = 0.06
controls.enablePan = false
controls.minDistance = 5
controls.maxDistance = 24
controls.minPolarAngle = 0.35
controls.maxPolarAngle = Math.PI / 2.05
controls.enabled = false

const root = new THREE.Group()
const orbitHub = new THREE.Group()
scene.add(root)
root.add(orbitHub)

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()
const clock = new THREE.Clock()

const planetRadius = 5.3
const orbitRadius = 12.8
const FRONT_ORBIT_ANGLE = Math.PI / 2
const FOCUS_CAMERA = {
  position: new THREE.Vector3(0, 4.2, 20.8),
  target: new THREE.Vector3(0, 1.05, orbitRadius),
}
const ORBIT_LAYOUTS = [
  { radius: 14.4, y: -0.15, angleOffset: 0.08 },
  { radius: 11.8, y: 1.2, angleOffset: 1.22 },
  { radius: 13.2, y: -1.05, angleOffset: 2.56 },
  { radius: 11.1, y: 0.85, angleOffset: 3.82 },
  { radius: 14.9, y: -0.45, angleOffset: 5.05 },
]

function box(w, h, d, color, extra = {}) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.18, ...extra })
  )
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function cyl(rTop, rBottom, h, segs, color, extra = {}) {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(rTop, rBottom, h, segs),
    new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.15, ...extra })
  )
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function makeStarSprite() {
  const size = 64
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')
  const center = size / 2
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.15, 'rgba(220, 240, 255, 0.8)')
  gradient.addColorStop(0.4, 'rgba(180, 210, 255, 0.2)')
  gradient.addColorStop(1, 'rgba(100, 160, 255, 0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

let starSystems = []

function makeStars() {
  const starTexture = makeStarSprite()

  // Stelle di fondo — distribuite su tutta la sfera con dimensioni variate
  const bgCount = 2200
  const bgPositions = new Float32Array(bgCount * 3)
  const bgSizes = new Float32Array(bgCount)
  const bgColors = new Float32Array(bgCount * 3)
  const bgPhases = new Float32Array(bgCount)

  const starColors = [
    [0.85, 0.92, 1.0],   // bianco freddo
    [1.0, 0.95, 0.88],   // bianco caldo
    [0.75, 0.85, 1.0],   // azzurro
    [0.65, 0.78, 1.0],   // blu chiaro
    [1.0, 0.88, 0.75],   // ambra tenue
  ]

  for (let i = 0; i < bgCount; i++) {
    const radius = 32 + Math.pow(Math.random(), 0.7) * 48
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    bgPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    bgPositions[i * 3 + 1] = radius * Math.cos(phi)
    bgPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

    // Distribuzione realistica: tante piccole, poche brillanti
    const brightness = Math.random()
    bgSizes[i] = brightness < 0.88 ? 0.3 + Math.random() * 0.4
      : brightness < 0.96 ? 0.8 + Math.random() * 0.6
      : 1.6 + Math.random() * 1.0

    const col = starColors[Math.floor(Math.random() * starColors.length)]
    bgColors[i * 3] = col[0]
    bgColors[i * 3 + 1] = col[1]
    bgColors[i * 3 + 2] = col[2]

    bgPhases[i] = Math.random() * Math.PI * 2
  }

  const bgGeo = new THREE.BufferGeometry()
  bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3))
  bgGeo.setAttribute('aSize', new THREE.BufferAttribute(bgSizes, 1))
  bgGeo.setAttribute('color', new THREE.BufferAttribute(bgColors, 3))
  bgGeo.setAttribute('aPhase', new THREE.BufferAttribute(bgPhases, 1))

  const bgMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: starTexture },
    },
    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      varying vec3 vColor;
      varying float vTwinkle;
      uniform float uTime;
      void main() {
        vColor = color;
        // Scintillio morbido, più intenso per stelle grandi
        float speed = 0.4 + aSize * 1.2;
        vTwinkle = 0.65 + 0.35 * sin(uTime * speed + aPhase);
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (520.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        vec4 tex = texture2D(uTexture, gl_PointCoord);
        gl_FragColor = vec4(vColor * vTwinkle, tex.a * vTwinkle);
      }
    `,
    transparent: true,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const bgStars = new THREE.Points(bgGeo, bgMat)
  scene.add(bgStars)
  starSystems.push(bgMat)

  // Nebulose — ciuffi morbidi di colore a bassa opacità
  const nebulaColors = [
    { color: 0x1e3a5f, pos: [28, 12, -35], scale: 16 },
    { color: 0x2d1b4e, pos: [-32, -8, 25], scale: 14 },
    { color: 0x0c2d3f, pos: [15, -15, 38], scale: 18 },
  ]
  nebulaColors.forEach(n => {
    const nebula = new THREE.Mesh(
      new THREE.SphereGeometry(n.scale, 24, 24),
      new THREE.MeshBasicMaterial({
        color: n.color,
        transparent: true,
        opacity: 0.045,
        side: THREE.BackSide,
        depthWrite: false,
      })
    )
    nebula.position.set(...n.pos)
    scene.add(nebula)
  })
}

function setupLighting() {
  scene.add(new THREE.AmbientLight(0x9cc8ff, 0.55))

  const sun = new THREE.DirectionalLight(0xf4f7ff, 1.5)
  sun.position.set(10, 14, 8)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.left = -22
  sun.shadow.camera.right = 22
  sun.shadow.camera.top = 22
  sun.shadow.camera.bottom = -22
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 60
  root.add(sun)

  const rim = new THREE.PointLight(0x36d7ff, 2.1, 40, 2)
  rim.position.set(-11, 5, -10)
  root.add(rim)

  const magenta = new THREE.PointLight(0xd78bff, 1.6, 28, 2)
  magenta.position.set(8, 6, 9)
  root.add(magenta)
}

function buildPlanet() {
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(planetRadius, 64, 64),
    new THREE.MeshStandardMaterial({
      color: 0x1c314d,
      emissive: 0x1a3a6a,
      emissiveIntensity: 0.35,
      roughness: 0.82,
      metalness: 0.1,
    })
  )
  planet.castShadow = true
  planet.receiveShadow = true
  root.add(planet)

  // Luce puntuale interna al pianeta
  const coreLight = new THREE.PointLight(0x3b82f6, 1.8, planetRadius * 3.5, 2)
  coreLight.position.set(0, 0, 0)
  root.add(coreLight)

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(planetRadius + 0.22, 48, 48),
    new THREE.MeshBasicMaterial({
      color: 0x4fd1ff,
      transparent: true,
      opacity: 0.16,
      side: THREE.BackSide,
    })
  )
  root.add(atmosphere)

  // Anelli orbitali visibili
  ORBIT_LAYOUTS.forEach((layout, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(layout.radius, 0.03, 8, 180),
      new THREE.MeshBasicMaterial({
        color: persons[i]?.threeColor ?? 0x4fd1ff,
        transparent: true,
        opacity: 0.08 + i * 0.015,
      })
    )
    ring.rotation.x = Math.PI / 2
    ring.position.y = layout.y
    orbitHub.add(ring)

    // Anello glow esterno
    const ringGlow = new THREE.Mesh(
      new THREE.TorusGeometry(layout.radius, 0.08, 8, 180),
      new THREE.MeshBasicMaterial({
        color: persons[i]?.threeColor ?? 0x4fd1ff,
        transparent: true,
        opacity: 0.03,
      })
    )
    ringGlow.rotation.x = Math.PI / 2
    ringGlow.position.y = layout.y
    orbitHub.add(ringGlow)
  })
}

function makeLabelSprite(person) {
  const c = document.createElement('canvas')
  c.width = 320
  c.height = 100
  const ctx = c.getContext('2d')
  ctx.fillStyle = 'rgba(3, 8, 18, 0.72)'
  ctx.roundRect(0, 0, 320, 100, 22)
  ctx.fill()
  ctx.strokeStyle = `${person.hex}88`
  ctx.lineWidth = 4
  ctx.roundRect(2, 2, 316, 96, 20)
  ctx.stroke()
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 30px Space Grotesk'
  ctx.textAlign = 'center'
  ctx.fillText(person.name, 160, 42)
  ctx.fillStyle = `${person.hex}`
  ctx.font = '600 16px Space Grotesk'
  ctx.fillText(person.role, 160, 70)

  const texture = new THREE.CanvasTexture(c)
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(2.8, 0.88, 1)
  sprite.position.set(0, 2.55, 0)
  return sprite
}

function makeMiniScreen(person) {
  const c = document.createElement('canvas')
  c.width = 320
  c.height = 220
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#07111f'
  ctx.fillRect(0, 0, 320, 220)
  ctx.fillStyle = person.hex
  ctx.fillRect(0, 0, 320, 18)
  ctx.fillStyle = '#c8f5ff'
  ctx.font = 'bold 16px monospace'
  ctx.fillText(person.name.toUpperCase(), 18, 48)
  ctx.fillStyle = 'rgba(255,255,255,0.75)'
  ctx.font = '12px monospace'
  person.tags.forEach((tag, index) => {
    ctx.fillText(`> ${tag}`, 18, 78 + index * 22)
  })
  ctx.strokeStyle = `${person.hex}88`
  ctx.strokeRect(18, 132, 284, 56)
  ctx.fillStyle = `${person.hex}`
  ctx.fillRect(28, 144, 210, 10)
  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.fillText('OFFICE PROFILE ONLINE', 28, 176)
  return new THREE.CanvasTexture(c)
}

function makeMonitor(person) {
  const group = new THREE.Group()
  const screenTexture = makeMiniScreen(person)
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.02),
    new THREE.MeshBasicMaterial({ map: screenTexture })
  )
  screen.position.y = 0.98
  group.add(screen)

  const frame = box(1.62, 1.12, 0.08, 0x0d1422)
  frame.position.set(0, 0.98, -0.05)
  group.add(frame)

  const stand = box(0.1, 0.5, 0.1, 0x111827)
  stand.position.set(0, 0.35, -0.04)
  group.add(stand)
  const base = box(0.52, 0.04, 0.24, 0x0f172a)
  base.position.set(0, 0.07, 0)
  group.add(base)
  return group
}

function makeDeskProp(person) {
  const prop = new THREE.Group()

  if (person.deskType === 'designer') {
    const tablet = box(1.2, 0.04, 0.72, 0x111827)
    tablet.position.set(-1.05, 0.8, 0.08)
    prop.add(tablet)

    const tabletGlow = box(1.08, 0.01, 0.6, 0x1d4ed8, { transparent: true, opacity: 0.18, emissive: 0x1d4ed8, emissiveIntensity: 0.7 })
    tabletGlow.position.set(-1.05, 0.825, 0.08)
    prop.add(tabletGlow)

    const swatches = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0xa78bfa]
    swatches.forEach((color, index) => {
      const chip = box(0.16, 0.02, 0.22, color)
      chip.position.set(0.42 + index * 0.22, 0.8, 0.28)
      prop.add(chip)
    })

    const sketchStack = box(0.56, 0.08, 0.42, 0xf8fafc)
    sketchStack.position.set(0.82, 0.82, 0.02)
    prop.add(sketchStack)

    const sketchTop = box(0.52, 0.01, 0.38, 0xdbeafe)
    sketchTop.position.set(0.82, 0.87, 0.02)
    prop.add(sketchTop)

    const lampBase = cyl(0.11, 0.13, 0.06, 14, 0x111827)
    lampBase.position.set(-1.68, 0.82, -0.38)
    prop.add(lampBase)

    const lampArm = box(0.08, 0.72, 0.08, 0x475569)
    lampArm.position.set(-1.54, 1.15, -0.26)
    lampArm.rotation.z = -0.45
    prop.add(lampArm)

    const lampHead = box(0.34, 0.12, 0.18, 0x93c5fd, { emissive: 0x60a5fa, emissiveIntensity: 0.45 })
    lampHead.position.set(-1.16, 1.42, -0.1)
    lampHead.rotation.z = 0.18
    prop.add(lampHead)

    ;[-0.56, 0.56].forEach(x => {
      const speaker = box(0.22, 0.52, 0.24, 0x0f172a)
      speaker.position.set(x, 0.98, -1.02)
      prop.add(speaker)

      const cone = cyl(0.07, 0.07, 0.04, 16, 0x60a5fa, { emissive: 0x3b82f6, emissiveIntensity: 0.35 })
      cone.position.set(x, 0.98, -0.88)
      cone.rotation.x = Math.PI / 2
      prop.add(cone)
    })

    const penCup = cyl(0.09, 0.1, 0.22, 14, 0x94a3b8)
    penCup.position.set(1.48, 0.88, 0.34)
    prop.add(penCup)

    for (let i = 0; i < 4; i++) {
      const pen = cyl(0.012, 0.012, 0.28, 8, [0x38bdf8, 0xf472b6, 0xfacc15, 0x34d399][i])
      pen.position.set(1.44 + i * 0.015, 1.02, 0.34 + (i % 2) * 0.02)
      pen.rotation.z = -0.18 + i * 0.08
      prop.add(pen)
    }

    const colorWheel = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.05, 14, 28),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, emissive: 0x38bdf8, emissiveIntensity: 0.2 })
    )
    colorWheel.position.set(1.48, 0.83, -0.26)
    colorWheel.rotation.x = Math.PI / 2
    prop.add(colorWheel)
  }

  if (person.deskType === 'pm') {
    const planner = box(0.82, 0.05, 0.58, 0xf5e6bf)
    planner.position.set(-0.78, 0.79, 0.08)
    prop.add(planner)
    for (let i = 0; i < 4; i++) {
      const sticky = box(0.18, 0.02, 0.18, [0xfde047, 0xfb923c, 0xbfdbfe, 0xf9a8d4][i])
      sticky.position.set(0.35 + i * 0.22, 0.79, 0.16)
      prop.add(sticky)
    }
  }

  if (person.deskType === 'director') {
    const holo = cyl(0.45, 0.45, 0.05, 28, 0x4c1d95, { transparent: true, opacity: 0.5 })
    holo.position.set(0, 0.82, 0.05)
    prop.add(holo)
    const prism = cyl(0, 0.18, 0.34, 4, 0xb794f4, { transparent: true, opacity: 0.72 })
    prism.position.set(0, 1.02, 0.05)
    prism.rotation.y = Math.PI / 4
    prop.add(prism)
  }

  if (person.deskType === 'tester') {
    const bugBoard = box(0.92, 0.05, 0.6, 0x10261f)
    bugBoard.position.set(-0.74, 0.79, 0.12)
    prop.add(bugBoard)
    for (let i = 0; i < 5; i++) {
      const pin = cyl(0.035, 0.035, 0.03, 10, [0xef4444, 0xf59e0b, 0x10b981][i % 3])
      pin.position.set(-1 + i * 0.17, 0.84, 0.1)
      prop.add(pin)
    }
  }

  if (person.deskType === 'db') {
    const rack = box(0.5, 0.9, 0.42, 0x111827)
    rack.position.set(1.08, 0.46, -0.12)
    prop.add(rack)
    for (let i = 0; i < 4; i++) {
      const led = box(0.03, 0.03, 0.02, i === 3 ? 0xef4444 : 0x22c55e)
      led.position.set(1.24, 0.18 + i * 0.18, 0.1)
      prop.add(led)
    }
  }

  return prop
}

function makeOfficePlatform(person) {
  if (person.id === 'leo') {
    return makeLeoOffice(person, { box, cyl, makeLabelSprite, makeMiniScreen, clickTargets })
  }

  const group = new THREE.Group()
  const officeScale = 1
  const discTop = 3.35
  const discBottom = 3.7
  const deskWidth = 4.4
  const deskDepth = 2.55

  const disc = cyl(discTop, discBottom, 0.42, 52, 0x0f1729)
  disc.position.y = -0.18
  group.add(disc)

  const glow = cyl(discTop + 0.25, discTop + 0.25, 0.025, 56, person.threeColor, { emissive: person.threeColor, emissiveIntensity: 0.6 })
  glow.position.y = 0.01
  group.add(glow)

  const desk = box(deskWidth, 0.18, deskDepth, person.deskColor)
  desk.position.set(0, 0.82, -0.22)
  group.add(desk)

  const monitor = makeMonitor(person)
  monitor.position.set(0, 0.92, -0.84)
  monitor.scale.setScalar(1.18)
  group.add(monitor)

  const keyboard = box(1.18, 0.04, 0.34, 0x1f2937)
  keyboard.position.set(0, 0.89, 0.34)
  group.add(keyboard)

  const mug = cyl(0.14, 0.12, 0.24, 14, 0xffffff)
  mug.position.set(1.54, 0.93, 0.44)
  group.add(mug)

  const chair = box(1.42, 0.14, 1.34, 0x121826)
  chair.position.set(0, 0.5, 1.58)
  group.add(chair)
  const chairBack = box(1.42, 1.12, 0.14, person.threeColor)
  chairBack.position.set(0, 1.08, 1.0)
  group.add(chairBack)

  const rail = new THREE.Mesh(
    new THREE.TorusGeometry(3.55, 0.08, 14, 80),
    new THREE.MeshStandardMaterial({ color: 0x0b1220, metalness: 0.55, roughness: 0.34 })
  )
  rail.rotation.x = Math.PI / 2
  rail.position.y = 0.05
  group.add(rail)

  const prop = makeDeskProp(person)
  group.add(prop)

  const beacon = new THREE.Mesh(
    new THREE.ConeGeometry(0.24, 0.8, 6),
    new THREE.MeshStandardMaterial({
      color: person.threeColor,
      emissive: person.threeColor,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.92,
    })
  )
  beacon.position.set(-2.2, 1.22, 1.02)
  group.add(beacon)

  const label = makeLabelSprite(person)
  group.add(label)

  const clickZone = new THREE.Mesh(
    new THREE.CylinderGeometry(3.6, 3.6, 3.2, 32),
    new THREE.MeshBasicMaterial({ visible: false })
  )
  clickZone.position.y = 1.0
  clickZone.userData.personId = person.id
  group.add(clickZone)
  clickTargets.push(clickZone)

  group.scale.setScalar(officeScale)

  return { group, clickZone, label, focusOffset: null }
}

function buildOfficeOrbit() {
  persons.forEach((person, index) => {
    const pivot = new THREE.Group()
    const orbitConfig = ORBIT_LAYOUTS[index % ORBIT_LAYOUTS.length]
    const orbitAngle = orbitConfig.angleOffset
    pivot.userData.baseAngle = orbitAngle
    orbitHub.add(pivot)

    const { group, clickZone, label, focusOffset } = makeOfficePlatform(person)
    group.position.set(
      Math.cos(orbitAngle) * orbitConfig.radius,
      orbitConfig.y,
      Math.sin(orbitAngle) * orbitConfig.radius
    )
    group.lookAt(0, group.position.y, 0)
    group.rotation.y += Math.PI
    group.rotation.x = 0
    group.rotation.z = 0
    const baseRotationY = group.rotation.y
    pivot.add(group)

    officeEntries.push({
      person,
      pivot,
      office: group,
      clickZone,
      label,
      focusOffset,
      baseAngle: orbitAngle,
      baseRotationY,
      orbitConfig,
    })
  })
}

function showCard(person) {
  const card = document.getElementById('info-card')
  card.classList.remove('hidden')
  document.getElementById('card-avatar').textContent = person.emoji
  document.getElementById('card-avatar').style.cssText = `background:${person.hex}22;border:2px solid ${person.hex};width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;margin-bottom:1.4rem;`
  document.getElementById('card-name').textContent = person.name
  document.getElementById('card-name').style.color = person.hex
  document.getElementById('card-fullname').textContent = person.fullName
  document.getElementById('card-role').textContent = person.role
  document.getElementById('card-role').style.cssText = `display:inline-block;font-size:0.78rem;font-weight:600;letter-spacing:0.05em;padding:0.35rem 0.9rem;border-radius:50px;margin-bottom:1.6rem;background:${person.hex}22;color:${person.hex};`
  document.getElementById('card-bio').textContent = person.bio
  document.getElementById('card-tags').innerHTML = person.tags
    .map(tag => `<span class="tag" style="color:${person.hex};border-color:${person.hex}55">${tag}</span>`)
    .join('')
  document.getElementById('card-funfact').textContent = person.funFact
  document.getElementById('card-funfact').style.borderLeft = `3px solid ${person.hex}`
  requestAnimationFrame(() => card.classList.add('show'))
}

function hideCard() {
  const card = document.getElementById('info-card')
  card.classList.remove('show')
  setTimeout(() => card.classList.add('hidden'), 560)
}

function updateShowcaseUi() {
  navDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeIndex)
  })
  const status = document.getElementById('showcase-status')
  if (status) {
    status.textContent = `${activeIndex + 1} / ${persons.length}`
  }
}

function getFocusView(entry, targetRotation) {
  const previousHubRotation = orbitHub.rotation.y
  const previousOfficeRotations = officeEntries.map(officeEntry => officeEntry.office.rotation.y)

  orbitHub.rotation.y = targetRotation
  officeEntries.forEach(officeEntry => {
    officeEntry.office.rotation.y = officeEntry.baseRotationY
  })
  root.updateMatrixWorld(true)

  const localCamera = entry.focusOffset?.camera ?? new THREE.Vector3(0, 3.0, 6.5)
  const localTarget = entry.focusOffset?.target ?? new THREE.Vector3(0, 1.15, -0.05)

  const cameraPosition = entry.office.localToWorld(localCamera.clone())
  const targetPosition = entry.office.localToWorld(localTarget.clone())

  orbitHub.rotation.y = previousHubRotation
  officeEntries.forEach((officeEntry, index) => {
    officeEntry.office.rotation.y = previousOfficeRotations[index]
  })
  root.updateMatrixWorld(true)

  return { cameraPosition, targetPosition }
}

function focusOffice(index, immediate = false) {
  activeIndex = (index + persons.length) % persons.length
  focusMode = true
  const person = persons[activeIndex]
  const entry = officeEntries[activeIndex]

  if (activeTween) {
    activeTween.kill()
  }

  clickTargets.forEach(target => {
    target.userData.active = target.userData.personId === person.id
  })

  document.getElementById('showcase-controls').classList.remove('hidden')
  document.getElementById('person-nav').classList.remove('hidden')
  document.getElementById('hints').classList.add('hidden')
  document.getElementById('back-btn').classList.remove('hidden')
  const overviewTitle = document.getElementById('overview-title')
  overviewTitle.classList.remove('fade-in')
  overviewTitle.classList.add('fade-out')

  updateShowcaseUi()
  showCard(person)
  controls.enabled = true

  const targetRotation = FRONT_ORBIT_ANGLE - entry.baseAngle
  const focusView = getFocusView(entry, targetRotation)
  const destination = {
    x: focusView.cameraPosition.x,
    y: focusView.cameraPosition.y,
    z: focusView.cameraPosition.z,
  }
  const targetLook = {
    x: focusView.targetPosition.x,
    y: focusView.targetPosition.y,
    z: focusView.targetPosition.z,
  }

  if (immediate) {
    orbitHub.rotation.y = targetRotation
    officeEntries.forEach(officeEntry => {
      officeEntry.office.rotation.y = officeEntry.baseRotationY
    })
    camera.position.set(destination.x, destination.y, destination.z)
    controls.target.set(targetLook.x, targetLook.y, targetLook.z)
    return
  }

  activeTween = gsap.timeline({
    onComplete: () => {
      activeTween = null
    },
  })

  activeTween.to(orbitHub.rotation, { y: targetRotation, duration: 1.1, ease: 'power2.inOut' }, 0)
  officeEntries.forEach(officeEntry => {
    activeTween.to(officeEntry.office.rotation, {
      y: officeEntry.baseRotationY,
      duration: 1.1,
      ease: 'power2.inOut',
    }, 0)
  })
  activeTween.to(camera.position, { ...destination, duration: 1.1, ease: 'power2.inOut' }, 0)
  activeTween.to(controls.target, { ...targetLook, duration: 1.1, ease: 'power2.inOut' }, 0)
}

function showOverview() {
  focusMode = false
  controls.enabled = false
  hideCard()
  document.getElementById('back-btn').classList.add('hidden')
  document.getElementById('showcase-controls').classList.add('hidden')
  document.getElementById('person-nav').classList.remove('hidden')
  document.getElementById('hints').classList.remove('hidden')
  const overviewTitle = document.getElementById('overview-title')
  overviewTitle.classList.remove('hidden', 'fade-out')
  overviewTitle.classList.add('fade-in')

  if (activeTween) activeTween.kill()
  activeTween = gsap.timeline({
    onComplete: () => {
      activeTween = null
    },
  })
  activeTween.to(camera.position, {
    x: OVERVIEW_CAMERA.position.x,
    y: OVERVIEW_CAMERA.position.y,
    z: OVERVIEW_CAMERA.position.z,
    duration: 1,
    ease: 'power2.inOut',
  }, 0)
  activeTween.to(controls.target, {
    x: OVERVIEW_CAMERA.target.x,
    y: OVERVIEW_CAMERA.target.y,
    z: OVERVIEW_CAMERA.target.z,
    duration: 1,
    ease: 'power2.inOut',
  }, 0)
  officeEntries.forEach(entry => {
    activeTween.to(entry.office.rotation, {
      y: entry.baseRotationY,
      duration: 1,
      ease: 'power2.inOut',
    }, 0)
  })
}

function stepOffice(direction) {
  if (!introComplete) return
  focusOffice(activeIndex + direction)
}

function setupIntroCodewall() {
  const wall = document.getElementById('intro-codewall')
  if (!wall) return

  const layers = [
    { hex: '#3b82f6', blocks: ['const renderOffice = () => orbit(planets)', 'ui.push("frontend")\nfigma.sync() // ok', 'const palette = ["cyan", "blue", "cream"]'] },
    { hex: '#f97316', blocks: ['sprint.plan("week-12")\nboard.moveAll("review")', 'checklist:\n- client call\n- release\n- infra', 'router.deploy("/friends-hq")'] },
    { hex: '#8b5cf6', blocks: ['vision.publish("Q2")\nfinance.approve()', 'brainstorm.push("planet offices")', 'strategy.mode = "ship"' ] },
    { hex: '#10b981', blocks: ['test.run("auth") // pass', 'bug.report("#149")\nseverity = low', 'qa.watch(uiState)'] },
    { hex: '#06b6d4', blocks: ['SELECT * FROM desks;', 'backup nightly_ok', 'index.optimize(users)' ] },
  ]

  const count = 28
  const typeSnippet = (el, text, charDelay) => {
    let i = 0
    el.textContent = ''
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i]
        i += 1
        setTimeout(tick, charDelay)
      } else {
        setTimeout(() => {
          el.classList.add('fading-out')
          setTimeout(() => {
            el.classList.remove('fading-out')
            spawnSnippet(el)
          }, 800)
        }, 1800 + Math.random() * 2500)
      }
    }
    tick()
  }

  const spawnSnippet = el => {
    const layer = layers[Math.floor(Math.random() * layers.length)]
    const text = layer.blocks[Math.floor(Math.random() * layer.blocks.length)]
    const depth = Math.random()
    el.style.cssText = `
      left:${Math.random() * 85}%;
      top:${Math.random() * 82}%;
      font-size:${0.48 + depth * 0.42}rem;
      color:${layer.hex};
      --snippet-opacity:${0.18 + depth * 0.42};
      z-index:${Math.round(depth * 8)};
      filter:blur(${((1 - depth) * 1.1).toFixed(1)}px);
    `
    typeSnippet(el, text, 18 + (1 - depth) * 36)
  }

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span')
    el.className = 'code-snippet'
    wall.appendChild(el)
    setTimeout(() => spawnSnippet(el), i * 280)
  }
}

function setupDomNavigation() {
  document.getElementById('prev-person').addEventListener('click', () => stepOffice(-1))
  document.getElementById('next-person').addEventListener('click', () => stepOffice(1))
  document.getElementById('back-btn').addEventListener('click', showOverview)
  document.getElementById('card-close').addEventListener('click', hideCard)

  window.addEventListener('keydown', e => {
    if (!introComplete) return
    if (e.key === 'ArrowRight') stepOffice(1)
    if (e.key === 'ArrowLeft') stepOffice(-1)
    if (e.key === 'Escape') showOverview()
  })

  window.addEventListener('wheel', e => {
    if (!introComplete || wheelLock) return
    if (Math.abs(e.deltaY) < 18) return
    wheelLock = true
    stepOffice(e.deltaY > 0 ? 1 : -1)
    setTimeout(() => {
      wheelLock = false
    }, 520)
  }, { passive: true })
}

function setupIntro() {
  document.getElementById('enter-btn').addEventListener('click', () => {
    const intro = document.getElementById('intro')
    const btn = document.getElementById('enter-btn')
    const subtitle = intro.querySelector('.intro-content p')
    const cards = [...document.querySelectorAll('.logo-card')]
    const codewall = document.getElementById('intro-codewall')

    btn.style.pointerEvents = 'none'

    gsap.to(btn, { opacity: 0, y: 20, duration: 0.4, ease: 'power2.in' })
    gsap.to(subtitle, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.in' })

    cards.forEach((card, i) => {
      gsap.to(card, {
        x: ((i - 3) / 3) * 520,
        y: (Math.random() - 0.5) * 520,
        rotation: (Math.random() - 0.5) * 280,
        scale: 0.2,
        opacity: 0,
        duration: 0.8,
        delay: 0.25 + i * 0.05,
        ease: 'power3.in',
      })
    })

    if (codewall) {
      gsap.to(codewall, { opacity: 0, duration: 0.6, delay: 0.45 })
    }

    const flash = document.createElement('div')
    flash.className = 'intro-flash'
    intro.appendChild(flash)

    gsap.to(flash, {
      opacity: 1,
      duration: 0.45,
      delay: 0.9,
      ease: 'power2.in',
      onComplete: () => {
        intro.style.display = 'none'
        introComplete = true
        document.getElementById('person-nav').classList.remove('hidden')
        document.getElementById('hints').classList.remove('hidden')
        showOverview()
        gsap.to(flash, { opacity: 0, duration: 0.8, ease: 'power2.out' })
      },
    })

    gsap.to(camera.position, {
      x: OVERVIEW_CAMERA.position.x,
      y: OVERVIEW_CAMERA.position.y,
      z: OVERVIEW_CAMERA.position.z,
      duration: 2.2,
      ease: 'power2.out',
      delay: 0.9,
    })

    gsap.to(controls.target, {
      x: OVERVIEW_CAMERA.target.x,
      y: OVERVIEW_CAMERA.target.y,
      z: OVERVIEW_CAMERA.target.z,
      duration: 2.2,
      ease: 'power2.out',
      delay: 0.9,
    })
  })
}

function buildNavDots() {
  const nav = document.getElementById('nav-dots')
  persons.forEach((person, index) => {
    const dot = document.createElement('div')
    dot.className = 'nav-dot'
    dot.title = person.name
    dot.innerHTML = `<span class="nav-dot-label">${person.name}</span><span class="nav-dot-circle" style="background:${person.hex}"></span>`
    dot.addEventListener('click', () => focusOffice(index))
    nav.appendChild(dot)
    navDots.push(dot)
  })
  updateShowcaseUi()
}

function animate() {
  requestAnimationFrame(animate)
  const elapsed = clock.getElapsedTime()

  if (!focusMode) {
    orbitHub.rotation.y += 0.0022
  }

  officeEntries.forEach((entry, index) => {
    entry.office.position.y = 0
    entry.office.rotation.y = entry.baseRotationY
    entry.label.material.opacity = focusMode && index === activeIndex ? 1 : 0.72
  })

  root.rotation.y = Math.sin(elapsed * 0.08) * 0.05

  starSystems.forEach(mat => {
    mat.uniforms.uTime.value = elapsed
  })

  controls.update()
  renderer.render(scene, camera)
}

window.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

  if (!introComplete) return
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(clickTargets)
  canvas.style.cursor = hits.length > 0 ? 'pointer' : 'grab'
})

window.addEventListener('click', () => {
  if (!introComplete) return
  raycaster.setFromCamera(mouse, camera)
  const hits = raycaster.intersectObjects(clickTargets)
  if (hits.length === 0) return
  const personId = hits[0].object.userData.personId
  const index = persons.findIndex(person => person.id === personId)
  if (index >= 0) focusOffice(index)
})

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

makeStars()
setupLighting()
buildPlanet()
buildOfficeOrbit()
buildNavDots()
setupDomNavigation()
setupIntroCodewall()
setupIntro()
animate()
