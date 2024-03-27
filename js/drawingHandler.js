var color = document.getElementById("colorPicker");
var size = document.getElementById("brushSize");
var toggle = document.getElementById("toggleSwitch");

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");

var lastColor = localStorage.getItem("lastColor");
var lastSize = localStorage.getItem("lastSize");

// Code below is from https://stackoverflow.com/a/30684711

// create canvas element and append it to document body
var canvas = document.createElement('canvas');
document.getElementById("screen").appendChild(canvas);

// some hotfixes... ( ≖_≖)
document.body.style.margin = 0;
canvas.style.position = 'fixed';

// get canvas 2D context and set him correct size
var ctx = canvas.getContext('2d');
resize();

// last known position
var pos = { x: 0, y: 0 };

window.addEventListener('resize', resize);
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

// new position from mouse event
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

// resize canvas
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1 || toggle.checked) return;

  ctx.beginPath(); // begin

  ctx.lineCap = 'round';

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
}


// My code
color.value = lastColor;
ctx.strokeStyle = lastColor;
size.value = lastSize;
ctx.lineWidth = lastSize;

color.addEventListener('change', changeBrushColor);
size.addEventListener('change', changeBrushSize);

function changeBrushColor()
{
    ctx.strokeStyle = color.value;
    localStorage.setItem("lastColor", color.value);
}

function changeBrushSize()
{
  ctx.lineWidth = size.value;
  localStorage.setItem("lastSize", size.value);
}