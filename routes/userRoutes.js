const router = require('express').Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.post('/api/register', userController.register);
router.post('/api/login', userController.login);

module.exports = router;
