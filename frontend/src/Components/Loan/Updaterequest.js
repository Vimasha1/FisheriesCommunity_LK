import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../../Header';  
import SideNav from '../../SideNav';  
import LoanNav from './LoanNav';  
import Footer from '../../Footer';  

function Updaterequest() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5005/requests/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.request));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5005/requests/${id}`, {
        name: String(inputs.name),
        membership: Number(inputs.membership),
        gmail: String(inputs.gmail),
        amount: Number(inputs.amount),
      })
      .then((res) => res.data);
  };

  const handleChange = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendRequest();
    navigate('/requestdetails');
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

        {/* Update Request Form Section */}
        <div className="flex-grow flex items-center justify-center py-10">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transition transform hover:scale-105">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Update Loan Request</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={inputs.name || ""}
                  required
                  placeholder="Enter Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Membership</label>
                <input
                  type="number"
                  name="membership"
                  onChange={handleChange}
                  value={inputs.membership || ""}
                  required
                  placeholder="Enter Membership"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gmail</label>
                <input
                  type="email"
                  name="gmail"
                  onChange={handleChange}
                  value={inputs.gmail || ""}
                  required
                  placeholder="Enter Gmail"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  value={inputs.amount || ""}
                  required
                  placeholder="Enter Amount"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Request
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

export default Updaterequest;
