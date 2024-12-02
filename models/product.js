// models/product.js
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        preco: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        estoque: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Product;
};
