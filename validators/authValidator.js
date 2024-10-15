const Joi = require('joi');

// Schema validasi untuk register
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email cannot be empty',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password cannot be empty',
  }),
  name: Joi.string().required().messages({
    'string.empty': 'Name cannot be empty',
  }),
  phone_number: Joi.string()
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must be a valid number', // Pesan khusus untuk pola yang tidak sesuai
    }),
  role: Joi.string().valid('teacher', 'student', 'admin').required().messages({
    'any.only': 'Role must be one of [teacher, student, admin]',
    'string.empty': 'Role cannot be empty',
  }),
});

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateRegister,
};
