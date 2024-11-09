const Payment = require('../Model/payment');

// Handle payment processing (POST)
const processPayment = async (req, res) => {
  try {
    const { amount, cardNumber, expiryDate, cvv, memberName, phoneNumber } = req.body;

    const payment = new Payment({
      amount,
      cardNumber,
      expiryDate,
      cvv,
      memberName,
      phoneNumber
    });

    await payment.save();

    res.status(200).json({ success: true, message: 'Payment processed successfully!' });
  } catch (error) {
    console.error('Error processing payment', error);
    res.status(500).json({ error: 'Payment processing error' });
  }
};

// Fetch all payments (GET)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments', error);
    res.status(500).json({ error: 'Error fetching payments' });
  }
};

module.exports = {
  processPayment,
  getAllPayments,
};
