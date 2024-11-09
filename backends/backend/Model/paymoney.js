// models/Payment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymoneySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const paymoney = mongoose.model('paymoney', paymoneySchema);
module.exports = paymoney;
