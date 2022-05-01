const router = require('express').Router();
const gardenCtrler = require('../controllers/garden')

router.get('/', gardenCtrler.getList)
router.post('/new', gardenCtrler.create)

module.exports = router