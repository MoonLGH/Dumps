const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/images'),
  filename: (req, file, cb) => {
    // Generate a random filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Initialize multer upload
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/upload', upload.single('image'), (req, res) => {
  // Redirect back to the main page after successful upload
  res.redirect('/');
});

app.get('/getAllImages', (req, res) => {
  // Logic to fetch all uploaded images from the 'public/images' directory
  const fs = require('fs');
  const imageDir = path.join(__dirname, 'public/images');
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch images' });
    } else {
      files = files.filter(file => !file.startsWith('.')); // Filter out any hidden files
      res.json(files);
    }
  });
});

app.get('/imageGet', (req, res) => {
  const imageName = req.query.name;
  // Logic to fetch the image with the given filename from the 'public/images' directory
  const imagePath = path.join(__dirname, 'public/images', imageName);
  res.sendFile(imagePath);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
