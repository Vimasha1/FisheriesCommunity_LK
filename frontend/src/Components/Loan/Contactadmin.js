import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Header from '../../Header';  
import SideNav from '../../SideNav';  
import LoanNav from './LoanNav';  
import Footer from '../../Footer';  

function Contactadmin() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fme9oel", 
        "template_jvhlo2s", 
        form.current,
        "rmIBEMyFCAUD4X8fz",
      )
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Loan request sent to the financial manager successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send the loan request, please try again.');
        }
      );
  };

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        
        {/* Header */}
        <Header />

        {/* Loan Management Navbar */}
        <LoanNav />

        {/* Contact Admin Section */}
        <div className="flex-grow flex items-center justify-center py-10">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transition transform hover:scale-105">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Send Loan Request Letter to Financial Manager</h1>
            
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Borrower's Name:</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Borrower's Email:</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount:</label>
                <textarea
                  name="loan_amount"
                  placeholder="Loan Amount"
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="text-center">
                <input
                  type="submit"
                  value="Send Request"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Contactadmin;
