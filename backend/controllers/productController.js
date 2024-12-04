const ProductService = require('../services/productService'); // Ajuste o caminho conforme necessário
const Product = require('../models/product'); // Ajuste para o nome correto do arquivo

class ProductController {
    constructor() {
        this.productService = new ProductService(Product); // Passa o modelo Product para o ProductService
    }

    // Método para criar um produto
    async createProduct(req, res) {
        try {
            const data = req.body;
            console.log('Dados recebidos no backend:', data); // Verificando os dados recebidos

            // Criar o produto usando o serviço
            const product = await this.productService.create(data);
            res.status(201).json(product); // Retorna o produto criado
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ message: 'Erro ao criar o produto', error: error.message });
        }
    }
    
    // Método para buscar todos os produtos
    async getAllProducts(req, res) {
        try {
            const products = await this.productService.findAll();
            res.status(200).json(products); // Retorna todos os produtos
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        }
    }

    // Método para buscar um produto por ID
    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await this.productService.findById(id);
            if (product) {
                res.status(200).json(product); // Retorna o produto encontrado
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    // Método para atualizar um produto
    async updateProduct(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedProduct = await this.productService.update(id, data);
            if (updatedProduct) {
                res.status(200).json(updatedProduct); // Retorna o produto atualizado
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    // Método para deletar um produto
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const success = await this.productService.delete(id);
            if (success) {
                res.status(200).json({ message: 'Produto deletado' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}

module.exports = ProductController;
