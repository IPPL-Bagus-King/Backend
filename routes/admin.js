const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authenticateUser');
const authAdmin = require('../middleware/authorizeAdmin');

// route approve teacher
router.patch(
  '/pending-teacher/:teacherId',
  auth,
  authAdmin,
  adminController.updateTeacherStatus
);

// route get pending teacher
router.get(
  '/pending-teacher',
  auth,
  authAdmin,
  adminController.getPendingTeachers
);

module.exports = router;
