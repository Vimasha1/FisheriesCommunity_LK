import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';  // Assuming you have a Header component
import SideNav from '../../SideNav';  // Assuming you have a SideNav component
import UserNav from './UserNav';  // Importing UserNav component
import Footer from '../../Footer';  // Assuming you have a Footer component

const PaymentGateway = () => {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [memberName, setMemberName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const isValidCvv = (cvv) => /^\d{3}$/.test(cvv);
  const isValidCardNumber = (cardNumber) => /^\d{12}$/.test(cardNumber);
  const isValidPhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
  const isValidAmount = (amount) => /^\d+(\.\d{0,2})?$/.test(amount) && parseFloat(amount) > 0;
  const isValidExpiryDate = (expiryDate) => {
    const [month, year] = expiryDate.split('/');
    if (month && year && /^\d{2}$/.test(month) && /^\d{2}$/.test(year)) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = parseInt(currentDate.getFullYear().toString().slice(-2));

      const monthInt = parseInt(month, 10);
      const yearInt = parseInt(year, 10);

      if (monthInt >= 1 && monthInt <= 12) {
        if (yearInt > currentYear || (yearInt === currentYear && monthInt >= currentMonth)) {
          return true;
        }
      }
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidAmount(amount)) {
      alert('Please enter a valid amount.');
      return;
    }
    if (!isValidCardNumber(cardNumber)) {
      alert('Please enter a valid 12-digit card number.');
      return;
    }
    if (!isValidExpiryDate(expiryDate)) {
      alert('Please enter a valid expiry date in MM/YY format.');
      return;
    }
    if (!isValidCvv(cvv)) {
      alert('Please enter a valid 3-digit CVV.');
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      alert('Please enter a valid phone number.');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await axios.post('http://localhost:5005/api/payment', {
        amount,
        cardNumber,
        expiryDate,
        cvv,
        memberName,
        phoneNumber,
      });

      alert('Payment successful!');
      navigate('/payment-details');
    } catch (error) {
      console.error('Error making payment', error);
      alert('Payment failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setAmount('');
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setMemberName('');
    setPhoneNumber('');
  };

  const handleBack = () => {
    navigate('/community-member');
  };

  return (
    <div className="flex">
      <SideNav />  {/* Side Navigation */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <Header />  {/* Header */}
        <UserNav />  {/* User Navigation */}

        <div className="min-h-screen flex items-center justify-center">
          <div className="payment-gateway w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Payment Gateway</h2>
            <form onSubmit={handleSubmit}>
              {/* Amount */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                  placeholder="Enter amount"
                  required
                />
              </div>
              {/* Card Number */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                  placeholder="1234 5678 9012"
                  maxLength={12}
                  required
                />
              </div>
              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
              {/* Member Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Member Name</label>
                <input
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                  placeholder="Member Name"
                  required
                />
              </div>
              {/* Phone Number */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
                  placeholder="077 777 7777"
                  required
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 shadow-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200 shadow-lg"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-200 shadow-lg"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>

        <Footer />  {/* Footer */}
      </div>
    </div>
  );
};

export default PaymentGateway;
