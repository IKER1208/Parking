const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const authMiddleware = require('../middlewares/authMiddleware');

// router.post('/create', authMiddleware.authenticateJWT, authMiddleware.isAdmin, sensorController.createSensor);
router.post('/publish', sensorController.sendTopicMessage);
// router.put('/update-status', authMiddleware.authenticateJWT, authMiddleware.isAdmin, sensorController.updateSensorStatus);
router.get('/logs/:topic', sensorController.getTopicLogs);
router.get('/all', sensorController.getAllTopicsLogs);
router.get('/all-parking-lots', sensorController.getParkingLotsLogs);
module.exports = router;