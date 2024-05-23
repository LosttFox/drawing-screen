// Create clear button
const button = document.createElement('button')
button.innerText = 'Clear Board'
button.id = 'mainButton'

// Function to clear drawing
button.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})

// Add the button to your HTML <body> tag
document.body.appendChild(button)