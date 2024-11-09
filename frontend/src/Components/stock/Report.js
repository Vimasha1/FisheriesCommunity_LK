import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { FaFish, FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Importing icons
import Header from "../../Header";
import Footer from "../../Footer";
import SideNav from "../../SideNav";
import StockNavbar from "./StockNavbar.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function Report() {
  const [fishData, setFishData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterFishType, setFilterFishType] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [mostFrequentFish, setMostFrequentFish] = useState("");
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [highestStock, setHighestStock] = useState({ boatID: '', quantity: 0 });
  const [lowestStock, setLowestStock] = useState({ boatID: '', quantity: Infinity });
  const [availableFishTypes, setAvailableFishTypes] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  // Fetch fish data from server
  useEffect(() => {
    const fetchFishData = async () => {
      try {
        const response = await axios.get('http://localhost:5005/users'); // Replace with your API endpoint
        const users = response.data.users;
        setFishData(users);
        setFilteredData(users);
        setAvailableFishTypes([...new Set(users.map(item => item.FishType))]); // Extract unique fish types
        calculateReportData(users); // Initialize data for the whole dataset
      } catch (error) {
        console.error('Error fetching fish data:', error);
      }
    };

    fetchFishData();
  }, []);

  // Function to calculate report data
  const calculateReportData = (data) => {
    let fishTypeCounts = {};
    let totalValue = 0;
    let highest = { boatID: '', quantity: 0 };
    let lowest = { boatID: '', quantity: Infinity };

    data.forEach((item) => {
      totalValue += Number(item.Price) * Number(item.Quantity);

      if (!fishTypeCounts[item.FishType]) {
        fishTypeCounts[item.FishType] = 0;
      }
      fishTypeCounts[item.FishType]++;

      // Track highest and lowest stock quantities
      if (item.Quantity > highest.quantity) {
        highest = { boatID: item.BoatID, quantity: item.Quantity };
      }
      if (item.Quantity < lowest.quantity) {
        lowest = { boatID: item.BoatID, quantity: item.Quantity };
      }
    });

    const mostFrequent = Object.keys(fishTypeCounts).reduce((a, b) => fishTypeCounts[a] > fishTypeCounts[b] ? a : b, '');

    setMostFrequentFish(mostFrequent);
    setTotalStockValue(totalValue);
    setHighestStock(highest);
    setLowestStock(lowest);
  };

  // Handle filters
  const handleFilter = () => {
    const filtered = fishData.filter(item => {
      const matchFishType = filterFishType === "" || item.FishType.toLowerCase() === filterFishType.toLowerCase();
      const matchStartDate = filterStartDate === "" || new Date(item.AddedDate) >= new Date(filterStartDate);
      const matchEndDate = filterEndDate === "" || new Date(item.AddedDate) <= new Date(filterEndDate);
      return matchFishType && matchStartDate && matchEndDate;
    });

    if (filtered.length === 0) {
      setNoDataMessage(true);
    } else {
      setNoDataMessage(false);
    }

    setFilteredData(filtered);
    calculateReportData(filtered); // Recalculate for filtered data
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Stock Trends Report", 20, 10);
    doc.text(`Most Frequent Fish Type: ${mostFrequentFish}`, 10, 20);
    doc.text(`Total Market Value: ${totalStockValue} LKR`, 10, 30);
    doc.text(`Highest Stock: Boat ID ${highestStock.boatID} with ${highestStock.quantity} kg`, 10, 40);
    doc.text(`Lowest Stock: Boat ID ${lowestStock.boatID} with ${lowestStock.quantity} kg`, 10, 50);

    // Add table under the text
    const tableData = filteredData.map(({ BoatID, Quantity, FishType }) => [BoatID, Quantity, FishType]);
    doc.autoTable({
      head: [['Boat ID', 'Quantity (kg)', 'Fish Type']],
      body: tableData,
      startY: 60,
    });

    doc.save('stock_trends_report.pdf');
  };

  // Chart Data
  const chartData = {
    labels: filteredData.map(item => item.AddedDate),
    datasets: [
      {
        label: 'Fish Stock Quantity Over Time',
        data: filteredData.map(item => item.Quantity),
        fill: false,
        borderColor: '#4BC0C0',
        tension: 0.1,
      },
    ],
  };

  const csvHeaders = [
    { label: 'Boat ID', key: 'BoatID' },
    { label: 'Quantity (kg)', key: 'Quantity' },
    { label: 'Fish Type', key: 'FishType' },
  ];

  return (
    <div className="flex">
      <SideNav />
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <Header />
        <StockNavbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Stock Trends Report</h1>

          {/* Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <select
                value={filterFishType}
                onChange={(e) => setFilterFishType(e.target.value)}
                className="border border-gray-300 p-2 rounded"
              >
                <option value="">Select Fish Type</option>
                {availableFishTypes.map(fishType => (
                  <option key={fishType} value={fishType}>{fishType}</option>
                ))}
              </select>
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                max={getCurrentDate()} // Restrict future dates
              />
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="border border-gray-300 p-2 rounded"
                max={getCurrentDate()} // Restrict future dates
              />
              <button
                onClick={handleFilter}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Filter
              </button>
            </div>
          </div>

          {/* No Data Message */}
          {noDataMessage && (
            <div className="bg-red-100 text-red-700 p-4 mb-8 rounded">
              <p>No fish stock data is available for the selected filters.</p>
            </div>
          )}

          {/* Report Boxes Section with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 p-4 rounded shadow-md text-center">
              <FaFish className="text-3xl mb-4" />
              <h3 className="text-lg font-semibold mt-4">Most Frequent Fish</h3>
              <p className="text-2xl font-bold">{mostFrequentFish}</p>
            </div>

            <div className="bg-yellow-100 p-4 rounded shadow-md text-center">
              <FaWallet className="text-3xl mb-4" />
              <h3 className="text-lg font-semibold mt-4">Total Market Value</h3>
              <p className="text-2xl font-bold">{totalStockValue} LKR</p>
            </div>

            <div className="bg-green-100 p-4 rounded shadow-md text-center">
              <FaArrowUp className="text-3xl mb-4" />
              <h3 className="text-lg font-semibold mt-4">Highest Stock</h3>
              <p className="text-2xl font-bold">{highestStock.boatID} with {highestStock.quantity} kg</p>
            </div>

            <div className="bg-red-100 p-4 rounded shadow-md text-center">
              <FaArrowDown className="text-3xl mb-4" />
              <h3 className="text-lg font-semibold mt-4">Lowest Stock</h3>
              <p className="text-2xl font-bold">{lowestStock.boatID} with {lowestStock.quantity} kg</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mb-8">
            <Line data={chartData} />
          </div>

          {/* Export Section */}
          <div className="flex space-x-4">
            <button
              onClick={generatePDF}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Generate PDF
            </button>
            <CSVLink
              data={filteredData}
              headers={csvHeaders}
              filename={"stock_report.csv"}
            >
              <button className="bg-green-500 text-white py-2 px-4 rounded">
                Export to CSV
              </button>
            </CSVLink>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default Report;
