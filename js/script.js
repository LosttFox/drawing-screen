import swal from 'sweetalert';

// Get the canvas element
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Brush customization variables
var slider = document.getElementById("brushSize");
var colour = document.getElementById('primary_color');
var eraser = document.getElementById('eraserCheck');

// Configure canvas properties
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables to track drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;


// Function to start drawing
function startDrawing(e) {
  if (e.type === 'touchstart') {
    e.preventDefault();
    isDrawing = true;
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
  } else if (e.button === 0) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
}

// Function to draw
function draw(e) {
  if (!isDrawing) return;
  
  if (e.type === 'touchmove') {
    e.preventDefault();
    const touch = e.touches[0];
    ctx.lineWidth = slider.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(touch.clientX, touch.clientY);
    ctx.stroke();
    drawingData.push([lastX, lastY, touch.clientX, touch.clientY]);
    [lastX, lastY] = [touch.clientX, touch.clientY];
  } else {
    ctx.lineWidth = slider.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    drawingData.push([lastX, lastY, e.offsetX, e.offsetY]);
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
}

// Enable anti-aliasing for smooth lines
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// Event handlers for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Event handlers for touch events
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);


// Select the element(s) where you want the right-click menu to appear
const targetElement = document.getElementById('body');

// Add an event listener for the right-click event
targetElement.addEventListener('contextmenu', function(e) {
  e.preventDefault(); // Prevent the default browser context menu from appearing

  // Show the custom menu at the click coordinates
  const customMenu = document.getElementById('custom-menu');
  customMenu.style.display = 'block';
  customMenu.style.left = e.pageX + 'px';
  customMenu.style.top = e.pageY + 'px';
});

// Hide the custom menu when a click occurs outside of it
document.addEventListener('click', function() {
  const customMenu = document.getElementById('custom-menu');
  customMenu.style.display = 'none';
});


// Clear function
function clearFunction() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawingData.length = 0
}

// Function to toggle the switch if you click the word
function toggleCheckbox() {
  eraser.checked = !eraser.checked;
  toggleEraser();
}

// Function to toggle between drawing and erasing
function toggleEraser() {
  const isErasing = eraser.checked;
  ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
}

// Change colour
colour.oninput = function() {
  ctx.strokeStyle = colour.value;
}

// Array to store drawing data
const drawingData = [];

// Function to store drawing data
function storeDrawingData(startX, startY, endX, endY) {
  const lineData = {
    startX: startX,
    startY: startY,
    endX: endX,
    endY: endY,
    brushSize: slider.value,
    color: colour.value,
    isErased: eraser.checked
  };
  drawingData.push(lineData);
}

// Function to draw stored lines
function drawStoredLines() {
  drawingData.forEach((line) => {
    ctx.lineWidth = line.brushSize;
    ctx.strokeStyle = line.color;
    if (line.isErased) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.beginPath();
    ctx.moveTo(line.startX, line.startY);
    ctx.lineTo(line.endX, line.endY);
    ctx.stroke();
  });
}

// Function to save drawing data to local storage
function saveDrawingData() {
  const data = JSON.stringify(drawingData);
  localStorage.setItem('drawingData', data);
  console.log(data);
}

// Function to load drawing data from local storage
function loadDrawingData() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const data = localStorage.getItem('drawingData');
  if (data) {
    drawingData.length = 0;
    JSON.parse(data).forEach((line) => {
      drawingData.push(line);
    });
    drawStoredLines();
  }
}

// Call the loadDrawingData function when the page loads
window.addEventListener('load', loadDrawingData);

// Get the save button element and attach the saveCanvasAsImage function to its click event
func saveDrawing()
{
  swal("Can't save", "This button isn't fully working yet :<", "error" {button: "Aww, I'm sorry",});
}
