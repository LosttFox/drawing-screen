// Get the viewport container and content elements
const viewportContainer = document.getElementById('container');
const content = document.getElementById('content');

let isDragging = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;

viewportContainer.addEventListener('mousedown', function(e) {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  scrollLeft = viewportContainer.scrollLeft;
  scrollTop = viewportContainer.scrollTop;
});

viewportContainer.addEventListener('mousemove', function(e) {
  if (!isDragging) return;

  const x = e.clientX - startX;
  const y = e.clientY - startY;

  viewportContainer.scrollLeft = scrollLeft - x;
  viewportContainer.scrollTop = scrollTop - y;
});

viewportContainer.addEventListener('mouseup', function() {
  isDragging = false;
});
