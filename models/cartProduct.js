// models/cartProduct.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const CartProduct = sequelize.define('CartProduct', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cartId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Carts',
                key: 'id'
            }
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },
        priceAtTheTime: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: true
    });

    CartProduct.associate = (models) => {
        CartProduct.belongsTo(models.Cart, { foreignKey: 'cartId' });
        CartProduct.belongsTo(models.Product, { foreignKey: 'productId' });
    };

    return CartProduct;
};
