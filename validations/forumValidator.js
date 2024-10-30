const Joi = require('joi');

// Membuat schema validasi dengan Joi
const forumSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10),
  price: Joi.number().required().min(0),
  rating: Joi.number().default(0), // Nilai default rating
  teacher_id: Joi.number().required(), // ID pengajar harus ada
});

// Fungsi untuk memvalidasi input forum
const validateForum = (forumData) => {
  const { error, value } = forumSchema.validate(forumData);
  if (error) {
    throw new Error(error.details[0].message); // Melempar error jika validasi gagal
  }
  return value; // Mengembalikan data yang tervalidasi jika sukses
};

module.exports = {
  validateForum,
};
