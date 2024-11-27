const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const auth = require('../middleware/authenticateUser');
const authTeacher = require('../middleware/authorizeTeacher');

// route create forum
router.post('/', auth, authTeacher, forumController.createForum);

// route get forums
router.get('/', forumController.getForums);

// route get forums by teacher id
router.get(
  '/teacher-forums',
  auth,
  authTeacher,
  forumController.getForumsByTeacherId
);

// route update forum
router.put('/:id', auth, authTeacher, forumController.updateForum);

// route delete forum
router.delete('/:id', auth, authTeacher, forumController.deleteForum);

module.exports = router;
