import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';  
import SideNav from '../../SideNav';  
import Footer from '../../Footer';  
import UserNav from './UserNav';  

const CommunityMemberForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobileNumber: '',
    email: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/community-members', formData);
      alert('Registration successful!');
      navigate('/my-details'); // Navigate to the user page
    } catch (error) {
      console.error('Error submitting the form', error);
      alert('Error submitting the form');
    }
  };

  const handleClear = () => {
    setFormData({
      name: '',
      address: '',
      mobileNumber: '',
      email: '',
      username: '',
      password: ''
    });
  };

  return (
    <div className="flex">
      <SideNav /> {/* Side Navigation */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gray-100">
        
        <Header /> {/* Header Component */}
        <UserNav /> {/* User Navigation */}
        
        {/* Main Content */}
        <div className="p-10 flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Community Member Registration</h2>

            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="mb-4">
                <label className="block text-gray-700">Mobile Number</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              {/* Username */}
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/community-member')}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <Footer /> {/* Footer */}
      </div>
    </div>
  );
};

export default CommunityMemberForm;
