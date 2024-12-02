// routes/cart.js
var express = require('express');
var router = express.Router();
var CartController = require('../controllers/cartController');
var CartService = require('../services/cartProductService');
var CartProductService = require('../services/cartProductService');

// Injeção de dependências
var cartController = new CartController(new CartService(), new CartProductService());

router.post('/create', cartController.createCart.bind(cartController));
router.post('/add', cartController.addProduct.bind(cartController));
router.delete('/remove/:cartId/:productId', cartController.removeProduct.bind(cartController));
router.get('/cart', cartController.getCart.bind(cartController));

module.exports = router;
