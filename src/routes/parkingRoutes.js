const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.get('/top/free', parkingController.getTop4FreeParkingLots);
router.post('/create', parkingController.createParkingLot);
router.get('/get/parkinglost', parkingController.getAllParkingLots);

module.exports = router;