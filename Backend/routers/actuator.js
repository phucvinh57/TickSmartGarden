const express = require('express');
const router = express.Router();
const actuatorService = require('../services/actuator')

router.get('/:username/:feedKey', actuatorService.toggle);

module.exports = router;