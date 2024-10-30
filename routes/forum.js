const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authenticateUser = require('../middleware/authenticateUser');
const authorizeTeacher = require('../middleware/authorizeTeacher');

// route create forum
router.post(
  '/',
  authenticateUser,
  authorizeTeacher,
  forumController.createForum
);

// route get forums
router.get('/', authenticateUser, forumController.getForums);

// route get forums by teacher id
router.get(
  '/teacher-forums',
  authenticateUser,
  authorizeTeacher,
  forumController.getForumsByTeacherId
);

// route update forum
router.put(
  '/:id',
  authenticateUser,
  authorizeTeacher,
  forumController.updateForum
);

module.exports = router;
