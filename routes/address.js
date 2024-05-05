const router=require('express').Router()
const address_controller = require('../controllers/address_controller')
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')

router.post('/',verifyTokenAndAuthorization,address_controller.addAddress);

router.get('/default',verifyTokenAndAuthorization,address_controller.getDefaultAddress);

router.get('/default/all',verifyTokenAndAuthorization,address_controller.getAddresses);

router.delete('/:id',verifyTokenAndAuthorization,address_controller.deleteAddress);

router.patch('/default/:id',verifyTokenAndAuthorization,address_controller.setDefaultAddress);

module.exports=router