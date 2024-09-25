var color = document.getElementById("colorPicker");
var size = document.getElementById("brushSizeSlider");
var toggle = document.getElementById("toggleSwitch");

var sizeInput = document.getElementById("brushSizeInput");

var lastColor = localStorage.getItem("lastColor");
var lastSize = localStorage.getItem("lastSize");

// create canvas element and append it to document body
var canvas = document.getElementById("canvas");

// some hotfixes... ( ≖_≖)
document.body.style.margin = 0;
canvas.style.position = 'fixed';

// get canvas 2D context and set him correct size
var ctx = canvas.getContext('2d');
resize();

// last known position
var pos = { x: 0, y: 0 };

window.addEventListener('resize', resize);

// Mouse events
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

// Touch events for mobile
canvas.addEventListener('touchstart', function (e) {
  e.preventDefault(); // Prevent scrolling
  setPosition(e.touches[0]);
});
canvas.addEventListener('touchmove', function (e) {
  e.preventDefault(); // Prevent scrolling
  draw(e.touches[0]);
});

// new position from mouse or touch event
function setPosition(e)
{
  pos.x = e.clientX || e.pageX;
  pos.y = e.clientY || e.pageY;
}

// resize canvas
function resize()
{
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function draw(e)
{
  if ((e.buttons !== 1 && e.pointerType !== 'touch') || toggle.checked) return;

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
sizeInput.value = lastSize;
ctx.lineWidth = lastSize;

color.addEventListener('change', changeBrushColor);
size.addEventListener('input', changeBrushSize);

function changeBrushColor()
{
  ctx.strokeStyle = color.value;
  localStorage.setItem("lastColor", color.value);
}

function changeBrushSize()
{
  sizeInput.value = size.value;
  ctx.lineWidth = size.value;
  localStorage.setItem("lastSize", size.value);
}

sizeInput.addEventListener('input', inputBrushSize);

function inputBrushSize()
{
  size.value = sizeInput.value;
  changeBrushSize();
}

// Pointer event logging for both mouse and touch
document.addEventListener('pointermove', function (event)
{
  console.log(`Pointer move, Input device type: ${event.pointerType}`);
});

document.addEventListener('pointerdown', function (event)
{
  console.log(`Pointer down, Input device type: ${event.pointerType}`);
});

document.addEventListener('pointerup', function (event)
{
  console.log(`Pointer up, Input device type: ${event.pointerType}`);
});

// https://gist.github.com/rjrodger/1011032
document.ontouchmove = function (e) { e.preventDefault(); };

var canvastop = canvas.offsetTop;

var context = canvas.getContext("2d");

var lastx;
var lasty;

context.strokeStyle = "#000000";
context.lineCap = 'round';
context.lineJoin = 'round';
context.lineWidth = 5;

function clear()
{
  context.fillStyle = "#ffffff";
  context.rect(0, 0, 300, 300);
  context.fill();
}

function dot(x, y)
{
  context.beginPath();
  context.fillStyle = "#000000";
  context.arc(x, y, 1, 0, Math.PI * 2, true);
  context.fill();
  context.stroke();
  context.closePath();
}

function line(fromx, fromy, tox, toy)
{
  context.beginPath();
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.stroke();
  context.closePath();
}

canvas.ontouchstart = function (event)
{
  event.preventDefault();

  lastx = event.touches[0].clientX;
  lasty = event.touches[0].clientY - canvastop;

  dot(lastx, lasty);
};

canvas.ontouchmove = function (event)
{
  event.preventDefault();

  var newx = event.touches[0].clientX;
  var newy = event.touches[0].clientY - canvastop;

  line(lastx, lasty, newx, newy);

  lastx = newx;
  lasty = newy;
};