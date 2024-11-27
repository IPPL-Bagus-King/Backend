const multer = require('multer');
const path = require('path');
const ensureDirectoryExists = require('./createDirectory');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve('uploads/materials/');
    ensureDirectoryExists(uploadPath); // Pastikan folder ada sebelum menyimpan file
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

module.exports = storage;
