const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// ruta para obtener el historial de datos de un sensor
router.get('/history/:sensor_name', dataController.getHistoryData);

// ruta para obtener el historial de datos de todos los sensores
router.get('/all-history', dataController.getAllHistoryData);

module.exports = router;
