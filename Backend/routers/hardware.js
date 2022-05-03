const express = require('express');
const router = express.Router();
const hardwareCtrler = require('../controllers/hardware')

router.get('/:username/:feedKey', hardwareCtrler.toggle);
router.get('/all', hardwareCtrler.getAll)
router.get('/', hardwareCtrler.getById)
router.post('/update', hardwareCtrler.updateHardware)

module.exports = router;