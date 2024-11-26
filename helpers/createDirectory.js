const fs = require('fs');
const path = require('path');

// Fungsi untuk memastikan direktori ada
const ensureDirectoryExists = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true }); // Membuat folder beserta sub-foldernya
  }
};

module.exports = ensureDirectoryExists;
