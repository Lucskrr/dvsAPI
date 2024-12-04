'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
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
    fs
      .readdirSync(__dirname)
      .filter(file => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
        );
      })
      .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      });

    // Associações entre modelos (se existirem)
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    // Sincronizando o banco de dados em modo desenvolvimento (force: true para recriar as tabelas)
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({ force: false }).then(() => {
        console.log('Banco de dados sincronizado');
      }).catch((err) => {
        console.error('Erro ao sincronizar o banco de dados:', err);
      });
    }
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

module.exports = db;
