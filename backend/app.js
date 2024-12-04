var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Importando o CORS

// Importando o Sequelize e os modelos
var { sequelize, User, Product, Cart, Supplier } = require('./models'); // Certifique-se de que está importando corretamente os modelos

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var productsRouter = require('./routes/product');
var cartRouter = require('./routes/cart');
var suppliersRouter = require('./routes/supplier');

// Importando o middleware de autenticação
const { verifyToken } = require('./auth'); // Certifique-se de que verifyToken é uma função

var app = express();

// Habilitando o CORS
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Definindo as rotas
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/product', productsRouter);
app.use('/cart', verifyToken, cartRouter);  
app.use('/supplier', verifyToken, suppliersRouter); 

// Sincronizando o Sequelize (em dev)
if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ force: false })  // O 'force: true' recria o banco, 'false' mantém as tabelas existentes
        .then(() => {
            console.log('Banco de dados sincronizado');
            // Após sincronizar o banco de dados, inicie o servidor
            app.listen(8080, () => {
                console.log('Aplicação rodando na porta 8080');
            });
        })
        .catch((error) => {
            console.error('Erro ao sincronizar o banco de dados:', error);
        });
} else {
    // Em produção, não usamos a sincronização automática, mas o servidor será iniciado diretamente.
    app.listen(8080, () => {
        console.log('Aplicação rodando na porta 8080');
    });
}

module.exports = app;
