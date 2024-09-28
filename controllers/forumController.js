const { validationResult } = require("express-validator");
const forumService = require("../services/forumService");
const { createForumValidation } = require("../requests/forumRequest"); // Import validasi

// Controller untuk create forum
const createForum = [
  createForumValidation, // Tambahkan validasi request

  async (req, res) => {
    const errors = validationResult(req);

    // Cek apakah ada error dari validasi
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, price, rating } = req.body;
      const newForum = await forumService.createForum({
        name,
        description,
        price,
        rating,
      });

      res.status(201).json({
        message: "Forum created successfully",
        data: newForum,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while creating the forum",
        error: error.message,
      });
    }
  },
];

module.exports = {
  createForum,
};
