const express = require('express');
const router = express.Router();
const shoppingCartController = require('../controllers/shoppingCartController');


router.get('/:userId', shoppingCartController.getShoppingCartByUser);

router.post('/:userId', shoppingCartController.addProductToCart);

router.delete('/:userId/:productId', shoppingCartController.removeProductFromCart);

module.exports = router;
