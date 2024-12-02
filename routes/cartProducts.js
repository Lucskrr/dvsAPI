// routes/cartProducts.js

const express = require('express');
const router = express.Router();
const cartProductController = require('../controllers/cartProductController');

router.post('/add', cartProductController.addProductToCart);
router.delete('/remove/:cartId/:productId', cartProductController.removeProductFromCart);
router.get('/cart/:cartId', cartProductController.getCartProducts);

module.exports = router;
