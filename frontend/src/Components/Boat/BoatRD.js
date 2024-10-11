import React, { useEffect, useState } from 'react';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable'; // Import the autotable plugin for table structure
import Boatrdb from './boatrdb';
import Header from '../../Header';
import Footer from '../../Footer';
import SideNav from '../../SideNav';
import BoatNavbar from './BoatNavbar';

const URL = "http://localhost:5005/boats";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function BoatRD() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Boat Report - Fisheries Community", 14, 22);
    
    // Add table with user data
    doc.autoTable({
      startY: 30,
      head: [['Name', 'Number of Boats', 'Phone Number']],
      body: filteredUsers.map(user => [user.name, user.Numberof, user.phone]),
      styles: { fontSize: 12 }
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    doc.text(`Page ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, {
      align: 'center'
    });

    // Save the PDF
    doc.save('Boat_Report_Fisheries_Community.pdf');
  };

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content Area */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Header */}
        <Header />

        {/* Boat Management Navbar */}
        <BoatNavbar />

        {/* Search and Download PDF Section */}
        <div className="p-8 flex justify-between items-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          />

          {/* Download PDF Button */}
          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700"
          >
            Download Report
          </button>
        </div>

        {/* Boat Data Section */}
        <div className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, i) => (
                <Boatrdb
                  key={i}
                  _id={user._id}
                  name={user.name}
                  Numberof={user.Numberof}
                  phone={user.phone}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No users found</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default BoatRD;
