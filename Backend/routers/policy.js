const router = require('express').Router();
const policyCtrler = require('../controllers/policy')

router.post('/update', policyCtrler.update)
router.post('/add', policyCtrler.addPolicy)
router.get('/:actuatorID', policyCtrler.getActuatorPolicy)

module.exports = router