var slider = document.getElementById("brushSize");
var output = document.getElementById("pixels");
const cursor = document.getElementById('cursor');

output.innerHTML = slider.value + " px";

slider.oninput = function valueChange() {
  output.innerHTML = this.value + " px";

}


// Colour Input 
let colorButton = document.getElementById("primary_color");

colorButton.oninput = function() {
    colorDiv.innerHTML = colorButton.value;
}

// Change brush size
function pixelChange() {
  let customPixels = prompt("Enter a size between 1 and 99", 4);
  slider.value = customPixels;
  output.innerHTML = slider.value + " px";
}

// Cursor
document.addEventListener('mousemove', (e) => {
  const newSize = slider.value;
  cursor.style.width = `${newSize}px`;
  cursor.style.height = `${newSize}px`;
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});