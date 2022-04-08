const router = require('express').Router();
const gardenCtrler = require('../controllers/garden')

router.get('/', gardenCtrler.getList)

module.exports = router