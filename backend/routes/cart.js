const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Adicionar produto ao carrinho
router.post('/add-to-cart', cartController.addToCart);

// Visualizar o carrinho
router.get('/view-cart/:userId', cartController.viewCart);

// Atualizar a quantidade do item no carrinho
router.put('/update-quantity/:cartProductId', cartController.updateQuantity);

// Remover item do carrinho
router.delete('/remove-item/:cartProductId', cartController.removeItem);

// Limpar o carrinho (remover todos os itens)
router.delete('/clear-cart/:userId', cartController.clearCart);

module.exports = router;
