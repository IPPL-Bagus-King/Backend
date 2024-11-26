const Joi = require('joi');

const createReviewSchema = Joi.object({
  user_id: Joi.number().required(),
  forum_id: Joi.number().required(),
  comment: Joi.string(),
  rating: Joi.number().required()
});

const updateForumSchema = Joi.object({
    user_id: Joi.number().required(),
    forum_id: Joi.number().required(),
    comment: Joi.string(),
    rating: Joi.number().required()
});

exports.validateCreateReview = (reviewData) => {
    const { error, value } = createReviewSchema.validate(reviewData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return value;
};

exports.validateUpdateReview = (updateData) => {
    const { error, value } = updateForumSchema.validate(updateData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return value;
}