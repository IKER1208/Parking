const express = require('express');
const router = express.Router();
const { getFeedData, getAllFeeds, sendData } = require('../controllers/adafruitController');

router.get('/get-adafruit-feed/:feedName', getFeedData);
router.get('/get-adafruit-all-feeds', getAllFeeds);
router.post('/send-adafruit-data', sendData);

module.exports = router;
