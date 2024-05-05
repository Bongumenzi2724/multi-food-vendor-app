const router=require('express').Router()
const user_controller = require('../controllers/user_controller');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')

router.post('/',verifyTokenAndAuthorization,user_controller.getUser);
router.delete('/delete',verifyTokenAndAuthorization,user_controller.deleteUser);
router.get('/verify/:otp',verifyTokenAndAuthorization,user_controller.verify_account);
router.get('/verify_phone/:phone',verifyTokenAndAuthorization,user_controller.verify_phone);

module.exports=router