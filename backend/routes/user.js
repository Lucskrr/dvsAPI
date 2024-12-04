var express = require('express');
var router = express.Router();
const auth = require('../auth'); // Carregar os objetos do auth.js

// Carregando os modelos
const db = require('../models');

// Carregando as classes service e controller da user
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

// Instanciando as classes
const userService = new UserService(db.User);
const userController = new UserController(userService);

// Rota para login
router.post('/login', async (req, res) => {
  userController.login(req, res);
});

// Rota para registrar novo usuário
router.post('/novouser', async (req, res) => {
  userController.createUser(req, res);
});

// Rota para retornar todos os usuários
router.get('/allusers', auth.verifyToken, async (req, res) => {
  userController.findAllUsers(req, res);
});

// Rota para retornar um usuário pelo id
router.get('/getuserbyid', async (req, res) => {
  userController.findUserById(req, res);
});

module.exports = router;
