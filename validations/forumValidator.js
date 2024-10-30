const Joi = require('joi');

const createForumSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  teacher_id: Joi.number().required(),
});

const updateForumSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().min(0).optional(),
});

// Fungsi untuk memvalidasi input forum untuk create
const validateCreateForum = (forumData) => {
  const { error, value } = createForumSchema.validate(forumData);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

// Fungsi untuk memvalidasi input forum untuk update
const validateUpdateForum = (forumData) => {
  const { error, value } = updateForumSchema.validate(forumData);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

module.exports = {
  validateCreateForum,
  validateUpdateForum,
};
