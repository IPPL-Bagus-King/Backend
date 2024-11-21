var express = require('express');
var router = express.Router();
const auth = require('../middleware/authenticateUser')
const authStudent = require('../middleware/authorizeStudent')
const checkoutController = require('../controllers/checkoutController')

router.post(
    '/', 
    auth,
    authStudent,
    checkoutController.checkoutProductController
);

router.post(
    '/notification', 
    checkoutController.notificationController
);

module.exports = router;