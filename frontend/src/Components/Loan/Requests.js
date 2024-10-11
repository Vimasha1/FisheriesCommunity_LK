import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import RequestDetails from './RequestDetails.js'; 
import { useReactToPrint } from "react-to-print";
import Header from '../../Header';  
import SideNav from '../../SideNav';  
import LoanNav from './LoanNav';  
import Footer from '../../Footer';  

const URL = "http://localhost:5005/requests";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function Requests() {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setRequests(data.requests));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Loan Requests Report",
    onAfterPrint: () => alert("Loan Requests Report Successfully Downloaded!"),
  });

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredRequests = data.requests.filter((request) =>
        Object.values(request).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setRequests(filteredRequests);
      setNoResults(filteredRequests.length === 0);
    });
  };

  const handleSendReport = () => {
    const phoneNumber = "+94702345133";
    const message = "Your Upcoming Payment is due!";
    const WhatsAppURL = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(WhatsAppURL, "_blank");
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

        {/* Loan Requests Section */}
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-8">All Loan Requests</h1>

          {/* Search Field and Download Button */}
          <div className="flex mb-6 w-full max-w-3xl items-center space-x-4">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="Search"
              placeholder="Search Request Details"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white w-40 px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Search
            </button>
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white w-40 px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Download Report
            </button>
          </div>

          {/* No Results Message */}
          {noResults ? (
            <p className="text-red-500 text-lg font-semibold">No Requests Found</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={ComponentsRef}>
              {requests && requests.map((request, i) => (
                <div key={i} className="bg-white shadow-md rounded-lg p-6">
                  <RequestDetails request={request} /> {/* Updated to RequestDetails */}
                </div>
              ))}
            </div>
          )}

          {/* Send WhatsApp Message Button */}
          <div className="mt-8">
            <button
              onClick={handleSendReport}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Send WhatsApp Message
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Requests;
