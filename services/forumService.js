const { Forum, Material, MaterialFile } = require('../models');
const fs = require('fs').promises;
const path = require('path');

// Service untuk create forum
const createForum = async (forumData) => {
  try {
    // Menggunakan Sequelize untuk create forum di database
    const newForum = await Forum.create(forumData);
    return newForum;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service untuk get forums
const getForums = async (forumData) => {
  try {
    // Menggunakan Sequelize untuk get forums di database
    const forums = await Forum.findAll(forumData);
    return forums;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service untuk get forum berdasarkan id
const getForumsById = async (forumId) => {
  const forum = await Forum.findByPk(forumId);
  if (!forum) {
    throw new Error('Forum not found');
  }
  return forum;
};

// Service untuk get forum milik teacher
const getForumsByTeacherId = async (teacherId) => {
  try {
    const forums = await Forum.findAll({
      where: { teacher_id: teacherId },
    });
    return forums;
  } catch (error) {
    throw new Error(error.message);
  }
};

// service untuk update forum
const updateForum = async (forumId, updatedData) => {
  // Mencari forum berdasarkan ID
  const forum = await Forum.findByPk(forumId);
  if (!forum) {
    throw new Error('Forum not found');
  }

  // Mengupdate forum berdasarkan ID dengan data yang sudah divalidasi di controller
  await forum.update(updatedData);

  return forum;
};

// service untuk delete forum
const deleteForum = async (forumId) => {
  // Mencari forum berdasarkan ID
  const forum = await Forum.findByPk(forumId);
  if (!forum) {
    throw new Error('Forum not found');
  }

  // Menghapus forum berdasarkan ID
  await forum.destroy();

  return { message: 'Forum deleted successfully' };
};

// service untuk upload materi
const uploadMaterial = async (materialData, files) => {
  try {
    // Simpan data materi ke tabel Materials
    const material = await Material.create(materialData);

    // Simpan file-file yang diunggah ke tabel MaterialFiles
    const materialFiles = files.map((file) => ({
      material_id: material.id,
      file_url: file.filename, // Path file yang diunggah
    }));

    const createdFiles = await MaterialFile.bulkCreate(materialFiles, {
      returning: true, // Mengembalikan data yang baru dibuat
    });

    // Format data file tanpa material_id
    const filesRes = createdFiles.map((file) => ({
      id: file.id,
      file_url: file.file_url,
    }));

    return {
      ...material.toJSON(),
      files: filesRes,
    };
  } catch (error) {
    throw new Error('Error saving material: ' + error.message);
  }
};

// service untuk get materi dari forum
const getMaterials = async (forumId) => {
  try {

    const materials = await Material.findAll({
      where: { forum_id: forumId },
      include: [
        {
          model: MaterialFile,
          as: 'files',
          attributes: ['id', 'file_url'],
        },
      ],
    });
    return materials;
  } catch (error) {
    throw new Error(error.message);
  }
};

// service untuk delete materi
const deleteMaterial = async (materialId) => {
  // Cari materi berdasarkan materialId
  const material = await Material.findByPk(materialId, {
    include: {
      model: MaterialFile,
      as: 'files',
    }
  });

  if (!material) {
    throw new Error('Material not found');
  }

  // Hapus setiap file yang terkait dengan materi
  for (const file of material.files) {
    const filePath = path.join(__dirname, '../uploads/materials', file.file_url); // Sesuaikan dengan lokasi penyimpanan file

    try {
      // Hapus file dari server
      await fs.unlink(filePath);
      console.log(`File ${file.file_url} has been deleted from the server`);

      // Hapus file dari database
      await file.destroy();
      console.log(`File ${file.file_url} has been removed from the database`);
    } catch (error) {
      console.error(`Failed to delete file ${file.file_url}: `, error);
      // Lanjutkan meskipun satu file gagal dihapus
    }
  }

  // Hapus materi dari database
  await material.destroy();

  return { message: 'Material and its files have been deleted successfully' };
};


const deleteMaterialFile = async (fileId) => {
  const materialFile = await MaterialFile.findByPk(fileId);

  if (!materialFile) {
    throw new Error('Material file not found');
  }

  const filePath = path.join(__dirname, '../uploads/materials', materialFile.file_url);

  try {
    // Hapus file dari folder
    await fs.unlink(filePath);
    console.log(`File ${filePath} deleted successfully.`);
  } catch (err) {
    console.error(`Failed to delete file ${filePath}:`, err.message);
    throw new Error('Error deleting file from disk');
  }

  await materialFile.destroy();

  return { message: 'Material file deleted successfully' };
};

const getFilePath = async (filename) => {
  const filePath = path.join(__dirname, '../uploads/materials', filename); // Sesuaikan folder penyimpanan

  try {
    // fs.access untuk memeriksa keberadaan file
    await fs.access(filePath);
    return filePath;
  } catch (error) {
    throw new Error('File not found');
  }
};

module.exports = {
  createForum,
  getForums,
  getForumsById,
  getForumsByTeacherId,
  updateForum,
  deleteForum,
  uploadMaterial,
  getMaterials,
  deleteMaterial,
  deleteMaterialFile,
  getFilePath
};
