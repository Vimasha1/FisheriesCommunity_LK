import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Header from '../../Header';  
import Footer from '../../Footer';  
import SideNav from '../../SideNav';  
import BoatNavbar from './BoatNavbar';  

function BoatUpdate() {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://localhost:5005/boats/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios.put(`http://localhost:5005/boats/${id}`, {
      name: String(inputs.name),
      Numberof: Number(inputs.Numberof),
      phone: Number(inputs.phone),
    })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate('/BoatDetails'));
  };

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Header */}
        <Header />

        {/* Boat Navigation Bar */}
        <BoatNavbar />

        {/* Form Section */}
        <div className="flex-grow flex items-center justify-center py-10">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transition transform hover:scale-105"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
              Update Boat Information
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-700 disabled:bg-gray-400"
            >
              Update Boat Information
            </button>
          </form>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default BoatUpdate;
