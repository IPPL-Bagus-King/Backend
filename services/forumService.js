const { Forum, Material, MaterialFile } = require('../models');

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

const uploadMaterial = async (materialData, files) => {
  try {
    // Simpan data materi ke tabel Materials
    const material = await Material.create(materialData);

    // Simpan file-file yang diunggah ke tabel MaterialFiles
    const materialFiles = files.map((file) => ({
      material_id: material.id,
      file_url: file.path, // Path file yang diunggah
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

module.exports = {
  createForum,
  getForums,
  getForumsById,
  getForumsByTeacherId,
  updateForum,
  deleteForum,
  uploadMaterial,
};
