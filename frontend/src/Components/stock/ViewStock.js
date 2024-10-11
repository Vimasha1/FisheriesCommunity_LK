import React, { useState, useEffect } from 'react';
import Details from '../stock/Details.js';
import axios from "axios";
import Header from '../../Header';  
import Footer from '../../Footer';  
import SideNav from '../../SideNav';  
import StockNavbar from './StockNavbar.js';  
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaDownload } from 'react-icons/fa'; // Import the download icon

const URL = "http://localhost:5005/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ViewStock() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.BoatID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.FishType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  // Function to download the stock report as a PDF
  const handleDownloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Stock Report', 14, 20);

    // Define table columns and rows
    const tableColumn = ['Boat ID', 'Fish Type', 'Weight', 'Quantity', 'Price'];
    const tableRows = filteredUsers.map(user => [
      user.BoatID,
      user.FishType,
      user.Weight,
      user.Quantity,
      user.Price
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: { halign: 'left' },
    });

    doc.save('stock-report.pdf');
  };

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Header */}
        <Header />

        {/* Stock Management Navbar */}
        <StockNavbar />

        {/* Stock Data Section */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Stock</h1>

          {/* Search Bar and PDF Download Button */}
          <div className="flex justify-between items-center mb-6">
            {/* Search Feature */}
            <input
              type="text"
              placeholder="Search by Boat ID or Fish Type..."
              className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* PDF Download Button */}
            <button
              onClick={handleDownloadReport}
              className="bg-green-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-green-600 transition duration-200 flex items-center"
            >
              <FaDownload className="mr-2" /> Download Report
            </button>
          </div>

          {/* Stock Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 transition transform hover:scale-105 hover:shadow-lg">
                  <Details user={user} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No matching records found.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default ViewStock;
