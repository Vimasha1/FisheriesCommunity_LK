import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Header from '../../Header'; // Assuming you have a Header component
import SideNav from '../../SideNav'; // Assuming you have a SideNav component
import UserNav from './UserNav'; // Importing UserNav component
import Footer from '../../Footer'; // Assuming you have a Footer component

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/payment-details');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payment details', error);
      }
    };

    fetchPayments();
  }, []);

  // Calculate total amount
  const totalAmount = payments.reduce((total, payment) => total + parseFloat(payment.amount), 0).toFixed(2);

  // Handle PDF download
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Payment Details', 14, 16);
    doc.autoTable({
      startY: 22,
      head: [['Amount', 'Member Name', 'Phone Number', 'Date']],
      body: payments.map(payment => [
        payment.amount,
        payment.memberName,
        payment.phoneNumber,
        new Date(payment.date).toLocaleDateString()
      ]),
    });
    doc.text(`Total Amount: LKR ${totalAmount}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save('payment-details.pdf');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SideNav /> {/* Side Navigation */}
      <div className="ml-56 flex-grow flex flex-col bg-gradient-to-r from-blue-50 to-blue-100">
        <Header /> {/* Header */}
        <UserNav /> {/* User Navigation */}

        <div className="payment-details max-w-6xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg flex-grow">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Payment Details</h2>
          {payments.length === 0 ? (
            <div className="text-center text-gray-500">No payment details found.</div>
          ) : (
            <>
              <table className="min-w-full bg-white divide-y divide-gray-200 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map(payment => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">LKR {payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.memberName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{payment.phoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(payment.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handleDownload}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-200 shadow-md"
                >
                  Download PDF
                </button>
                <Link to="/community-member">
                  <button
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-200 shadow-md"
                  >
                    Back
                  </button>
                </Link>
              </div>

              <div className="text-center mt-8 text-lg text-blue-700 font-bold">
                <strong>Total Amount:</strong> LKR {totalAmount}
              </div>
            </>
          )}
        </div>

        {/* Adding padding to push footer down */}
        <div className="mt-auto pb-12" /> {/* Extra space before Footer */}

        <Footer /> {/* Footer */}
      </div>
    </div>
  );
};

export default PaymentDetails;
