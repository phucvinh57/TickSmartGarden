const router = require('express').Router();
const policyCtrler = require('../controllers/policy')

router.post('/update', policyCtrler.update)
router.post('/add', policyCtrler.addPolicy)
router.get('/:actuatorID', policyCtrler.getActuatorPolicy)
router.delete('/delete', policyCtrler.deletePolicy)

module.exports = router