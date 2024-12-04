// services/productService.js
class ProductService {
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }

    async create(data) {
        try {
            // Verificando se os dados são válidos
            if (!data.nome || !data.descricao || !data.preco || !data.estoque) {
                throw new Error('Campos obrigatórios estão faltando');
            }
    
            // Criar o produto
            const product = await this.ProductModel.create(data);
            return product; // Retorna o produto criado
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error; // Propaga o erro para o controller
        }
    }

    async findAll() {
        try {
            const products = await this.ProductModel.findAll();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const product = await this.ProductModel.findByPk(id);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            const [updated] = await this.ProductModel.update(data, { where: { id } });
            return updated ? this.findById(id) : null; // Retorna o produto atualizado ou null
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deleted = await this.ProductModel.destroy({ where: { id } });
            return deleted; // Retorna o número de linhas afetadas (0 ou 1)
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;
