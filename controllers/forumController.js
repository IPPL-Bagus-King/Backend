const forumService = require('../services/forumService');
const { validateForum } = require('../validations/forumValidator');

const createForum = async (req, res) => {
  try {
    // Mengambil ID pengguna yang sedang login dari token atau session
    const teacherId = req.user.id; // Asumsikan req.user diisi oleh middleware yang mengautentikasi pengguna

    // Mempersiapkan data forum
    const forumData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      rating: 0, // Nilai default untuk rating
      teacher_id: teacherId, // ID pengajar dari user yang login
    };

    // Validasi data forum menggunakan forumValidator.js
    const validatedForumData = validateForum(forumData);

    // Memanggil service untuk membuat forum
    const newForum = await forumService.createForum(validatedForumData);

    return res.status(201).json({
      message: 'Forum created successfully',
      data: newForum,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getForums = async (req, res) => {
  try {
    // Memanggil service untuk get forums
    const forums = await forumService.getForums();

    return res.status(200).json({
      message: 'Forums data retrieved successfully',
      data: forums,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createForum,
  getForums,
};
