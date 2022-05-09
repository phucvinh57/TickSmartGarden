const express = require('express');
const router = express.Router();
const sensorCtrler = require('../controllers/sensor')

router.get('/:gardenID', sensorCtrler.getAllSensor);

module.exports = router;