import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header'; 
import SideNav from '../../SideNav';  
import LoanNav from './LoanNav';  
import Footer from '../../Footer';  

function AddRequest() {
  const navigate = useNavigate(); 

  const [inputs, setInputs] = useState({
    name: "",
    membership: "",
    gmail: "",
    amount: ""
  });

  const handleChange = (event) => {
    setInputs(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Request Added Successfully");
    navigate('/requestdetails');
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5005/requests",{
      name: String(inputs.name),
      membership: Number(inputs.membership),
      gmail: String(inputs.gmail),
      amount: Number(inputs.amount),
    }).then(res => res.data);
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

        {/* Add Request Section */}
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-8">New Loan Request</h1>

          <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={inputs.name}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              {/* Membership Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Membership</label>
                <input
                  type="number"
                  name="membership"
                  onChange={handleChange}
                  value={inputs.membership}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter membership number"
                />
              </div>

              {/* Gmail Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="gmail"
                  onChange={handleChange}
                  value={inputs.gmail}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  value={inputs.amount}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter loan amount"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default AddRequest;
