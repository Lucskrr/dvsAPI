// models/cart.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        }
    });

    Cart.associate = (models) => {
        Cart.belongsToMany(models.Product, {
            through: 'CartProduct',
            as: 'products',
            foreignKey: 'cartId'
        });
    };

    // Método para atualizar o total do carrinho
    Cart.prototype.updateTotal = async function() {
        const products = await this.getProducts(); // Método gerado automaticamente pelo Sequelize
        let total = 0;

        products.forEach(product => {
            total += product.preco * product.CartProduct.quantity; // Supondo que o campo 'preco' exista no modelo 'Product'
        });

        this.total = total;
        await this.save();
    };

    // Método para adicionar um produto ao carrinho
    Cart.prototype.addProductToCart = async function(productId, quantity) {
        const product = await models.Product.findByPk(productId);
        if (!product) {
            throw new Error('Produto não encontrado');
        }

        const cartProduct = await models.CartProduct.create({
            cartId: this.id,
            productId: product.id,
            quantity,
            priceAtTheTime: product.preco // Armazenando o preço no momento da adição
        });

        await this.updateTotal();
        return cartProduct;
    };

    return Cart;
};
