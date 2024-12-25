const { Checkout, Review } = require('../models');
const { validateCreateReview, validateUpdateReview } = require('../validations/reviewValidator');

// user_id	forum_id	rating	comment	
exports.addReview = async (req, res) => {
    const id_user = req.user.id;
    const { forum_id, comment, rating } = req.body;

    const user = await Checkout.findOne({
        where: {
          id_user,
          id_forum: forum_id,
          status: "settlement",
        },
    })

    if (!user) {
        return {
            status: 404,
            message: "User tidak terdaftar didalam forum!"
        }
    }

    const reviews = await Review.findOne({
        where: {
            user_id: id_user,
            forum_id
        }
    })

    if (reviews){
        return {
            status: 400,
            message: "User sudah melakukan review pada forum ini!"
        }
    }

    const reviewData = {
        user_id: id_user,
        forum_id, 
        comment, 
        rating,
    };
    try {
        const validatedReviewData = validateCreateReview(reviewData);
        const newRewview = await Review.create(validatedReviewData);
        return {
            status: 200,
            data: newRewview,
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

exports.deleteReview = async (req, res) => {
    const user_id = req.user.id;
    const forum_id = req.body.forum_id;

    const review = await Review.findOne({
        where: {
          user_id,
          forum_id
        },
    })

    if (!review){
        return {
            status: 404,
            message: "Review user pada forum ini tidak ditemukan!"
        }
    }

    review.destroy()
    return {
        status: 200,
        message: "Delete Review Success"
    }
}

exports.getReview = async (req, res) => {
    const forum_id = req.params;

    const allReview = await Review.findAll({ forum_id })

    console.log(allReview);
    if (!allReview || allReview.length === 0) {
        return {
            status: 404, 
            message: "Review untuk forum ini tidak ditemukan!"
        }
    }

    const totalRating = allReview.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / allReview.length).toFixed(1);


    return {
        status: 200,
        averageRating,
        data: allReview,
    }
}

exports.updateReview = async (req, res) => {
    const user_id = req.user.id;
    const { forum_id, comment, rating } = req.body;

    const review = await Review.findOne({
        where: {
            user_id, 
            forum_id
        }
    });
    if (!review) {
        return {
            status: 404, 
            message: "review not found"
        }
    }

    const reviewData = {
        user_id,
        forum_id, 
        comment, 
        rating,
    };

    try {
        const updatedData = validateUpdateReview(reviewData);
        await review.update(updatedData);
        return {
            status: 200,
            message: "success update data!",
            data: updatedData
        }
    } catch (error) {
        return {
            status: 500, 
            message: error.message
        }
    }
}

exports.getAllReview = async (req, res) => {
    const allReview = await Review.findAll();

    if (!allReview || allReview.length === 0) {
        return {
            status: 404, 
            message: "Review tidak ditemukan!"
        }
    }

    return {
        status: 200,
        data: allReview,
    }
}