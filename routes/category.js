const router=require('express').Router()
const category_controller = require('../controllers/category_controller')

router.post('/',category_controller.createCategory);
router.get('/',category_controller.getAllCategories);
router.get('/random',category_controller.getRandomCategories);

module.exports=router