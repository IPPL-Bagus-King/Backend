var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get(
  '/:id',
  userController.getUserID
)

module.exports = router;
