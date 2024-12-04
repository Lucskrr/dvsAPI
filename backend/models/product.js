const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {}
  
  Product.init(
    {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'Product' }
  );

  return Product;
};
