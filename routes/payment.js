// routes/payment.js
var express = require('express');
var router = express.Router();

const auth = require('../auth'); 
const db = require('../models'); 
const PaymentService = require('../services/paymentService');
const PaymentController = require('../controllers/paymentController');

const paymentService = new PaymentService(db.Payment, db.Cart, db.CartProduct);
const paymentController = new PaymentController(paymentService);


router.post('/credit-card', auth.verifyToken, (req, res) => paymentController.processCreditCardPayment(req, res));
router.post('/pix', auth.verifyToken, (req, res) => paymentController.processPixPayment(req, res));
router.get('/status/:transactionId', auth.verifyToken, (req, res) => paymentController.getPaymentStatus(req, res));

module.exports = router;
