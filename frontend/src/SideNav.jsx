import React from 'react';
import { FaHome, FaToolbox, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import logo from './assests/logo.png'; // Importing the logo

const SideNav = () => {
  return (
    <div className="bg-gradient-to-b from-[#5DADE2] to-[#2874A6] h-screen w-56 fixed top-0 left-0 text-white flex flex-col items-center py-5 shadow-lg z-10">
      {/* Logo */}
      <div className="mb-6">
        <img 
          src={logo}  
          alt="Logo" 
          className="w-40 h-40 object-cover rounded-full shadow-lg transition-transform duration-500 hover:scale-110 hover:shadow-2xl" 
        />
      </div>

      {/* Navigation */}
      <ul className="space-y-4 w-full px-6">
        <li className="group flex items-center p-3 hover:bg-[#21618C] transition-all duration-300 rounded-lg">
          <FaHome className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
          <a href="/" className="ml-4 text-lg font-semibold group-hover:text-gray-100">Home</a>
        </li>
        <li className="group flex items-center p-3 hover:bg-[#21618C] transition-all duration-300 rounded-lg">
          <FaToolbox className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
          <a href="#services" className="ml-4 text-lg font-semibold group-hover:text-gray-100">Services</a>
        </li>
        <li className="group flex items-center p-3 hover:bg-[#21618C] transition-all duration-300 rounded-lg">
          <FaInfoCircle className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
          <a href="#about-us" className="ml-4 text-lg font-semibold group-hover:text-gray-100">About Us</a>
        </li>
        <li className="group flex items-center p-3 hover:bg-[#21618C] transition-all duration-300 rounded-lg">
          <FaEnvelope className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
          <a href="#contact-us" className="ml-4 text-lg font-semibold group-hover:text-gray-100">Contact Us</a>
        </li>
      </ul>

      {/* Additional Links or Information */}
      <div className="mt-auto mb-6">
        <p className="text-sm text-gray-200 font-light">© 2024 Fisheries Community</p>
      </div>
    </div>
  );
};

export default SideNav;
