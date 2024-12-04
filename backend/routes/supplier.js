// ./routes/supplier.js
const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { verifyToken } = require('../auth');  // Usando o middleware de autenticação

// Rota para listar fornecedores
router.get('/', verifyToken, supplierController.getAllSuppliers);

// Rota para criar fornecedor
router.post('/', verifyToken, supplierController.createSupplier);

// Rota para editar fornecedor
router.put('/:id', verifyToken, supplierController.updateSupplier);

// Rota para excluir fornecedor
router.delete('/:id', verifyToken, supplierController.deleteSupplier);

module.exports = router;
