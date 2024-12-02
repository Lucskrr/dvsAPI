'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Criação da tabela CartProducts
    await queryInterface.createTable('CartProducts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      cartId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      priceAtTheTime: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Adicionar chaves estrangeiras, verificando se as colunas existem
    const columns = await queryInterface.describeTable('CartProducts');
    
    if (!columns.cartId) {
      await queryInterface.addConstraint('CartProducts', {
        fields: ['cartId'],
        type: 'foreign key',
        name: 'fk_cart_id',
        references: {
          table: 'Carts',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }

    if (!columns.productId) {
      await queryInterface.addConstraint('CartProducts', {
        fields: ['productId'],
        type: 'foreign key',
        name: 'fk_product_id',
        references: {
          table: 'Products',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Caso precise reverter a migração, removendo a tabela
    await queryInterface.dropTable('CartProducts');
  }
};
