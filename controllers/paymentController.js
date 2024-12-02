// controllers/paymentController.js
class PaymentController {
    constructor(PaymentService) {
        this.paymentService = PaymentService;
    }

    async processCreditCardPayment(req, res) {
        const { userId } = req.body;
        try {
            const payment = await this.paymentService.processPayment(userId, 'credit_card');
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: 'Error processing credit card payment' });
        }
    }

    async processPixPayment(req, res) {
        const { userId } = req.body;
        try {
            const payment = await this.paymentService.processPayment(userId, 'PIX');
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: 'Error processing PIX payment' });
        }
    }

    async getPaymentStatus(req, res) {
        const { transactionId } = req.params;
        try {
            const payment = await this.paymentService.getPaymentStatus(transactionId);
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching payment status' });
        }
    }
}

module.exports = PaymentController;
