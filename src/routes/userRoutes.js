const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/app');

router.get('/users', authMiddleware.authenticateJWT, authMiddleware.authorizeOnlyAdmin, userController.getAllUsers);
router.post('/get/user', authMiddleware.authenticateJWT, authMiddleware.authorizeClientAndAdmin, userController.getUserById);

module.exports = router;