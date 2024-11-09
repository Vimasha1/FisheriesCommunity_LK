import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#738b9c] text-white py-10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left ml-56"> {/* Add ml-56 */}
        
        {/* Address Section */}
        <div>
          <h3 className="text-lg font-semibold">ST. FRANCIS XAVIER'S FISHERIES COMMUNITY</h3>
          <p className="mt-2">
            ST. FRANCIS XAVIER'S, 46/26, Navam Mawatha,
            <br />
            Wennappuwa, Sri Lanka
          </p>
        </div>
        
        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold">QUICK LINKS</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="#terms" className="text-white hover:text-gray-300 transition duration-200">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#privacy" className="text-white hover:text-gray-300 transition duration-200">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold">CONTACT</h3>
          <p className="mt-2">
            Telephone: +94 11 234 3700
            <br />
            Whatsapp: +94 11 470 9400
            <br />
            Email: stfancis@gmail.com
          </p>
        </div>
        
        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold">FIND US ON</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="https://facebook.com" className="text-white hover:text-gray-300 transition duration-200">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="text-white hover:text-gray-300 transition duration-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="text-white hover:text-gray-300 transition duration-200">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com" className="text-white hover:text-gray-300 transition duration-200">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://linkedin.com" className="text-white hover:text-gray-300 transition duration-200">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
