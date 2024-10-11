const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentcon');

// POST route for creating payments
router.post('/payment', paymentController.processPayment);

// GET route to fetch all payments
router.get('/payment-details', paymentController.getAllPayments);

module.exports = router;
