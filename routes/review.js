var express = require('express');
var router = express.Router();
const auth = require('../middleware/authenticateUser')
const authStudent = require('../middleware/authorizeStudent')
const reviewController = require('../controllers/reviewController')

router.post(
    '/', 
    auth,
    authStudent,
    reviewController.addReview
);

router.delete(
    '/',
    auth,
    authStudent,
    reviewController.deleteReview
)

router.get(
    '/:id',
    auth,
    reviewController.getReview
)

router.get(
    '/',
    reviewController.getAllReview
)

router.put(
    '/',
    auth,
    authStudent,
    reviewController.updateReview
)

module.exports = router;