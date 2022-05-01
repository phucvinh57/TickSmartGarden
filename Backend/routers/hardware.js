const express = require('express');
const router = express.Router();
const hardwareCtrler = require('../controllers/hardware')

router.get('/:username/:feedKey', hardwareCtrler.toggle);
router.get('/all', hardwareCtrler.getAll)
router.get('/', hardwareCtrler.getById)
router.post('/new', hardwareCtrler.createSched)
router.put('/update', hardwareCtrler.updateSched)
router.delete('/', hardwareCtrler.deleteSched)

router.post('/log', hardwareCtrler.createLog)

module.exports = router;