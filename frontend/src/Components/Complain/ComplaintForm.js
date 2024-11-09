import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Header';
import SideNav from '../../SideNav';
import ComplainNav from './ComplainNav';
import Footer from '../../Footer';

// Modal Component for showing the complaint ID
const Modal = ({ isOpen, onClose, complaintId }) => {
  if (!isOpen) return null; // If modal is not open, don't render anything

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Complaint Submitted</h2>
        <p>Your complaint has been submitted successfully.</p>
        <p className="mt-2">Complaint ID: <strong>{complaintId}</strong></p>
        <button 
          onClick={onClose} 
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mailId: '',
    phoneNumber: '',
    complaintType: '',
    complaintDescription: '',
    file: null,
  });

  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [complaintId, setComplaintId] = useState(null); // State to hold complaint ID
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name.trim()) {
      formErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      formErrors.name = 'Name should contain only letters';
    }
    if (!formData.mailId) {
      formErrors.mailId = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mailId)) {
      formErrors.mailId = 'Invalid email format';
    }
    if (!formData.phoneNumber.trim()) {
      formErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      formErrors.phoneNumber = 'Phone number should be between 10 and 15 digits';
    }
    if (!formData.complaintType) {
      formErrors.complaintType = 'Complaint type is required';
    }
    if (!formData.complaintDescription.trim()) {
      formErrors.complaintDescription = 'Complaint description is required';
    } else if (formData.complaintDescription.trim().length < 20) {
      formErrors.complaintDescription = 'Description should be at least 20 characters long';
    }
    if (formData.file) {
      const fileSizeLimit = 2 * 1024 * 1024;
      if (formData.file.size > fileSizeLimit) {
        formErrors.file = 'File size should not exceed 2MB';
      }
      const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedFileTypes.includes(formData.file.type)) {
        formErrors.file = 'Only JPG, PNG, or PDF files are allowed';
      }
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus('Please fix the validation errors.');
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('mailId', formData.mailId);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('complaintType', formData.complaintType);
    formDataToSend.append('complaintDescription', formData.complaintDescription);
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }
    try {
      const response = await axios.post('http://localhost:5005/complaints', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Assuming the response contains a `complaintId`
      const { complaintId } = response.data;

      // Set the complaint ID in state and show modal
      setComplaintId(complaintId);
      setIsModalOpen(true); // Open the modal

      // Clear the form after submission
      setFormData({
        name: '',
        mailId: '',
        phoneNumber: '',
        complaintType: '',
        complaintDescription: '',
        file: null,
      });
      setErrors({});
      setStatus('');
    } catch (error) {
      setStatus('Error submitting complaint. Please try again.');
    }
  };

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Header */}
        <Header />

        {/* Complain Management Navbar */}
        <ComplainNav />

        {/* Complaint Form Section */}
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-8">Submit Your Complaint</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl space-y-6">
            <div className="form-group">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="mailId"
                value={formData.mailId}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.mailId && <span className="text-red-500 text-sm">{errors.mailId}</span>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold mb-2">Complaint Type</label>
              <select
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select complaint type</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="BoatTrip">BoatTrip</option>
                <option value="Employees">Employees</option>
                <option value="Event">Event</option>
                <option value="Others">Others</option>
              </select>
              {errors.complaintType && <span className="text-red-500 text-sm">{errors.complaintType}</span>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold mb-2">Complaint Description</label>
              <textarea
                name="complaintDescription"
                value={formData.complaintDescription}
                onChange={handleChange}
                placeholder="Enter a detailed description of your complaint"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.complaintDescription && <span className="text-red-500 text-sm">{errors.complaintDescription}</span>}
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold mb-2">Attach a File (optional)</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
            </div>

            <div className="form-actions flex justify-between items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                Submit
              </button>
              {status && <p className="text-green-500 text-sm">{status}</p>}
            </div>
          </form>
        </div>

        {/* Modal for showing the complaint ID */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} complaintId={complaintId} />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default ComplaintForm;
