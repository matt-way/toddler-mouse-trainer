var c = document.getElementById('c')
var ctx = c.getContext('2d')

c.width = document.body.clientWidth
c.height = document.body.clientHeight

var mouseX, mouseY

var cursorWidth = 200
var targetRadius = 300
var targetCentre = randomScreenCoord()

var mColour = '#ff0000'

render()

function randomScreenCoord(){
  var maxX = c.width - targetRadius
  var maxY = c.height - targetRadius
  var min = targetRadius
  return {
    x: Math.floor(Math.random() * (maxX - min + 1) + min),
    y: Math.floor(Math.random() * (maxY - min + 1) + min)
  }
}

function render() {
  ctx.clearRect(0, 0, c.width, c.height)

  // render target
  ctx.beginPath()
  ctx.arc(targetCentre.x, targetCentre.y, targetRadius, 0, 2 * Math.PI, false)
  ctx.fillStyle = 'blue'
  ctx.fill()
  ctx.lineWidth = 5
  ctx.strokeStyle = '#000'
  ctx.stroke()

  var mx = mouseX
  var my = mouseY
  var halfWidth = Math.floor(cursorWidth / 2)
  ctx.beginPath()
  ctx.moveTo(mx, my - halfWidth)
  ctx.lineTo(mx, my + halfWidth)
  ctx.moveTo(mx - halfWidth, my)
  ctx.lineTo(mx + halfWidth, my)
  ctx.lineWidth = Math.ceil(cursorWidth / 10)
  ctx.strokeStyle = mColour
  ctx.stroke()
}

window.onmousemove = function(ev) {
  mouseX = ev.clientX
  mouseY = ev.clientY

  render()
}

window.onmousedown = function(ev) {
  mColour = '#00ff00'
  render()
}

window.onmouseup = function(ev) {
  mColour = '#ff0000'
  render()
}

window.onclick = function(ev) {
  var x = ev.clientX
  var y = ev.clientY

  if(Math.pow(x - targetCentre.x, 2) + Math.pow(y - targetCentre.y, 2) <= Math.pow(targetRadius, 2)){
    targetRadius -= 10
    targetRadius = Math.max(targetRadius, 10)
    targetCentre = randomScreenCoord()
    cursorWidth -= 10
    cursorWidth = Math.max(cursorWidth, 40)
    render()
  }
}