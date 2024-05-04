const router=require('express').Router()
const foods_controller = require('../controllers/foods_controller');
router.post('/',foods_controller.addFood);
router.get('/recommendation/:code',foods_controller.getRandomFood);
router.get('/:id',foods_controller.getFoodById);
router.get('/:category/:code',foods_controller.getFoodsByCategoryAndCode);
router.get('/restaurant-foods/:id',foods_controller.getFoodsByRestaurant);
router.get('/search/:search',foods_controller.searchFoods);

module.exports=router