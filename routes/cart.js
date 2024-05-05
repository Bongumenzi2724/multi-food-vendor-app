const router=require('express').Router()
const cart_controller = require('../controllers/cart_controller');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken');

router.post('/',verifyTokenAndAuthorization,cart_controller.addProductToCart);

router.get('/decrement/:id',verifyTokenAndAuthorization,cart_controller.decrementProductQty);

router.delete('/delete/:id',verifyTokenAndAuthorization,cart_controller.removeCartItem);

router.get('/',verifyTokenAndAuthorization,cart_controller.getCart);

router.get('/count',verifyTokenAndAuthorization,cart_controller.getCartCount);

module.exports=router