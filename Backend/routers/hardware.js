const express = require('express');
const router = express.Router();
const hardwareService = require('../controllers/hardware')

router.get('/:username/:feedKey', hardwareService.toggle);
router.get('/all', hardwareService.getAll)

module.exports = router;