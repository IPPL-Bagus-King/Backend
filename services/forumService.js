const { Forum } = require('../models');

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

module.exports = {
  createForum,
  getForums,
  getForumsByTeacherId,
  updateForum,
};
