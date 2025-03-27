const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const authMiddleware = require('../middlewares/authMiddleware');

// router.post('/create', authMiddleware.authenticateJWT, authMiddleware.isAdmin, sensorController.createSensor);
// router.post('/assign', authMiddleware.authenticateJWT, authMiddleware.isAdmin, sensorController.assignSensorToParkingLot);
// router.put('/update-status', authMiddleware.authenticateJWT, authMiddleware.isAdmin, sensorController.updateSensorStatus);
router.get('/logs/:topic', sensorController.getSensorLogs);
// router.get('/all', authMiddleware.authenticateJWT, authMiddleware.isClientOrAdmin, sensorController.getAllSensors);

module.exports = router;