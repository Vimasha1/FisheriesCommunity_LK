import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';  // Assuming you have a Header component
import SideNav from '../../SideNav';  // Assuming you have a SideNav component
import UserNav from './UserNav';  // Importing UserNav component
import Footer from '../../Footer';  // Assuming you have a Footer component

const PayMoney = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  useEffect(() => {
    // Fetch the total amount from localStorage
    const storedTotal = localStorage.getItem('totalAmount');
    setTotalAmount(parseFloat(storedTotal) || 0); // Fallback to 0 if no total is found
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();

    // Convert paymentAmount to a number for calculations
    const paymentValue = parseFloat(paymentAmount);

    // Check if entered amount exceeds totalAmount
    if (paymentValue > totalAmount) {
      alert('Not enough money to pay the loan.');
      return;
    }

    // Deduct payment from totalAmount and update localStorage
    const updatedTotal = totalAmount - paymentValue;
    setTotalAmount(updatedTotal);
    localStorage.setItem('totalAmount', updatedTotal.toFixed(2));

    // Prepare email content
    const emailBody = `
      Name: ${name}%0D%0A
      Mobile Number: ${mobileNumber}%0D%0A
      Payment Amount: LKR ${paymentAmount}%0D%0A
      Remaining Total: LKR ${updatedTotal.toFixed(2)}
    `;

    // Trigger email
    window.location.href = `mailto:${email}?subject=Payment Confirmation&body=${emailBody}`;

    // Reset form and show a success message
    alert(`Money gave: LKR ${paymentAmount}`);
    setName('');
    setEmail('');
    setMobileNumber('');
    setPaymentAmount('');
  };

  return (
    <div className="flex min-h-screen">
      <SideNav />  {/* Side Navigation */}
      <div className="ml-56 flex-grow flex flex-col bg-gradient-to-r from-blue-50 to-blue-100">
        <Header />  {/* Header */}
        <UserNav />  {/* User Navigation */}

        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-lg mt-10 bg-white p-8 rounded-lg shadow-md">
            {/* Total Amount Display - Fixed at the top right */}
            <div className="fixed top-50 right-6 bg-green-200 p-4 rounded-lg text-xl font-bold text-green-900 shadow-lg z-50">
              Total: LKR {totalAmount.toFixed(2)}
            </div>

            <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Pay Money</h2>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Amount</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
              >
                Pay
              </button>
            </form>
          </div>
        </div>
        <Footer /> {/* Footer */}
      </div>
    </div>
  );
};

export default PayMoney;
