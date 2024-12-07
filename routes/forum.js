const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const auth = require('../middleware/authenticateUser');
const authTeacher = require('../middleware/authorizeTeacher');
const handleFileUpload = require('../middleware/uploadFile');

// route create forum
router.post('/', auth, authTeacher, forumController.createForum);

// route get forums
router.get('/', forumController.getForums);

// route get forum by id
router.get('/:id', auth, forumController.getForumsById);

// route get forums by teacher id
router.get(
  '/teacher-forums/:teacherId',
  auth,
  authTeacher,
  forumController.getForumsByTeacherId
);

// route update forum
router.put('/:id', auth, authTeacher, forumController.updateForum);

// route delete forum
router.delete('/:id', auth, authTeacher, forumController.deleteForum);

// route upload material
router.post(
  '/:forumId/materials',
  auth,
  authTeacher,
  handleFileUpload,
  forumController.uploadMaterial
);

// route get materials
router.get('/:forumId/materials', auth, forumController.getMaterials);

// route delete material
router.delete(
  '/materials/:materialId',
  auth,
  authTeacher,
  forumController.deleteMaterial
);

// route delete material file

router.delete(
  '/materials/file/:fileId',
  auth,
  authTeacher,
  forumController.deleteMaterialFile
);

module.exports = router;
