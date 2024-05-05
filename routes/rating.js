const router=require('express').Router()
const rating_controller = require('../controllers/rating_controller');
const {verifyTokenAndAuthorization}=require('../middleware/verifyToken')

router.post('/',verifyTokenAndAuthorization,rating_controller.addRating);
router.get('/',verifyTokenAndAuthorization,rating_controller.checkUserRating);

module.exports=router