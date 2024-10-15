import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import Header from '../../Header';
import SideNav from '../../SideNav';
import Footer from '../../Footer';
import SupplierNav from './SupplierNav';

const SupplierRegister = () => {
  const [formData, setFormData] = useState({
    supplierId: '',
    name: '',
    itemCategory: 'Salmon', // Default value for item category
    deliveryType: 'Delivery by Supplier', // Default value for delivery type
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    supplierId: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation logic during input
    if (name === 'name') {
      // Allow only letters and spaces
      const lettersPattern = /^[A-Za-z\s]*$/;
      if (lettersPattern.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
        setErrors({ ...errors, name: '' });
      } else {
        setErrors({ ...errors, name: 'Enter only letters' });
      }
    } else if (name === 'phone') {
      // Allow only numbers
      const numbersPattern = /^[0-9]*$/;
      if (numbersPattern.test(value)) {
        if (value.length <= 10) {
          setFormData({
            ...formData,
            [name]: value,
          });
          setErrors({ ...errors, phone: '' });
        } else {
          setErrors({ ...errors, phone: 'Only enter 10 numbers' });
        }
      } else {
        setErrors({ ...errors, phone: 'Enter only numbers' });
      }
    } else if (name === 'email') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Frontend Validation on Submit
  const validateForm = () => {
    const { supplierId, name, email, phone } = formData;
    let valid = true;
    const newErrors = {};

    // Supplier ID validation
    if (!supplierId.trim()) {
      newErrors.supplierId = 'Supplier ID is required.';
      valid = false;
    }

    // Supplier Name validation
    const lettersPattern = /^[A-Za-z\s]+$/;
    if (!name.trim()) {
      newErrors.name = 'Supplier Name is required.';
      valid = false;
    } else if (!lettersPattern.test(name)) {
      newErrors.name = 'Enter only letters';
      valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Enter valid email';
      valid = false;
    }

    // Phone Number validation
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
      valid = false;
    } else if (phone.length < 10) {
      newErrors.phone = 'Enter 10 numbers';
      valid = false;
    } else if (phone.length > 10) {
      newErrors.phone = 'Only enter 10 numbers';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const { supplierId, name, itemCategory, deliveryType, email, phone, address } = formData;

      // Make a POST request to register the supplier
      const response = await axios.post('http://localhost:5005/api/suppliers', {
        supplierId,
        name,
        itemCategory,
        deliveryType,
        contactInfo: { email, phone },
        address,
      });

      message.success(response.data.message);

      // Clear the form after successful submission
      setFormData({
        supplierId: '',
        name: '',
        itemCategory: 'Salmon',
        deliveryType: 'Delivery by Supplier',
        email: '',
        phone: '',
        address: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error registering supplier:', error);
      if (
        error.response &&
        error.response.data.message === 'Supplier ID already exists'
      ) {
        message.error('Supplier ID already exists');
      } else {
        message.error('Failed to register supplier. Please try again.');
      }
    }
  };

  return (
    <div className="flex">
      <SideNav /> {/* Side Navigation */}

      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to white">
        <Header /> {/* Header Component */}
        <SupplierNav /> {/* Supplier Navigation */}

        {/* Supplier Registration Section */}
        <section className="p-8 max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-10">
            Register New Supplier
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Supplier ID */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Supplier ID
                </label>
                <input
                  type="text"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                  placeholder="Enter supplier ID"
                />
                {errors.supplierId && (
                  <span className="text-red-500">{errors.supplierId}</span>
                )}
              </div>

              {/* Supplier Name */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Supplier Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                  placeholder="Enter supplier name"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}
              </div>

              {/* Type of Fish Offered (Dropdown) */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Type of Fish Offered
                </label>
                <select
                  name="itemCategory"
                  value={formData.itemCategory}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="Salmon">Salmon</option>
                  <option value="Tuna">Tuna</option>
                  <option value="Cod">Cod</option>
                  <option value="Mackerel">Mackerel</option>
                </select>
              </div>

              {/* Delivery Type */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Delivery Type
                </label>
                <select
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="Delivery by Supplier">Delivery by Supplier</option>
                  <option value="Pickup by Us">Pickup by Us</option>
                </select>
              </div>

              {/* Contact Info: Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                    placeholder="Enter supplier email"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email}</span>
                  )}
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                    placeholder="Enter supplier phone number"
                  />
                  {errors.phone && (
                    <span className="text-red-500">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                  placeholder="Enter supplier address"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Register Supplier
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default SupplierRegister;
