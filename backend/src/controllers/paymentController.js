const paymentService = require('../services/paymentService');

exports.processPayment = async (req, res) => {
  try {
    const { orderId, paymentDetails } = req.body;
    const result = await paymentService.processPayment(orderId, paymentDetails);
    if (result.success) {
      res.json({ message: 'Payment processed successfully', transactionId: result.transactionId });
    } else {
      res.status(400).json({ message: 'Payment failed', error: result.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
