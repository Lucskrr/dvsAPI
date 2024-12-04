const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Cart extends Model {}

  Cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
    },
    { sequelize, modelName: 'Cart' }
  );

  Cart.associate = (models) => {
    Cart.hasMany(models.cartProduct, { foreignKey: 'cartId' });
  };

  return Cart;
};
