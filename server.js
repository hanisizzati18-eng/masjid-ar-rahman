const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const ALLOWED = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// Serves index.html, style.css, and the images themselves
app.use(express.static(path.join(__dirname, 'public')));

// Returns the list of image filenames currently in public/images
app.get('/api/photos', (req, res) => {
  fs.readdir(IMAGES_DIR, (err, files) => {
    if (err) return res.json([]);
    const photos = files
      .filter((f) => ALLOWED.includes(path.extname(f).toLowerCase()))
      .sort();
    res.json(photos);
  });
});

app.listen(PORT, () => {
  console.log(`Gallery running at http://localhost:${PORT}`);
  console.log(`Add photos to: ${IMAGES_DIR}`);
});