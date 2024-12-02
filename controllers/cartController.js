// controllers/cartController.js
class CartController {
    constructor(CartService, CartProductService) {
        this.cartService = CartService;
        this.cartProductService = CartProductService;
    }

    // Método para criar um novo carrinho
    async createCart(req, res) {
        const { userId } = req.body; // Extraia userId do corpo da requisição
        try {
            const cart = await this.cartService.createCart(userId);
            res.status(201).json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Error creating cart' });
        }
    }

    // Adicionar produto ao carrinho
    async addProduct(req, res) {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Pegar o userId do token JWT decodificado
    
        if (!userId) {
            return res.status(400).json({ message: "User ID não encontrado no token" });
        }
    
        try {
            // Adiciona o produto ao carrinho
            const result = await this.cartProductService.addProductToCart(userId, productId, quantity);

            // Atualizar o total do carrinho após adicionar o produto
            const cart = await this.cartService.getCart(userId);
            await cart.updateTotal(); // Chama o método updateTotal para recalcular o total

            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao adicionar produto ao carrinho" });
        }
    }

    // Remover produto do carrinho
    async removeProduct(req, res) {
        const { cartId, productId } = req.params;
        try {
            const result = await this.cartProductService.removeProductFromCart(cartId, productId);

            // Atualizar o total do carrinho após remover o produto
            const cart = await this.cartService.getCart(cartId);
            await cart.updateTotal(); // Chama o método updateTotal para recalcular o total

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao remover produto do carrinho' });
        }
    }

    // Obter carrinho
    async getCart(req, res) {
        const { userId } = req.query;
        try {
            const cart = await this.cartService.getCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar carrinho' });
        }
    }
}

module.exports = CartController;
