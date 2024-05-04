const router=require('express').Router()
const restuarant_controller = require('../controllers/restuarant_controller')

router.post('/',restuarant_controller.addRestuarant)
router.get('/:code',restuarant_controller.getRandomRestuarants)
router.get('/all/:code',restuarant_controller.getAllNearByRestuarant)
router.get('/byId/:id',restuarant_controller.getRestuarantById)

module.exports=router