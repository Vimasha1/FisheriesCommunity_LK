import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../../Header';  
import SideNav from '../../SideNav';  
import Footer from '../../Footer';  
import LoanNav from './LoanNav';  

function Loan() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the stored email from localStorage
    const storedEmail = localStorage.getItem("userEmail");

    // Check if the stored email is not 'admin@gmail.com'
    if (storedEmail !== 'admin@gmail.com') {
      // Clear the localStorage
      localStorage.clear(); 

      // Redirect to login if the email is not 'admin@gmail.com'
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-white">
        
        {/* Header */}
        <Header />

        {/* Loan Management Navbar */}
        <LoanNav />

        {/* Welcome Section */}
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
            Loan Management System
          </h1>

          {/* Introduction Section */}
          <div className="bg-blue-100 shadow-md rounded-lg p-6 mb-10 max-w-4xl text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
            <p className="text-gray-700 text-lg leading-relaxed">
              Manage loan requests effortlessly with our user-friendly system. Track requests, manage documents, and stay in control of communication and approvals.
            </p>
          </div>

          {/* Features Section */}
          <div className="bg-white shadow-md rounded-lg p-10 w-full max-w-5xl">
            <h2 className="text-2xl font-bold text-blue-600 mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-blue-600 mb-2 text-xl">Add New Loan Requests</h3>
                <p className="text-gray-600">Easily add loan requests for community members.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-blue-600 mb-2 text-xl">Update Loan Information</h3>
                <p className="text-gray-600">Keep all loan information up to date for accurate tracking.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-blue-600 mb-2 text-xl">View Loan Details</h3>
                <p className="text-gray-600">View detailed information about each loan request.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-blue-600 mb-2 text-xl">Delete Loan Requests</h3>
                <p className="text-gray-600">Delete requests that are no longer needed.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-blue-600 mb-2 text-xl">Upload Documents</h3>
                <p className="text-gray-600">Securely upload and manage collateral documents.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-transform duration-300 transform hover:scale-105">
                <h3 className="font-semibold text-blue-600 mb-2 text-xl">Contact Admin</h3>
                <p className="text-gray-600">Communicate with community admin for important updates.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Loan;
