const express = require("express");
const router = express.Router();
const { createForum } = require("../controllers/forumController");

// Rute POST untuk create forum
router.post("/", createForum);

module.exports = router;
