const forumService = require('../services/forumService');
const {
  validateUpdateForum,
  validateCreateForum,
} = require('../validations/forumValidator');

const createForum = async (req, res) => {
  try {
    // Mengambil ID pengguna yang sedang login dari token atau session
    const teacherId = req.user.id; // req.user diisi oleh middleware yang mengautentikasi pengguna

    // Mempersiapkan data forum
    const createForumReq = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      picture: '/images/forum/' + Math.floor(Math.random() * 10) + '.png',
      teacher_id: teacherId, // ID pengajar dari user yang login
    };

    const validatedForumData = validateCreateForum(createForumReq);

    const newForum = await forumService.createForum(validatedForumData);

    return res.status(201).json({
      message: 'Successfully create a new forum!',
      data: newForum,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getForums = async (req, res) => {
  try {
    const forums = await forumService.getForums();

    return res.status(200).json({
      message: 'Successfully get forums data!',
      data: forums,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getForumsByTeacherId = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const forums = await forumService.getForumsByTeacherId(teacherId);
    return res.status(200).json({
      message: "Successfully get teacher's forum!",
      data: forums,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateForum = async (req, res) => {
  try {
    const forumId = req.params.id;

    const updateForumReq = req.body;

    // Cek apakah ada data yang dimasukkan
    if (!Object.keys(updateForumReq).length) {
      return res.status(400).json({ error: 'No data provided for update.' });
    }

    // Validasi data forum menggunakan forumValidator.js
    const validatedForumData = validateUpdateForum(updateForumReq);

    // Memanggil service untuk mengupdate forum dengan ID forum dari URL
    const updatedForum = await forumService.updateForum(
      forumId,
      validatedForumData
    );

    return res.status(200).json({
      message: 'Successfully update forum!',
      data: updatedForum,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteForum = async (req, res) => {
  try {
    const forumId = req.params.id; // Mengambil forumId dari parameter URL

    // Memanggil service untuk menghapus forum
    const result = await forumService.deleteForum(forumId);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createForum,
  getForums,
  getForumsByTeacherId,
  updateForum,
  deleteForum,
};
