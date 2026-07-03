const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const ALLOWED = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

module.exports = (req, res) => {
  fs.readdir(IMAGES_DIR, (err, files) => {
    if (err) return res.status(200).json([]);
    const photos = files
      .filter((f) => ALLOWED.includes(path.extname(f).toLowerCase()))
      .sort();
    res.status(200).json(photos);
  });
};