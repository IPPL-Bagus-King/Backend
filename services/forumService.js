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

  if (!materials || materials.length === 0) {
    throw new Error('No materials found for the specified forum.');
  }

  return materials;
};

// service untuk delete materi
const deleteMaterial = async (materialId) => {
  const material = await Material.findByPk(materialId);

  if (!material) {
    throw new Error('Material not found');
  }

  // Hapus materi, MaterialFiles akan ikut terhapus karena cascade
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
};
