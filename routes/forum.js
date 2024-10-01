const express = require('express');
const router = express.Router();
const { createForum } = require('../controllers/forumController');
const authenticateUser = require('../middleware/authenticateUser');
const authorizeTeacher = require('../middleware/authorizeTeacher');

// Rute POST untuk create forum
router.post('/', authenticateUser, authorizeTeacher, createForum);

module.exports = router;
