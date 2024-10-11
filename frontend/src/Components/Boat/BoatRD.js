import React, { useEffect, useState } from 'react';
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { Pie } from 'react-chartjs-2'; // Import Pie chart
import Boatrdb from './boatrdb';
import Header from '../../Header';
import Footer from '../../Footer';
import SideNav from '../../SideNav';
import BoatNavbar from './BoatNavbar';
import html2canvas from 'html2canvas'; // Import html2canvas
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'; // Import required Chart.js components

ChartJS.register(ArcElement, Tooltip, Legend, Title); // Register components

const URL = "http://localhost:5005/boats";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}

function BoatRD() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChart, setShowChart] = useState(false); // State to control chart visibility

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Prepare data for pie chart
  const categoryCounts = {};
  filteredUsers.forEach(user => {
    categoryCounts[user.category] = (categoryCounts[user.category] || 0) + 1;
  });

  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Options for Pie Chart
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
            const currentValue = dataset.data[tooltipItem.dataIndex];
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`; // Show percentage in tooltip
          },
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`; // Display percentage on chart
        },
      },
    },
  };

  // Generate PDF Report
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Boat Report - Fisheries Community", 14, 22);
    
    doc.autoTable({
      startY: 30,
      head: [['Name', 'Number of Boats', 'Phone Number', 'Category']],
      body: filteredUsers.map(user => [user.name, user.Numberof, user.phone, user.category]),
      styles: { fontSize: 12 }
    });

    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    doc.text(`Page ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, {
      align: 'center'
    });

    doc.save('Boat_Report_Fisheries_Community.pdf');
  };

  const handleSendReport = () => {
    const phoneNumber = "+94706601617";
    const message = `Selected User Reports`;
    const whatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsAppUrl, "_blank");
  }

  const toggleChart = () => {
    setShowChart(!showChart); // Toggle the visibility of the chart
  };

  const downloadChart = async () => {
    const canvas = await html2canvas(document.querySelector("#pieChart")); // Capture the pie chart area
    const dataUrl = canvas.toDataURL("image/png"); // Convert canvas to data URL

    // Create a PDF and save it
    const pdf = new jsPDF();
    pdf.addImage(dataUrl, 'PNG', 10, 10, 190, 100); // Add image to PDF
    pdf.save("Pie_Chart_Boat_Report.pdf");
  };

  return (
    <div className="flex">
      <SideNav />

      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <Header />
        <BoatNavbar />

        <div className="p-8 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-1/3"
          />

          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700"
          >
            Download Report
          </button>

          <button
            onClick={handleSendReport}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700"
          >
            Send WhatsApp
          </button>

          {/* Button to toggle pie chart visibility */}
          <button
            onClick={toggleChart}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700"
          >
            {showChart ? 'Hide Chart' : 'Show Chart'}
          </button>

          {/* Button to download pie chart */}
          {showChart && (
            <button
              onClick={downloadChart}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 active:bg-green-700"
            >
              Download Chart
            </button>
          )}
        </div>

        {/* Pie Chart Section */}
        {showChart && (
          <div className="p-8" id="pieChart"> {/* Added id for html2canvas */}
            <h2 className="text-lg font-bold mb-4">Category Distribution</h2>
            <div className="flex justify-center">
              <Pie data={pieData} options={options} /> {/* Pass options to Pie chart */}
            </div>
          </div>
        )}

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
                  category={user.category}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No users found</p>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default BoatRD;
