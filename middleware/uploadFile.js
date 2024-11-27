const multer = require('multer');
const storage = require('../helpers/fileStorageHelper');
const fileFilter = require('../helpers/fileFilterHelper');

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Maksimal 10MB per file
}).array('files', 10); // maksimal 10 files

const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message }); // Error dari multer
      }
      return res.status(400).json({ error: err.message }); // Error custom (filter file)
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    next(); // Lanjutkan ke controller jika berhasil
  });
};

module.exports = handleFileUpload;
