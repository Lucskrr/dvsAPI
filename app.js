// app.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

// Sincronizando o Sequelize (em dev)
if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ alter: true }) // use 'force: true' para recriar as tabelas a cada inicialização (útil em dev)
        .then(() => {
            console.log('Banco de dados sincronizado');
        })
        .catch(err => {
            console.error('Erro ao sincronizar o banco de dados:', err);
        });
}

// Iniciar o servidor na porta 8080
var port = 8080;
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});

module.exports = app;
