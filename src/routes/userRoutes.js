const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/users', authMiddleware.authenticateJWT, authMiddleware.isAdmin, userController.getAllUsers);
router.post('/get/user', authMiddleware.authenticateJWT, authMiddleware.isClientOrAdmin, userController.getUserById);

module.exports = router;