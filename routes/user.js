const router=require('express').Router()
const user_controller = require('../controllers/user_controller');

router.post('/',user_controller.getUser);
router.delete('/delete',user_controller.deleteUser);
router.get('/verify/:otp',user_controller.verify_account);
router.get('/verify/:phone',user_controller.verify_phone);

module.exports=router