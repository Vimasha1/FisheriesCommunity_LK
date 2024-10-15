// controllers/paymentController.js
const Paymoney = require('../Model/paymoney');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { name, email, mobileNumber, paymentAmount } = req.body;

    const newPayment = new Paymoney({
      name,
      email,
      mobileNumber,
      paymentAmount,
    });

    const savedPayment = await newPayment.save();
    res.status(201).json({ message: 'Payment successful', payment: savedPayment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment', details: error.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Paymoney.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payments', details: error.message });
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Paymoney.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve payment', details: error.message });
  }
};

// Update a payment by ID
const updatePaymentById = async (req, res) => {
  try {
    const updatedPayment = await Paymoney.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment updated successfully', payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment', details: error.message });
  }
};

// Delete a payment by ID
const deletePaymentById = async (req, res) => {
  try {
    const deletedPayment = await Paymoney.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete payment', details: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
