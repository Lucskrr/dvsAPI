'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize'); // Importando Sequelize e DataTypes diretamente
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env]; // Carregando a configuração do banco de dados
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Testar a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Carregar os modelos após autenticação
    fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 && // Ignora arquivos ocultos
          file !== basename && // Ignora o próprio arquivo index.js
          file.slice(-3) === '.js' && // Apenas arquivos .js
          file.indexOf('.test.js') === -1 // Ignora arquivos de teste
        );
      })
      .forEach((file) => {
        // Adicionando log para verificar o carregamento de cada modelo
        console.log(`Carregando o modelo: ${file}`);
        const model = require(path.join(__dirname, file))(sequelize, DataTypes); // Passando DataTypes
        console.log(`Modelo carregado: ${model.name}`); // Logando o nome do modelo carregado
        db[model.name] = model; // Adicionando o modelo ao db
      });

    // Associações entre modelos (se existirem)
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db); // Associa os modelos
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize; // Adiciona o Sequelize ao db para poder ser utilizado em outros lugares
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = db;
