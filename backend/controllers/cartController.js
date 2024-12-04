const cartService = require('../services/cartService');

// Adicionar produto ao carrinho
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Obtém o userId diretamente do token JWT

    try {
        // Verifica se o carrinho do usuário já existe
        let cart = await cartService.getCartByUserId(userId);
        if (!cart) {
            // Caso não tenha um carrinho, cria um novo
            cart = await cartService.createCart(userId);
        }

        // Verifica se o produto já está no carrinho
        const existingItem = await cartService.findCartItem(cart.id, productId);
        if (existingItem) {
            // Caso o produto já exista, apenas atualiza a quantidade
            const updatedItem = await cartService.updateQuantity(existingItem.id, existingItem.quantity + quantity);
            return res.status(200).json({ message: 'Quantidade do produto atualizada', cart });
        }

        // Adiciona o produto ao carrinho
        const { cart: updatedCart, message } = await cartService.addToCart(userId, productId, quantity);
        res.status(201).json({ message, cart: updatedCart });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Visualizar o carrinho
const viewCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await cartService.viewCart(userId);
    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar a quantidade do item no carrinho
const updateQuantity = async (req, res) => {
  const { cartProductId } = req.params;
  const { quantity } = req.body;

  try {
    const { cart, message } = await cartService.updateQuantity(cartProductId, quantity);
    res.status(200).json({ message, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remover item do carrinho
const removeItem = async (req, res) => {
  const { cartProductId } = req.params;

  try {
    const { cart, message } = await cartService.removeItem(cartProductId);
    res.status(200).json({ message, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Limpar o carrinho
const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const { message } = await cartService.clearCart(userId);
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addToCart,
  viewCart,
  updateQuantity,
  removeItem,
  clearCart,
};
