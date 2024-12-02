// services/cartProductService.js
const { Cart, CartProduct, Product } = require('../models');

class CartProductService {
    async addProductToCart(userId, productId, quantity) {
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            throw new Error("Carrinho não encontrado");
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error("Produto não encontrado");
        }

        const existingCartProduct = await CartProduct.findOne({
            where: { cartId: cart.id, productId },
        });

        if (existingCartProduct) {
            existingCartProduct.quantity += quantity;
            existingCartProduct.priceAtTheTime = product.price;
            await existingCartProduct.save();
            return existingCartProduct;
        } else {
            const newCartProduct = await CartProduct.create({
                cartId: cart.id,
                productId,
                quantity,
                priceAtTheTime: product.price,
            });
            return newCartProduct;
        }
    }

    async removeProductFromCart(cartId, productId) {
        const cartProduct = await CartProduct.findOne({
            where: { cartId, productId },
        });

        if (!cartProduct) {
            throw new Error("Produto não encontrado no carrinho");
        }

        await cartProduct.destroy();
        return { message: "Produto removido com sucesso" };
    }
}

module.exports = CartProductService;
