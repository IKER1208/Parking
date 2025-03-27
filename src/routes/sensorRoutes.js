const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const authMiddleware = require('../middlewares/authMiddleware');

// router.post('/create', authMiddleware.authenticateJWT, authMiddleware.isAdmin, sensorController.createSensor);
router.post('/publish/', sensorController.sendTopicMessage);
// router.put('/update-status', authMiddleware.authenticateJWT, authMiddleware.isAdmin, sensorController.updateSensorStatus);
router.get('/logs/:topic', sensorController.getTopicLogs);
rxouter.get('/all', sensorController.getAllTopicsLogs);

module.exports = router;