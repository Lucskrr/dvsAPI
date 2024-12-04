var express = require('express');
var router = express.Router();

const auth = require('../auth'); 
const db = require('../models'); 
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const productService = new ProductService(db.Product);
const productController = new ProductController(productService);

router.post('/', auth.verifyToken, (req, res) => productController.createProduct(req, res));
router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/:id', (req, res) => productController.getProductById(req, res));
router.put('/:id', auth.verifyToken, (req, res) => productController.updateProduct(req, res));
router.delete('/:id', auth.verifyToken, (req, res) => productController.deleteProduct(req, res));

module.exports = router;
