const router=require('express').Router()
const rating_controller = require('../controllers/rating_controller');
router.post('/',rating_controller.addRating);
router.get('/',rating_controller.checkUserRating);
module.exports=router