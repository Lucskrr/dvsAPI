// controllers/productController.js
class ProductController {
    constructor(ProductService) {
        this.productService = ProductService;
    }

    async createProduct(req, res) {
        const { nome, descricao, preco, estoque } = req.body;
        try {
            const newProduct = await this.productService.create({ nome, descricao, preco, estoque });
            res.status(201).json(newProduct);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Erro ao criar o produto' });
        }
    }
    
    async getAllProducts(req, res) {
        try {
            const products = await this.productService.findAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching products' });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await this.productService.findById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching product' });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedProduct = await this.productService.update(id, data);
            if (updatedProduct) {
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error updating product' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const success = await this.productService.delete(id);
            if (success) {
                res.status(200).json({ message: 'Product deleted' });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting product' });
        }
    }
}

module.exports = ProductController;
