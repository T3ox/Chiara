import * as THREE from 'three'

// Schermo VS Code per monitor verticale 27"
function makeVSCodeScreen() {
  const c = document.createElement('canvas')
  c.width = 540
  c.height = 960
  const ctx = c.getContext('2d')

  // Background editor
  ctx.fillStyle = '#1e1e1e'
  ctx.fillRect(0, 0, 540, 960)

  // Activity bar (far left)
  const actBarW = 36
  ctx.fillStyle = '#333333'
  ctx.fillRect(0, 0, actBarW, 960)

  // Activity bar icons (simplified)
  const iconPositions = [28, 68, 108, 148, 188]
  const iconSymbols = ['◇', '⊙', '⑂', '▷', '⊞']
  ctx.font = '16px monospace'
  ctx.textAlign = 'center'
  iconPositions.forEach((y, i) => {
    ctx.fillStyle = i === 0 ? '#ffffff' : '#858585'
    ctx.fillText(iconSymbols[i], actBarW / 2, y)
  })

  // Active indicator
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 14, 2, 28)

  // Sidebar explorer
  const sideW = 140
  ctx.fillStyle = '#252526'
  ctx.fillRect(actBarW, 0, sideW, 960)

  // Sidebar title
  ctx.fillStyle = '#bbbbbb'
  ctx.font = '600 9px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('EXPLORER', actBarW + 10, 18)

  // Section header
  ctx.fillStyle = '#cccccc'
  ctx.font = '600 9px sans-serif'
  ctx.fillText('▾ FRIENDS-HQ', actBarW + 6, 38)

  // File tree
  ctx.font = '9px monospace'
  const files = [
    { name: '▾ src', color: '#cccccc', indent: 12 },
    { name: '  main.js', color: '#e8ab53', indent: 22 },
    { name: '  leoOffice.js', color: '#e8ab53', indent: 22 },
    { name: '  persons.js', color: '#e8ab53', indent: 22 },
    { name: '  style.css', color: '#519aba', indent: 22 },
    { name: '▾ dist', color: '#cccccc', indent: 12 },
    { name: '  index.html', color: '#e37933', indent: 22 },
    { name: 'package.json', color: '#a9b76b', indent: 12 },
    { name: 'vite.config.js', color: '#e8ab53', indent: 12 },
    { name: '.gitignore', color: '#858585', indent: 12 },
  ]
  files.forEach((f, i) => {
    if (f.name === '  leoOffice.js') {
      ctx.fillStyle = '#094771'
      ctx.fillRect(actBarW, 44 + i * 16, sideW, 16)
    }
    ctx.fillStyle = f.color
    ctx.fillText(f.name, actBarW + f.indent, 55 + i * 16)
  })

  // Editor area
  const editorX = actBarW + sideW
  const editorW = 540 - editorX

  // Tab bar
  ctx.fillStyle = '#2d2d2d'
  ctx.fillRect(editorX, 0, editorW, 28)

  // Active tab
  ctx.fillStyle = '#1e1e1e'
  ctx.fillRect(editorX, 0, 100, 28)
  ctx.fillStyle = '#3b82f6'
  ctx.fillRect(editorX, 0, 100, 2)
  ctx.fillStyle = '#ffffff'
  ctx.font = '9px sans-serif'
  ctx.fillText('leoOffice.js', editorX + 18, 18)

  // Inactive tab
  ctx.fillStyle = '#969696'
  ctx.fillText('main.js', editorX + 118, 18)

  // Breadcrumb
  ctx.fillStyle = '#252526'
  ctx.fillRect(editorX, 28, editorW, 16)
  ctx.fillStyle = '#858585'
  ctx.font = '8px sans-serif'
  ctx.fillText('src > leoOffice.js > makeLeoOffice', editorX + 8, 40)

  // Minimap
  const minimapX = 540 - 38
  ctx.fillStyle = '#1e1e1e'
  ctx.fillRect(minimapX, 44, 38, 880)
  for (let i = 0; i < 80; i++) {
    const mw = 8 + Math.random() * 22
    const alpha = 0.15 + Math.random() * 0.15
    ctx.fillStyle = `rgba(180, 200, 220, ${alpha})`
    ctx.fillRect(minimapX + 4, 50 + i * 10, mw, 4)
  }
  // Minimap viewport highlight
  ctx.fillStyle = 'rgba(100, 160, 255, 0.12)'
  ctx.fillRect(minimapX, 50, 38, 120)

  // Line numbers gutter
  const gutterW = 32
  const lineH = 15
  const codeX = editorX + gutterW + 6
  const startY = 58
  ctx.font = '10px monospace'

  // Code lines - a realistic JS snippet
  const codeLines = [
    { num: 1, tokens: [{ t: 'import ', c: '#c586c0' }, { t: '* ', c: '#d4d4d4' }, { t: 'as ', c: '#c586c0' }, { t: 'THREE ', c: '#9cdcfe' }, { t: 'from ', c: '#c586c0' }, { t: "'three'", c: '#ce9178' }] },
    { num: 2, tokens: [] },
    { num: 3, tokens: [{ t: '// Monitor centrale 32"', c: '#6a9955' }] },
    { num: 4, tokens: [{ t: 'function ', c: '#569cd6' }, { t: 'makeMainMonitor', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: 'person', c: '#9cdcfe' }, { t: ') {', c: '#d4d4d4' }] },
    { num: 5, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'group ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'new ', c: '#569cd6' }, { t: 'THREE', c: '#4ec9b0' }, { t: '.', c: '#d4d4d4' }, { t: 'Group', c: '#4ec9b0' }, { t: '()', c: '#d4d4d4' }] },
    { num: 6, tokens: [] },
    { num: 7, tokens: [{ t: '  // Clamp da scrivania', c: '#6a9955' }] },
    { num: 8, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'clamp ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'box', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '0.24', c: '#b5cea8' }, { t: ', ', c: '#d4d4d4' }, { t: '0.18', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 9, tokens: [{ t: '  clamp.', c: '#d4d4d4' }, { t: 'position', c: '#9cdcfe' }, { t: '.', c: '#d4d4d4' }, { t: 'set', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '0', c: '#b5cea8' }, { t: ', ', c: '#d4d4d4' }, { t: '0.09', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 10, tokens: [{ t: '  group.', c: '#d4d4d4' }, { t: 'add', c: '#dcdcaa' }, { t: '(clamp)', c: '#d4d4d4' }] },
    { num: 11, tokens: [] },
    { num: 12, tokens: [{ t: '  // Palo verticale', c: '#6a9955' }] },
    { num: 13, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'pole ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'cyl', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '0.055', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 14, tokens: [{ t: '  pole.', c: '#d4d4d4' }, { t: 'position', c: '#9cdcfe' }, { t: '.', c: '#d4d4d4' }, { t: 'set', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '0', c: '#b5cea8' }, { t: ', ', c: '#d4d4d4' }, { t: '0.64', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 15, tokens: [{ t: '  group.', c: '#d4d4d4' }, { t: 'add', c: '#dcdcaa' }, { t: '(pole)', c: '#d4d4d4' }] },
    { num: 16, tokens: [] },
    { num: 17, tokens: [{ t: '  // Braccio inferiore', c: '#6a9955' }] },
    { num: 18, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'lowerArm ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'box', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '0.62', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 19, tokens: [{ t: '  lowerArm.', c: '#d4d4d4' }, { t: 'rotation', c: '#9cdcfe' }, { t: '.z = ', c: '#d4d4d4' }, { t: '0.12', c: '#b5cea8' }] },
    { num: 20, tokens: [{ t: '  group.', c: '#d4d4d4' }, { t: 'add', c: '#dcdcaa' }, { t: '(lowerArm)', c: '#d4d4d4' }] },
    { num: 21, tokens: [] },
    { num: 22, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'shell ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'box', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '2.08', c: '#b5cea8' }, { t: ', ', c: '#d4d4d4' }, { t: '1.22', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 23, tokens: [{ t: '  shell.', c: '#d4d4d4' }, { t: 'position', c: '#9cdcfe' }, { t: '.', c: '#d4d4d4' }, { t: 'set', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '0', c: '#b5cea8' }, { t: ', ', c: '#d4d4d4' }, { t: '1.2', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 24, tokens: [] },
    { num: 25, tokens: [{ t: '  // Schermo 32" (16:9)', c: '#6a9955' }] },
    { num: 26, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'screen ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'new ', c: '#569cd6' }, { t: 'THREE', c: '#4ec9b0' }, { t: '.', c: '#d4d4d4' }, { t: 'Mesh', c: '#4ec9b0' }, { t: '(', c: '#d4d4d4' }] },
    { num: 27, tokens: [{ t: '    new ', c: '#569cd6' }, { t: 'THREE', c: '#4ec9b0' }, { t: '.', c: '#d4d4d4' }, { t: 'PlaneGeometry', c: '#4ec9b0' }, { t: '(', c: '#d4d4d4' }, { t: '1.92', c: '#b5cea8' }, { t: ', ', c: '#d4d4d4' }, { t: '1.08', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 28, tokens: [{ t: '  )', c: '#d4d4d4' }] },
    { num: 29, tokens: [] },
    { num: 30, tokens: [{ t: '  // LED bar ambientale', c: '#6a9955' }] },
    { num: 31, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'ledBar ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'box', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '1.72', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 32, tokens: [{ t: '  ledBar.', c: '#d4d4d4' }, { t: 'position', c: '#9cdcfe' }, { t: '.', c: '#d4d4d4' }, { t: 'set', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '0', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 33, tokens: [] },
    { num: 34, tokens: [{ t: '  return ', c: '#c586c0' }, { t: 'group', c: '#9cdcfe' }] },
    { num: 35, tokens: [{ t: '}', c: '#d4d4d4' }] },
    { num: 36, tokens: [] },
    { num: 37, tokens: [{ t: 'export ', c: '#c586c0' }, { t: 'function ', c: '#569cd6' }, { t: 'makeLeoOffice', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }] },
    { num: 38, tokens: [{ t: '  person', c: '#9cdcfe' }, { t: ',', c: '#d4d4d4' }] },
    { num: 39, tokens: [{ t: '  { ', c: '#d4d4d4' }, { t: 'box', c: '#9cdcfe' }, { t: ', ', c: '#d4d4d4' }, { t: 'cyl', c: '#9cdcfe' }, { t: ', ', c: '#d4d4d4' }, { t: 'makeLabelSprite', c: '#9cdcfe' }, { t: ' }', c: '#d4d4d4' }] },
    { num: 40, tokens: [{ t: ') {', c: '#d4d4d4' }] },
    { num: 41, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'group ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'new ', c: '#569cd6' }, { t: 'THREE', c: '#4ec9b0' }, { t: '.', c: '#d4d4d4' }, { t: 'Group', c: '#4ec9b0' }, { t: '()', c: '#d4d4d4' }] },
    { num: 42, tokens: [] },
    { num: 43, tokens: [{ t: '  // Palco con bordo LED', c: '#6a9955' }] },
    { num: 44, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'stage ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'cyl', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '4.7', c: '#b5cea8' }, { t: ', ', c: '#d4d4d4' }, { t: '5.2', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 45, tokens: [{ t: '  stage.', c: '#d4d4d4' }, { t: 'position', c: '#9cdcfe' }, { t: '.y = ', c: '#d4d4d4' }, { t: '-0.22', c: '#b5cea8' }] },
    { num: 46, tokens: [] },
    { num: 47, tokens: [{ t: '  // Scrivania designer', c: '#6a9955' }] },
    { num: 48, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'deskTop ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'box', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '4.84', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 49, tokens: [] },
    { num: 50, tokens: [{ t: '  // Sedia gaming', c: '#6a9955' }] },
    { num: 51, tokens: [{ t: '  const ', c: '#569cd6' }, { t: 'chairGroup ', c: '#4fc1ff' }, { t: '= ', c: '#d4d4d4' }, { t: 'new ', c: '#569cd6' }, { t: 'THREE', c: '#4ec9b0' }, { t: '.', c: '#d4d4d4' }, { t: 'Group', c: '#4ec9b0' }, { t: '()', c: '#d4d4d4' }] },
    { num: 52, tokens: [{ t: '  chairGroup.', c: '#d4d4d4' }, { t: 'position', c: '#9cdcfe' }, { t: '.', c: '#d4d4d4' }, { t: 'set', c: '#dcdcaa' }, { t: '(', c: '#d4d4d4' }, { t: '0', c: '#b5cea8' }, { t: ')', c: '#d4d4d4' }] },
    { num: 53, tokens: [] },
    { num: 54, tokens: [{ t: '  return ', c: '#c586c0' }, { t: '{ group, clickZone }', c: '#d4d4d4' }] },
    { num: 55, tokens: [{ t: '}', c: '#d4d4d4' }] },
  ]

  // Current line highlight
  ctx.fillStyle = '#2a2d32'
  ctx.fillRect(editorX, startY + 4 * lineH - 12, editorW - 38, lineH)

  codeLines.forEach((line) => {
    const y = startY + (line.num - 1) * lineH

    // Line number
    ctx.fillStyle = line.num === 5 ? '#c6c6c6' : '#858585'
    ctx.font = '10px monospace'
    ctx.textAlign = 'right'
    ctx.fillText(String(line.num), editorX + gutterW - 4, y)
    ctx.textAlign = 'left'

    // Tokens
    let x = codeX
    line.tokens.forEach(token => {
      ctx.fillStyle = token.c
      ctx.fillText(token.t, x, y)
      x += ctx.measureText(token.t).width
    })
  })

  // Cursor blink line
  ctx.fillStyle = '#aeafad'
  ctx.fillRect(codeX + ctx.measureText('  const ').width, startY + 4 * lineH - 11, 1.5, 13)

  // Status bar
  ctx.fillStyle = '#007acc'
  ctx.fillRect(0, 960 - 22, 540, 22)
  ctx.fillStyle = '#ffffff'
  ctx.font = '9px sans-serif'
  ctx.fillText('⑂ main', 8, 960 - 8)
  ctx.fillText('Ln 5, Col 9', 120, 960 - 8)
  ctx.fillText('Spaces: 2', 220, 960 - 8)
  ctx.fillText('UTF-8', 310, 960 - 8)
  ctx.fillText('JavaScript', 380, 960 - 8)
  ctx.fillText('Prettier', 470, 960 - 8)

  // Remote indicator (left side of status bar)
  ctx.fillStyle = '#16825d'
  ctx.fillRect(0, 960 - 22, 6, 22)

  // Panel/terminal at bottom
  const panelY = 960 - 22 - 160
  ctx.fillStyle = '#1e1e1e'
  ctx.fillRect(editorX, panelY, editorW, 160)
  // Panel top border
  ctx.fillStyle = '#007acc'
  ctx.fillRect(editorX, panelY, editorW, 1)
  // Panel tabs
  ctx.fillStyle = '#2d2d2d'
  ctx.fillRect(editorX, panelY + 1, editorW, 22)
  ctx.fillStyle = '#ffffff'
  ctx.font = '9px sans-serif'
  ctx.fillText('TERMINAL', editorX + 10, panelY + 16)
  ctx.fillStyle = '#858585'
  ctx.fillText('PROBLEMS', editorX + 82, panelY + 16)
  ctx.fillText('OUTPUT', editorX + 158, panelY + 16)
  // Active tab underline
  ctx.fillStyle = '#007acc'
  ctx.fillRect(editorX + 6, panelY + 22, 62, 2)

  // Terminal content
  ctx.font = '9px monospace'
  const termLines = [
    { t: '~/friends-hq $', c: '#4ec9b0' },
    { t: 'npm run dev', c: '#d4d4d4' },
    { t: '', c: '' },
    { t: '  VITE v5.4.21  ready in 380 ms', c: '#6a9955' },
    { t: '', c: '' },
    { t: '  ➜  Local:   http://localhost:5173/', c: '#569cd6' },
    { t: '  ➜  Network: http://192.168.1.42:5173/', c: '#858585' },
    { t: '  ➜  press h + enter to show help', c: '#858585' },
  ]
  termLines.forEach((line, i) => {
    if (line.t) {
      ctx.fillStyle = line.c
      ctx.fillText(line.t, editorX + 8, panelY + 42 + i * 14)
    }
  })

  return new THREE.CanvasTexture(c)
}

// Schermo preview sito Friends HQ per monitor 32"
function makeSitePreviewScreen(persons) {
  const c = document.createElement('canvas')
  c.width = 960
  c.height = 540
  const ctx = c.getContext('2d')

  // Background scuro spazio
  const bgGrad = ctx.createRadialGradient(480, 270, 40, 480, 270, 480)
  bgGrad.addColorStop(0, '#0a1628')
  bgGrad.addColorStop(1, '#020409')
  ctx.fillStyle = bgGrad
  ctx.fillRect(0, 0, 960, 540)

  // Stelle
  ctx.fillStyle = 'rgba(220, 240, 255, 0.7)'
  for (let i = 0; i < 90; i++) {
    const sx = Math.random() * 960
    const sy = Math.random() * 540
    const sr = 0.4 + Math.random() * 1.1
    ctx.beginPath()
    ctx.arc(sx, sy, sr, 0, Math.PI * 2)
    ctx.fill()
  }

  // Pianeta centrale
  const planetGrad = ctx.createRadialGradient(480, 310, 10, 480, 310, 72)
  planetGrad.addColorStop(0, '#2a4a6e')
  planetGrad.addColorStop(0.7, '#1c314d')
  planetGrad.addColorStop(1, '#0b1121')
  ctx.fillStyle = planetGrad
  ctx.beginPath()
  ctx.arc(480, 310, 72, 0, Math.PI * 2)
  ctx.fill()

  // Atmosfera
  ctx.strokeStyle = 'rgba(79, 209, 255, 0.2)'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(480, 310, 78, 0, Math.PI * 2)
  ctx.stroke()

  // Orbite tratteggiate
  ctx.setLineDash([4, 6])
  ctx.strokeStyle = 'rgba(100, 160, 255, 0.12)'
  ctx.lineWidth = 1
  ;[140, 170, 200].forEach(r => {
    ctx.beginPath()
    ctx.ellipse(480, 310, r, r * 0.55, 0, 0, Math.PI * 2)
    ctx.stroke()
  })
  ctx.setLineDash([])

  // Piattaforme uffici come punti luminosi sull'orbita
  const orbitAngles = [0.4, 1.6, 2.7, 3.9, 5.2]
  const orbitColors = ['#3b82f6', '#f97316', '#8b5cf6', '#10b981', '#06b6d4']
  const orbitNames = ['Leo', 'Teo', 'Napo', 'Andre', 'Dalla']
  orbitAngles.forEach((angle, i) => {
    const r = 140 + (i % 3) * 30
    const ox = 480 + Math.cos(angle) * r
    const oy = 310 + Math.sin(angle) * r * 0.55

    // Glow
    const glow = ctx.createRadialGradient(ox, oy, 2, ox, oy, 18)
    glow.addColorStop(0, orbitColors[i])
    glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(ox, oy, 18, 0, Math.PI * 2)
    ctx.fill()

    // Punto
    ctx.fillStyle = orbitColors[i]
    ctx.beginPath()
    ctx.arc(ox, oy, 5, 0, Math.PI * 2)
    ctx.fill()

    // Piccola piattaforma (rettangolino)
    ctx.fillStyle = orbitColors[i] + '66'
    ctx.fillRect(ox - 10, oy - 3, 20, 6)

    // Nome
    ctx.fillStyle = '#ffffff'
    ctx.font = '8px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(orbitNames[i], ox, oy - 14)
  })

  // Titolo
  ctx.textAlign = 'center'
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 28px sans-serif'
  ctx.fillText('FRIENDS HQ', 480, 65)

  // Sottotitolo
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '12px sans-serif'
  ctx.fillText('Quartier Generale del Gruppo', 480, 88)

  // Linea decorativa sotto titolo
  const lineGrad = ctx.createLinearGradient(360, 0, 600, 0)
  lineGrad.addColorStop(0, 'transparent')
  lineGrad.addColorStop(0.5, '#3b82f6')
  lineGrad.addColorStop(1, 'transparent')
  ctx.strokeStyle = lineGrad
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(360, 98)
  ctx.lineTo(600, 98)
  ctx.stroke()

  // Card info in basso a sinistra (stile del sito)
  const cardX = 38
  const cardY = 380
  ctx.fillStyle = 'rgba(3, 8, 18, 0.75)'
  ctx.beginPath()
  ctx.roundRect(cardX, cardY, 200, 120, 12)
  ctx.fill()
  ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(cardX, cardY, 200, 120, 12)
  ctx.stroke()

  // Avatar
  ctx.fillStyle = 'rgba(59, 130, 246, 0.15)'
  ctx.beginPath()
  ctx.arc(cardX + 30, cardY + 32, 16, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#3b82f6'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(cardX + 30, cardY + 32, 16, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = '#ffffff'
  ctx.font = '16px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('🎨', cardX + 30, cardY + 38)

  // Nome e ruolo
  ctx.textAlign = 'left'
  ctx.fillStyle = '#3b82f6'
  ctx.font = 'bold 14px sans-serif'
  ctx.fillText('Leo', cardX + 56, cardY + 30)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.font = '9px sans-serif'
  ctx.fillText('Leonardo Alloni', cardX + 56, cardY + 44)

  // Tags
  const tags = ['React', 'CSS', 'Figma', 'Sales']
  ctx.font = '8px sans-serif'
  let tagX = cardX + 14
  tags.forEach(tag => {
    const tw = ctx.measureText(tag).width + 12
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(tagX, cardY + 60, tw, 18, 8)
    ctx.stroke()
    ctx.fillStyle = '#3b82f6'
    ctx.fillText(tag, tagX + 6, cardY + 73)
    tagX += tw + 6
  })

  // Bio preview
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.font = '8px sans-serif'
  ctx.fillText('Il volto del progetto. Trasforma', cardX + 14, cardY + 98)
  ctx.fillText('wireframe in interfacce bellissime...', cardX + 14, cardY + 110)

  // Navigation dots in basso al centro
  const dotY = 510
  orbitColors.forEach((color, i) => {
    const dx = 430 + i * 26
    ctx.fillStyle = i === 0 ? color : color + '44'
    ctx.beginPath()
    ctx.arc(dx, dotY, 5, 0, Math.PI * 2)
    ctx.fill()
    if (i === 0) {
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(dx, dotY, 8, 0, Math.PI * 2)
      ctx.stroke()
    }
  })

  // Status "1 / 5" accanto ai dots
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = '10px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('1 / 5', 480, 528)

  // Browser chrome (tab bar in alto)
  ctx.fillStyle = '#1a1a2e'
  ctx.fillRect(0, 0, 960, 32)
  // Tab
  ctx.fillStyle = '#252536'
  ctx.beginPath()
  ctx.roundRect(8, 4, 180, 24, [6, 6, 0, 0])
  ctx.fill()
  ctx.fillStyle = '#ffffff'
  ctx.font = '9px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('🌐 Friends HQ — Quartier Generale', 26, 20)
  // Close tab X
  ctx.fillStyle = '#858585'
  ctx.font = '10px sans-serif'
  ctx.fillText('×', 172, 20)
  // URL bar
  ctx.fillStyle = '#0d0d1a'
  ctx.beginPath()
  ctx.roundRect(200, 6, 560, 20, 10)
  ctx.fill()
  ctx.fillStyle = '#858585'
  ctx.font = '9px sans-serif'
  ctx.fillText('🔒 localhost:5173', 220, 20)
  // Window controls
  ctx.fillStyle = '#858585'
  ctx.font = '12px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText('— □ ×', 940, 20)

  ctx.textAlign = 'left'
  return new THREE.CanvasTexture(c)
}

// Monitor centrale 32" landscape (16:9)
function makeMainMonitor32(person, { box, cyl, makeMiniScreen }) {
  const group = new THREE.Group()

  // Clamp da scrivania
  const clamp = box(0.24, 0.18, 0.3, 0x0f172a)
  clamp.position.set(0, 0.09, 0.02)
  group.add(clamp)
  const clampScrew = cyl(0.04, 0.04, 0.06, 12, 0x334155, { metalness: 0.5, roughness: 0.3 })
  clampScrew.position.set(0, 0.2, 0.12)
  clampScrew.rotation.x = Math.PI / 2
  group.add(clampScrew)

  // Palo verticale
  const pole = cyl(0.055, 0.055, 1.18, 18, 0x1f2937, { metalness: 0.45, roughness: 0.35 })
  pole.position.set(0, 0.64, 0)
  group.add(pole)
  const poleCap = cyl(0.07, 0.07, 0.04, 18, 0x334155, { metalness: 0.4, roughness: 0.3 })
  poleCap.position.set(0, 1.24, 0)
  group.add(poleCap)

  // Braccio inferiore
  const lowerArm = box(0.62, 0.09, 0.13, 0x334155, { metalness: 0.3, roughness: 0.35 })
  lowerArm.position.set(0, 1.0, 0.04)
  lowerArm.rotation.z = 0.12
  group.add(lowerArm)
  const lowerJoint = cyl(0.06, 0.06, 0.15, 14, 0x475569, { metalness: 0.4, roughness: 0.3 })
  lowerJoint.position.set(0, 0.94, 0.04)
  lowerJoint.rotation.x = Math.PI / 2
  group.add(lowerJoint)

  // Braccio superiore
  const upperArm = box(0.56, 0.08, 0.11, 0x475569, { metalness: 0.32, roughness: 0.34 })
  upperArm.position.set(0.18, 1.14, 0.08)
  upperArm.rotation.z = -0.18
  group.add(upperArm)
  const upperJoint = cyl(0.05, 0.05, 0.13, 14, 0x64748b, { metalness: 0.4, roughness: 0.3 })
  upperJoint.position.set(0.32, 1.12, 0.08)
  upperJoint.rotation.x = Math.PI / 2
  group.add(upperJoint)

  // Attacco VESA
  const vesa = box(0.22, 0.22, 0.06, 0x0f172a)
  vesa.position.set(0, 1.16, 0.1)
  group.add(vesa)
  // Viti VESA
  ;[[-0.06, 1.1], [-0.06, 1.22], [0.06, 1.1], [0.06, 1.22]].forEach(([x, y]) => {
    const screw = cyl(0.015, 0.015, 0.03, 8, 0x64748b, { metalness: 0.6 })
    screw.position.set(x, y, 0.14)
    screw.rotation.x = Math.PI / 2
    group.add(screw)
  })

  // Scocca monitor 32"
  const shellW = 2.08
  const shellH = 1.22
  const shell = box(shellW, shellH, 0.07, 0x0b1120)
  shell.position.set(0, 1.2, 0.16)
  group.add(shell)

  // Cornice sottile (bezel)
  const bezelThick = 0.025
  const bezelTop = box(shellW - 0.04, bezelThick, 0.03, 0x1a1a2e)
  bezelTop.position.set(0, 1.8, 0.2)
  group.add(bezelTop)
  const bezelBottom = box(shellW - 0.04, 0.05, 0.03, 0x1a1a2e)
  bezelBottom.position.set(0, 0.6, 0.2)
  group.add(bezelBottom)
  const bezelLeft = box(bezelThick, shellH - 0.04, 0.03, 0x1a1a2e)
  bezelLeft.position.set(-shellW / 2 + 0.03, 1.2, 0.2)
  group.add(bezelLeft)
  const bezelRight = box(bezelThick, shellH - 0.04, 0.03, 0x1a1a2e)
  bezelRight.position.set(shellW / 2 - 0.03, 1.2, 0.2)
  group.add(bezelRight)

  // Logo brand sul bezel inferiore
  const brandLogo = box(0.12, 0.02, 0.02, 0x64748b, { metalness: 0.5 })
  brandLogo.position.set(0, 0.61, 0.22)
  group.add(brandLogo)

  // Schermo 32" (16:9)
  const screenW = 1.92
  const screenH = 1.08
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW, screenH),
    new THREE.MeshBasicMaterial({ map: makeSitePreviewScreen() })
  )
  screen.position.set(0, 1.2, 0.205)
  group.add(screen)

  // LED bar ambientale sotto il monitor
  const ledBar = box(1.72, 0.03, 0.02, 0x60a5fa, {
    emissive: person.threeColor,
    emissiveIntensity: 0.55,
    transparent: true,
    opacity: 0.92,
  })
  ledBar.position.set(0, 0.56, 0.18)
  group.add(ledBar)

  // Cavo che scende dal retro
  const cable = cyl(0.018, 0.018, 0.72, 8, 0x1f2937)
  cable.position.set(0.12, 0.42, 0.04)
  group.add(cable)

  return group
}

// Monitor laterale 27" portrait (9:16)
function makeSideMonitor27(person, { box, cyl, makeMiniScreen }) {
  const group = new THREE.Group()

  // Clamp da scrivania
  const clamp = box(0.2, 0.16, 0.26, 0x0f172a)
  clamp.position.set(0, 0.08, 0.02)
  group.add(clamp)
  const clampScrew = cyl(0.035, 0.035, 0.05, 12, 0x334155, { metalness: 0.5, roughness: 0.3 })
  clampScrew.position.set(0, 0.18, 0.1)
  clampScrew.rotation.x = Math.PI / 2
  group.add(clampScrew)

  // Palo verticale
  const pole = cyl(0.05, 0.05, 1.1, 18, 0x1f2937, { metalness: 0.45, roughness: 0.35 })
  pole.position.set(0, 0.6, 0)
  group.add(pole)
  const poleCap = cyl(0.065, 0.065, 0.035, 18, 0x334155, { metalness: 0.4, roughness: 0.3 })
  poleCap.position.set(0, 1.16, 0)
  group.add(poleCap)

  // Braccio
  const arm = box(0.58, 0.08, 0.11, 0x334155, { metalness: 0.3, roughness: 0.35 })
  arm.position.set(-0.22, 1.0, 0.04)
  arm.rotation.z = -0.2
  group.add(arm)
  const joint = cyl(0.05, 0.05, 0.13, 14, 0x475569, { metalness: 0.4, roughness: 0.3 })
  joint.position.set(0, 0.94, 0.04)
  joint.rotation.x = Math.PI / 2
  group.add(joint)

  // Attacco VESA
  const vesa = box(0.18, 0.18, 0.05, 0x0f172a)
  vesa.position.set(-0.48, 1.06, 0.08)
  group.add(vesa)

  // Scocca monitor 27" in verticale (portrait)
  const shellW = 0.88
  const shellH = 1.5
  const shell = box(shellW, shellH, 0.06, 0x0b1120)
  shell.position.set(-0.48, 1.16, 0.14)
  group.add(shell)

  // Cornice sottile (bezel)
  const bezelThick = 0.022
  const bezelTop = box(shellW - 0.04, bezelThick, 0.025, 0x1a1a2e)
  bezelTop.position.set(-0.48, 1.9, 0.18)
  group.add(bezelTop)
  const bezelBottom = box(shellW - 0.04, 0.04, 0.025, 0x1a1a2e)
  bezelBottom.position.set(-0.48, 0.42, 0.18)
  group.add(bezelBottom)
  const bezelLeft = box(bezelThick, shellH - 0.04, 0.025, 0x1a1a2e)
  bezelLeft.position.set(-0.48 - shellW / 2 + 0.03, 1.16, 0.18)
  group.add(bezelLeft)
  const bezelRight = box(bezelThick, shellH - 0.04, 0.025, 0x1a1a2e)
  bezelRight.position.set(-0.48 + shellW / 2 - 0.03, 1.16, 0.18)
  group.add(bezelRight)

  // Logo brand
  const brandLogo = box(0.1, 0.018, 0.02, 0x64748b, { metalness: 0.5 })
  brandLogo.position.set(-0.48, 0.43, 0.2)
  group.add(brandLogo)

  // Schermo 27" portrait (9:16)
  const screenW = 0.76
  const screenH = 1.35
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW, screenH),
    new THREE.MeshBasicMaterial({ map: makeVSCodeScreen() })
  )
  screen.position.set(-0.48, 1.16, 0.185)
  group.add(screen)

  // LED bar laterale
  const ledBar = box(0.56, 0.025, 0.02, 0x60a5fa, {
    emissive: person.threeColor,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.88,
  })
  ledBar.position.set(-0.48, 0.38, 0.16)
  group.add(ledBar)

  // Cavo
  const cable = cyl(0.016, 0.016, 0.58, 8, 0x1f2937)
  cable.position.set(-0.38, 0.14, 0.02)
  group.add(cable)

  return group
}

export function makeLeoOffice(person, { box, cyl, makeLabelSprite, makeMiniScreen, clickTargets }) {
  const group = new THREE.Group()
  const helpers = { box, cyl, makeMiniScreen }

  const stage = cyl(4.7, 5.2, 0.46, 64, 0x0b1220)
  stage.position.y = -0.22
  group.add(stage)

  const rim = cyl(4.92, 4.92, 0.028, 64, 0x60a5fa, {
    emissive: person.threeColor,
    emissiveIntensity: 0.95,
    transparent: true,
    opacity: 0.96,
  })
  rim.position.y = 0.02
  group.add(rim)

  const backPanel = box(6.4, 2.6, 0.18, 0x0f172a)
  backPanel.position.set(0.15, 2.02, -1.98)
  group.add(backPanel)

  const backGlow = box(6.05, 2.25, 0.04, 0x0b3b7e, {
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.34,
  })
  backGlow.position.set(0.15, 2.0, -1.86)
  group.add(backGlow)

  const deskTop = box(5.24, 0.12, 2.22, 0xeff6ff, { roughness: 0.48, metalness: 0.1 })
  deskTop.position.set(0, 1.36, -0.24)
  group.add(deskTop)

  const deskCore = box(5.12, 0.08, 2.1, person.deskColor, { roughness: 0.62, metalness: 0.08 })
  deskCore.position.set(0, 1.25, -0.24)
  group.add(deskCore)

  const deskMat = box(5.04, 0.03, 1.42, 0x64748b, {
    roughness: 0.9,
    metalness: 0.04,
  })
  deskMat.position.set(0, 1.44, 0.08)
  group.add(deskMat)

  const deskMatGlow = box(4.88, 0.012, 1.28, 0x1d4ed8, {
    emissive: 0x2563eb,
    emissiveIntensity: 0.16,
    transparent: true,
    opacity: 0.14,
  })
  deskMatGlow.position.set(0, 1.465, 0.08)
  group.add(deskMatGlow)

  const deskCut = box(0.7, 0.03, 0.16, 0x93c5fd, {
    emissive: 0x60a5fa,
    emissiveIntensity: 0.15,
  })
  deskCut.position.set(0, 1.435, -1.08)
  group.add(deskCut)

  const cableTray = box(2.72, 0.18, 0.3, 0x0f172a)
  cableTray.position.set(0, 1.16, -1.08)
  group.add(cableTray)

  const deskShadowTrim = box(5.22, 0.05, 2.28, 0x93c5fd, {
    transparent: true,
    opacity: 0.18,
    emissive: 0x60a5fa,
    emissiveIntensity: 0.28,
  })
  deskShadowTrim.position.set(0, 1.475, -0.24)
  group.add(deskShadowTrim)

  ;[-2.32, 2.32].forEach(x => {
    const outerLeg = box(0.14, 1.32, 0.14, 0xe2e8f0, { metalness: 0.35, roughness: 0.3 })
    outerLeg.position.set(x, 0.67, 0.02)
    group.add(outerLeg)

    const cross = box(0.18, 1.2, 0.12, 0x94a3b8, { metalness: 0.3, roughness: 0.35 })
    cross.position.set(x, 0.65, -0.72)
    cross.rotation.x = 0.12
    group.add(cross)
  })

  // Case PC sotto la scrivania, lato destro — fronte verso l'utente (+z)
  const pcCase = new THREE.Group()
  pcCase.position.set(1.72, 0.52, 0.1)

  // Corpo principale (largo x alto x profondo)
  const caseBody = box(0.44, 0.82, 0.96, 0x0f172a, { roughness: 0.6, metalness: 0.2 })
  pcCase.add(caseBody)

  // Pannello frontale (faccia +z, verso l'utente)
  const caseFront = box(0.40, 0.78, 0.02, 0x131c2a)
  caseFront.position.set(0, 0, 0.50)
  pcCase.add(caseFront)

  // Pannello vetro laterale sinistro (verso il centro della scrivania, -x)
  const sideGlass = box(0.02, 0.7, 0.80, 0x0a1628, {
    transparent: true,
    opacity: 0.35,
  })
  sideGlass.position.set(-0.24, 0.02, 0)
  pcCase.add(sideGlass)

  // RGB interno visibile dal vetro
  const rgbStrip = box(0.01, 0.5, 0.04, 0x3b82f6, {
    emissive: person.threeColor,
    emissiveIntensity: 0.9,
    transparent: true,
    opacity: 0.7,
  })
  rgbStrip.position.set(-0.20, 0.04, -0.32)
  pcCase.add(rgbStrip)

  const rgbStrip2 = box(0.01, 0.02, 0.64, 0x3b82f6, {
    emissive: person.threeColor,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.5,
  })
  rgbStrip2.position.set(-0.20, 0.28, 0)
  pcCase.add(rgbStrip2)

  // Glow interno diffuso
  const innerGlow = box(0.24, 0.6, 0.64, person.threeColor, {
    transparent: true,
    opacity: 0.04,
    emissive: person.threeColor,
    emissiveIntensity: 0.3,
  })
  innerGlow.position.set(-0.08, 0.04, 0)
  pcCase.add(innerGlow)

  // Zona I/O frontale in alto
  const ioPanelBg = box(0.28, 0.1, 0.01, 0x1a2433)
  ioPanelBg.position.set(0, 0.32, 0.52)
  pcCase.add(ioPanelBg)

  // Pulsante accensione
  const powerBtn = cyl(0.025, 0.025, 0.015, 12, 0x3b82f6, {
    emissive: person.threeColor,
    emissiveIntensity: 1.0,
  })
  powerBtn.position.set(0, 0.34, 0.53)
  powerBtn.rotation.x = Math.PI / 2
  pcCase.add(powerBtn)

  // USB-A e USB-C
  const usbA = box(0.06, 0.022, 0.01, 0x1f2937)
  usbA.position.set(-0.06, 0.3, 0.53)
  pcCase.add(usbA)
  const usbC = box(0.04, 0.016, 0.01, 0x1f2937)
  usbC.position.set(0.06, 0.3, 0.53)
  pcCase.add(usbC)

  // Griglia ventola frontale inferiore
  for (let i = 0; i < 12; i++) {
    const vent = box(0.28, 0.008, 0.01, 0x1a2433)
    vent.position.set(0, -0.2 + i * 0.03, 0.52)
    pcCase.add(vent)
  }

  // Griglia ventola retro
  for (let i = 0; i < 6; i++) {
    const rearVent = box(0.28, 0.01, 0.01, 0x1a2433)
    rearVent.position.set(0, 0.1 + i * 0.035, -0.50)
    pcCase.add(rearVent)
  }

  // Piedini gomma
  ;[[-0.14, -0.36], [0.14, -0.36], [-0.14, 0.36], [0.14, 0.36]].forEach(([x, z]) => {
    const pcFoot = cyl(0.03, 0.035, 0.03, 10, 0x334155)
    pcFoot.position.set(x, -0.43, z)
    pcCase.add(pcFoot)
  })

  group.add(pcCase)

  // Monitor centrale 32" landscape
  const mainMonitor = makeMainMonitor32(person, helpers)
  mainMonitor.position.set(0.1, 1.38, -0.96)
  group.add(mainMonitor)

  // Monitor laterale sinistro 27" portrait
  const sideMonitor = makeSideMonitor27(person, helpers)
  sideMonitor.position.set(-1.18, 1.38, -0.82)
  sideMonitor.rotation.y = 0.22
  group.add(sideMonitor)

  // Tastiera meccanica con tasti
  const kbGroup = new THREE.Group()
  kbGroup.position.set(0.02, 1.44, 0.28)

  const kbBase = box(1.42, 0.05, 0.42, 0x111827)
  kbBase.position.set(0, 0, 0)
  kbGroup.add(kbBase)

  // Griglia tasti
  const keyColors = [0x1f2937, 0x1a2332, 0x1e293b]
  const rows = 5
  const cols = 15
  const keyW = 0.075
  const keyH = 0.075
  const keyGap = 0.014
  const startX = -((cols - 1) * (keyW + keyGap)) / 2
  const startZ = -((rows - 1) * (keyH + keyGap)) / 2
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Spazio largo nella riga 4
      if (r === 4 && c >= 4 && c <= 10) continue
      const key = box(keyW, 0.03, keyH, keyColors[(r + c) % 3])
      key.position.set(
        startX + c * (keyW + keyGap),
        0.04,
        startZ + r * (keyH + keyGap)
      )
      kbGroup.add(key)
    }
  }
  // Barra spaziatrice
  const spaceBar = box(0.58, 0.03, keyH, 0x1f2937)
  spaceBar.position.set(0, 0.04, startZ + 4 * (keyH + keyGap))
  kbGroup.add(spaceBar)

  group.add(kbGroup)

  const wristRest = box(1.22, 0.06, 0.2, 0x0f172a)
  wristRest.position.set(0.02, 1.44, 0.58)
  group.add(wristRest)

  // Mouse
  const mouseGroup = new THREE.Group()
  mouseGroup.position.set(1.58, 1.48, 0.22)
  const mouseBody = box(0.14, 0.06, 0.22, 0x1f2937, { roughness: 0.5, metalness: 0.2 })
  mouseBody.position.set(0, 0, 0)
  mouseGroup.add(mouseBody)
  const mouseTop = box(0.12, 0.03, 0.18, 0x2d3748, { roughness: 0.4, metalness: 0.25 })
  mouseTop.position.set(0, 0.04, -0.01)
  mouseGroup.add(mouseTop)
  const mouseDivider = box(0.005, 0.02, 0.1, 0x111827)
  mouseDivider.position.set(0, 0.055, -0.04)
  mouseGroup.add(mouseDivider)
  const mouseWheel = cyl(0.012, 0.012, 0.03, 10, 0x64748b, { metalness: 0.4 })
  mouseWheel.position.set(0, 0.06, -0.04)
  mouseWheel.rotation.z = Math.PI / 2
  mouseGroup.add(mouseWheel)
  group.add(mouseGroup)

  // ── Gaming Chair (rebuilt from scratch) ──────────────────────────
  const chairGroup = new THREE.Group()
  chairGroup.position.set(0.02, 0, 2.28)
  chairGroup.scale.setScalar(1.75)

  // Measurements (bottom-up, world y coords relative to chairGroup)
  // Stage surface ≈ 0.01 world → chairGroup.y = 0 → wheels touch y ≈ 0.01
  const WHEEL_R = 0.04          // wheel radius
  const WHEEL_W = 0.06          // wheel width
  const BASE_Y = 0.06           // center of wheels above stage
  const ARM_LEN = 0.58          // star-base arm length (center to wheel)
  const ARM_H = 0.05            // arm thickness
  const ARM_D = 0.10            // arm depth
  const GAS_BOTTOM = BASE_Y + ARM_H / 2
  const GAS_HEIGHT = 0.42       // gas-lift cylinder height
  const GAS_TOP = GAS_BOTTOM + GAS_HEIGHT
  const SEAT_THICK = 0.12       // seat pan thickness
  const SEAT_Y = GAS_TOP + SEAT_THICK / 2  // seat center y
  const SEAT_W = 0.54           // seat width
  const SEAT_D = 0.52           // seat depth
  const BACK_H = 0.72           // backrest height
  const BACK_BOTTOM = SEAT_Y + SEAT_THICK / 2
  const BACK_CENTER_Y = BACK_BOTTOM + BACK_H / 2
  const BACK_Z = SEAT_D / 2 - 0.02  // backrest z (behind seat)
  const HEAD_Y = BACK_BOTTOM + BACK_H + 0.08

  // ── 5-star base ──
  const hubR = 0.06
  const hub = cyl(hubR, hubR, ARM_H + 0.02, 20, 0x1e293b, { metalness: 0.7 })
  hub.position.set(0, BASE_Y, 0)
  chairGroup.add(hub)

  for (let i = 0; i < 5; i++) {
    const a = (Math.PI * 2 * i) / 5 - Math.PI / 2
    const cosA = Math.cos(a)
    const sinA = Math.sin(a)

    // Arm
    const arm = box(ARM_LEN, ARM_H, ARM_D, 0x334155, { metalness: 0.5 })
    arm.position.set(cosA * ARM_LEN / 2, BASE_Y, sinA * ARM_LEN / 2)
    arm.rotation.y = -a
    chairGroup.add(arm)

    // Fork housing at end of arm
    const forkX = cosA * ARM_LEN
    const forkZ = sinA * ARM_LEN
    const forkHousing = box(0.07, 0.10, 0.07, 0x1e293b, { metalness: 0.6 })
    forkHousing.position.set(forkX, BASE_Y - 0.02, forkZ)
    chairGroup.add(forkHousing)

    // Wheel — aligned perpendicular to arm direction
    const wheelGeo = new THREE.CylinderGeometry(WHEEL_R, WHEEL_R, WHEEL_W, 14)
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a, roughness: 0.35, metalness: 0.3,
    })
    const wheel = new THREE.Mesh(wheelGeo, wheelMat)
    // Position at arm tip, bottom touching stage
    wheel.position.set(forkX, BASE_Y - 0.02, forkZ)
    // Rotate so the cylinder axis is perpendicular to the arm direction
    wheel.rotation.set(0, a, Math.PI / 2)
    chairGroup.add(wheel)

    // Wheel axle (tiny rod through wheel center)
    const axle = cyl(0.012, 0.012, WHEEL_W + 0.02, 8, 0x64748b, { metalness: 0.8 })
    axle.position.copy(wheel.position)
    axle.rotation.set(0, a, Math.PI / 2)
    chairGroup.add(axle)
  }

  // ── Upper body (scaled independently from base) ──
  const upperBody = new THREE.Group()
  upperBody.scale.setScalar(1.18)

  // ── Gas-lift cylinder ──
  const gasOuter = cyl(0.045, 0.035, GAS_HEIGHT, 14, 0x475569, { metalness: 0.8 })
  gasOuter.position.set(0, GAS_BOTTOM + GAS_HEIGHT / 2, 0)
  upperBody.add(gasOuter)
  const gasChrome = cyl(0.025, 0.025, GAS_HEIGHT * 0.35, 12, 0xc0c0c0, { metalness: 0.95 })
  gasChrome.position.set(0, GAS_BOTTOM + GAS_HEIGHT * 0.18, 0)
  upperBody.add(gasChrome)

  // ── Seat mechanism (tilt plate) ──
  const tiltPlate = box(0.24, 0.04, 0.24, 0x1e293b, { metalness: 0.6 })
  tiltPlate.position.set(0, GAS_TOP + 0.02, 0)
  upperBody.add(tiltPlate)

  // ── Seat pan ──
  const seatShell = box(SEAT_W, SEAT_THICK, SEAT_D, 0x111827)
  seatShell.position.set(0, SEAT_Y, 0)
  upperBody.add(seatShell)

  // Seat cushion (blue accent)
  const cushion = box(SEAT_W - 0.06, 0.04, SEAT_D - 0.06, 0x1d4ed8, {
    emissive: 0x1e40af, emissiveIntensity: 0.2,
  })
  cushion.position.set(0, SEAT_Y + SEAT_THICK / 2 + 0.02, 0)
  upperBody.add(cushion)

  // Seat side bolsters
  const bolsterH = 0.08
  const seatBolsterL = box(0.06, bolsterH, SEAT_D - 0.08, 0x0f172a)
  seatBolsterL.position.set(-SEAT_W / 2 + 0.03, SEAT_Y + SEAT_THICK / 2 + bolsterH / 2, 0)
  upperBody.add(seatBolsterL)
  const seatBolsterR = box(0.06, bolsterH, SEAT_D - 0.08, 0x0f172a)
  seatBolsterR.position.set(SEAT_W / 2 - 0.03, SEAT_Y + SEAT_THICK / 2 + bolsterH / 2, 0)
  upperBody.add(seatBolsterR)

  // Waterfall front edge
  const frontEdge = box(SEAT_W - 0.10, 0.06, 0.08, 0x1e293b)
  frontEdge.position.set(0, SEAT_Y, -SEAT_D / 2 + 0.02)
  upperBody.add(frontEdge)

  // ── Backrest ──
  const backW = SEAT_W - 0.04
  const backrest = box(backW, BACK_H, 0.10, 0x2563eb, {
    emissive: 0x1d4ed8, emissiveIntensity: 0.18,
  })
  backrest.position.set(0, BACK_CENTER_Y, BACK_Z)
  upperBody.add(backrest)

  // Backrest outer shell
  const backShell = box(backW + 0.04, BACK_H + 0.02, 0.06, 0x111827)
  backShell.position.set(0, BACK_CENTER_Y, BACK_Z + 0.07)
  upperBody.add(backShell)

  // Side wings (angled)
  const wingH = BACK_H * 0.75
  const wingL = box(0.08, wingH, 0.12, 0x0f172a)
  wingL.position.set(-backW / 2 - 0.02, BACK_BOTTOM + wingH / 2, BACK_Z)
  wingL.rotation.z = 0.12
  upperBody.add(wingL)
  const wingR = box(0.08, wingH, 0.12, 0x0f172a)
  wingR.position.set(backW / 2 + 0.02, BACK_BOTTOM + wingH / 2, BACK_Z)
  wingR.rotation.z = -0.12
  upperBody.add(wingR)

  // Shoulder supports
  const shoulderL = box(0.10, 0.14, 0.08, 0x0f172a)
  shoulderL.position.set(-backW / 2 + 0.06, BACK_BOTTOM + BACK_H - 0.10, BACK_Z - 0.04)
  upperBody.add(shoulderL)
  const shoulderR = box(0.10, 0.14, 0.08, 0x0f172a)
  shoulderR.position.set(backW / 2 - 0.06, BACK_BOTTOM + BACK_H - 0.10, BACK_Z - 0.04)
  upperBody.add(shoulderR)

  // Lumbar support pillow (accent color)
  const lumbar = box(0.30, 0.12, 0.06, 0x60a5fa, {
    emissive: person.threeColor, emissiveIntensity: 0.15,
  })
  lumbar.position.set(0, BACK_BOTTOM + BACK_H * 0.28, BACK_Z - 0.07)
  upperBody.add(lumbar)

  // ── Headrest ──
  const headrest = box(0.28, 0.12, 0.08, 0x1e293b)
  headrest.position.set(0, HEAD_Y, BACK_Z + 0.02)
  upperBody.add(headrest)
  const headPillow = box(0.22, 0.08, 0.05, 0xe2e8f0)
  headPillow.position.set(0, HEAD_Y, BACK_Z - 0.04)
  upperBody.add(headPillow)

  // Headrest bracket (connects to backrest)
  const headBracketL = box(0.02, 0.10, 0.04, 0x475569, { metalness: 0.7 })
  headBracketL.position.set(-0.08, HEAD_Y - 0.10, BACK_Z + 0.02)
  upperBody.add(headBracketL)
  const headBracketR = box(0.02, 0.10, 0.04, 0x475569, { metalness: 0.7 })
  headBracketR.position.set(0.08, HEAD_Y - 0.10, BACK_Z + 0.02)
  upperBody.add(headBracketR)

  // ── Armrests ──
  const armY = SEAT_Y + SEAT_THICK / 2 + 0.20  // armrest pad height
  const armX = SEAT_W / 2 + 0.06
  // Left armrest
  const armPostL = box(0.06, 0.20, 0.06, 0x475569, { metalness: 0.5 })
  armPostL.position.set(-armX, SEAT_Y + 0.10, 0)
  upperBody.add(armPostL)
  const armPadL = box(0.08, 0.03, 0.22, 0x0f172a)  // narrow x, long z (front-to-back)
  armPadL.position.set(-armX, armY, 0)
  upperBody.add(armPadL)

  // Right armrest
  const armPostR = box(0.06, 0.20, 0.06, 0x475569, { metalness: 0.5 })
  armPostR.position.set(armX, SEAT_Y + 0.10, 0)
  upperBody.add(armPostR)
  const armPadR = box(0.08, 0.03, 0.22, 0x0f172a)
  armPadR.position.set(armX, armY, 0)
  upperBody.add(armPadR)

  chairGroup.add(upperBody)

  group.add(chairGroup)

  const logoFrame = box(1.48, 1.48, 0.08, 0x0f172a)
  logoFrame.position.set(0.2, 2.24, -1.82)
  group.add(logoFrame)
  const logoPanel = box(1.34, 1.34, 0.02, 0x60a5fa, {
    emissive: person.threeColor,
    emissiveIntensity: 0.65,
    transparent: true,
    opacity: 0.9,
  })
  logoPanel.position.set(0.2, 2.24, -1.76)
  group.add(logoPanel)

  const label = makeLabelSprite(person)
  label.position.set(0.2, 3.44, -0.1)
  group.add(label)

  const clickZone = new THREE.Mesh(
    new THREE.CylinderGeometry(5.3, 5.3, 4.4, 40),
    new THREE.MeshBasicMaterial({ visible: false })
  )
  clickZone.position.y = 1.35
  clickZone.userData.personId = person.id
  group.add(clickZone)
  clickTargets.push(clickZone)

  return {
    group,
    clickZone,
    label,
    focusOffset: {
      camera: new THREE.Vector3(0, 3.35, 5.9),
      target: new THREE.Vector3(0, 1.42, -0.06),
    },
  }
}
