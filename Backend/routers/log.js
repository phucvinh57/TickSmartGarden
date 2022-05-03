const router = require('express').Router();
const logCtrler = require('../controllers/log')

router.get('/', logCtrler.get)
router.post('/create', logCtrler.createLog)

module.exports = router