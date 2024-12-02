// services/cartService.js
class CartService {
    constructor(Cart, CartProduct) {
        this.Cart = Cart;
        this.CartProduct = CartProduct;
    }

    async createCart(userId) {
        // Lógica para criar um carrinho
        const cart = await this.Cart.create({ userId });
        return cart;
    }

    async addProductToCart(cartId, productId, quantity) {
        // Lógica para adicionar produto ao carrinho
        const cartProduct = await this.CartProduct.create({ cartId, productId, quantity });
        return cartProduct;
    }

    async removeProductFromCart(cartId, productId) {
        // Lógica para remover produto do carrinho
        const cartProduct = await this.CartProduct.destroy({ where: { cartId, productId } });
        return cartProduct;
    }

    async getCartByUserId(userId) {
        // Lógica para obter o carrinho pelo userId
        const cart = await this.Cart.findOne({ where: { userId } });
        return cart;
    }
}

module.exports = CartService;
