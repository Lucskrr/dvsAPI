const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CartProduct extends Model {}

  CartProduct.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Carts',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      priceAtTheTime: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    { sequelize, modelName: 'CartProduct' }
  );

  CartProduct.associate = (models) => {
    CartProduct.belongsTo(models.Cart, {
      foreignKey: 'cartId',
      as: 'cart',
    });
    CartProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };

  return CartProduct;
};
