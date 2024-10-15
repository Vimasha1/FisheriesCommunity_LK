import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';  
import Footer from '../../Footer';  
import SideNav from '../../SideNav';  
import BoatNavbar from './BoatNavbar';  

function BoatR() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    Numberof: '',
    phone: '',
    category: '', 
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate('/BoatDetails'));
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:5005/boats", {
        name: String(inputs.name),
        Numberof: Number(inputs.Numberof),
        phone: Number(inputs.phone),
        category: inputs.category, 
      });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Header */}
        <Header />

        {/* Boat Management Navbar */}
        <BoatNavbar />

        <div className="flex-grow flex items-center justify-center py-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transition transform hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">
              Boat Registration Form
            </h2>

            {/* Full Name */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Full Name:
              </label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm hover:shadow-lg"
              />
            </div>

            {/* Government Registration Number */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter Government Registration Number:
              </label>
              <input
                type="text"
                name="Numberof"
                value={inputs.Numberof}
                onChange={handleChange}
                required
                placeholder="123456789"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm hover:shadow-lg"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number:
              </label>
              <input
                type="text"
                name="phone"
                value={inputs.phone}
                onChange={handleChange}
                required
                placeholder="+1 234 567 890"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm hover:shadow-lg"
              />
            </div>

            {/* Select Boat Category */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Boat Category:
              </label>
              <select
                name="category"
                value={inputs.category}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm hover:shadow-lg"
              >
                <option value="">--Select Category--</option>
                <option value="ocean">Ocean</option>
                <option value="offshore">Offshore</option>
                <option value="inshore">Inshore</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-700 disabled:bg-gray-400"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default BoatR;
