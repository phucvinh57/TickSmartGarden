const router = require('express').Router();
const schedCtrler = require('../controllers/schedule')

router.get('/', schedCtrler.getSched)
router.put('/update', schedCtrler.updateSched)
router.post('/add', schedCtrler.createSched)
router.delete('/delete', schedCtrler.deleteSched)

module.exports = router