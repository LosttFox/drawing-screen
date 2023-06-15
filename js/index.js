const express = require('express');
const multer = require('multer');

const app = express();

// Set up multer for file upload handling
const upload = multer({ dest: 'uploads/' });

// Define a route for handling the image upload
app.post('/upload', upload.single('image'), (req, res) => {
  // Handle the uploaded file
  // Store the file on the server or perform any other required operations
  const image = req.file;
  console.log('Uploaded image:', image);

  // Send a response back to the client
  res.send('Image uploaded successfully');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
