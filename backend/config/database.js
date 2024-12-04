const { Sequelize } = require('sequelize');
const config = require('./config.json');

// Obtém a configuração para o ambiente atual
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Cria a instância do Sequelize com base na configuração
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

module.exports = sequelize; // Exporte apenas a instância sequelize
