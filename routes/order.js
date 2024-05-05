const router=require('express').Router()
const order_controller = require('../controllers/order_controller');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')

router.post('/',verifyTokenAndAuthorization,order_controller.placeOrder);
router.get('/',verifyTokenAndAuthorization,order_controller.getUserOrder);

module.exports=router