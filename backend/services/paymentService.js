// services/paymentService.js
class PaymentService {
    constructor(PaymentModel, CartModel, CartProductModel) {
        this.Payment = PaymentModel;
        this.Cart = CartModel;
        this.CartProduct = CartProductModel;
    }

    async processPayment(userId, paymentMethod) {
        try {
            const cart = await this.Cart.findOne({ where: { userId }, include: 'products' });
            if (!cart) throw new Error('Cart not found');
            
            const totalAmount = cart.total;
            if (totalAmount <= 0) throw new Error('Cart is empty');

            // Create payment
            const payment = await this.Payment.create({
                userId,
                totalAmount,
                paymentMethod,
                status: 'pending'
            });

            // Simulating payment process (for credit card/PIX)
            // In a real-world application, you'd integrate with an actual payment gateway.
            payment.status = 'completed'; // Simulate successful payment
            await payment.save();

            // Clear the cart after successful payment
            await this.CartProduct.destroy({ where: { cartId: cart.id } });
            cart.total = 0;
            await cart.save();

            return payment;
        } catch (error) {
            throw error;
        }
    }

    async getPaymentStatus(transactionId) {
        try {
            const payment = await this.Payment.findByPk(transactionId);
            if (!payment) throw new Error('Payment not found');
            return payment;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentService;
