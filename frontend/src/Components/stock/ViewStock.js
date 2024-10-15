import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../Header";
import Footer from "../../Footer";
import SideNav from "../../SideNav";
import StockNavbar from "./StockNavbar.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaDownload } from "react-icons/fa";

const URL = "http://localhost:5005/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

// Function to determine the quality based on the added date
const determineQuality = (addedDate) => {
  const currentDate = new Date(); // Current date
  const dateAdded = new Date(addedDate); // Convert addedDate to Date object

  // Check if dateAdded is valid
  if (isNaN(dateAdded)) {
    console.error("Invalid date format:", addedDate);
    return "Unknown"; // Return unknown if the date is invalid
  }

  const timeDifference = currentDate - dateAdded; // Difference in milliseconds
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

  console.log("Days Difference:", daysDifference); // Log the difference for debugging

  return daysDifference > 2 ? "Stale" : "Fresh"; // Return quality based on the days difference
};

function ViewStock() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fishTypeFilter, setFishTypeFilter] = useState(""); // State for fish type filter
  const [sortOrder, setSortOrder] = useState(""); // State for sorting
  const [sortDirection, setSortDirection] = useState("asc"); // Ascending or descending

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5005/users/${id}`).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    });
  };

  // Function to download the stock report as a PDF
  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Stock Report", 14, 20);
    const tableColumn = [
      "Boat ID",
      "Fish Type",
      "Quantity",
      "Grade",
      "Date",
      "Price",
      "Dropped Price",
    ];
    const tableRows = users.map((user) => {
      const quality = determineQuality(user.AddedDate);
      const droppedPrice =
        quality === "Stale" ? (user.Price / 2).toFixed(2) : "";
      return [
        user.BoatID,
        user.FishType,
        user.Quantity,
        user.FishGrade,
        new Date(user.AddedDate).toLocaleDateString("en-IN"),
        user.Price,
        droppedPrice,
      ];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      styles: { halign: "left" },
    });

    doc.save("stock-report.pdf");
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Sorting function
  const sortedUsers = [...users].sort((a, b) => {
    let comparison = 0;
    if (sortOrder === "quantity") {
      comparison = a.Quantity - b.Quantity; // Sort by Quantity
    } else if (sortOrder === "fishType") {
      comparison = a.FishType.localeCompare(b.FishType); // Sort by Fish Type
    } else if (sortOrder === "addedDate") {
      comparison = new Date(a.AddedDate) - new Date(b.AddedDate); // Sort by Date
    } else if (sortOrder === "price") {
      comparison = a.Price - b.Price; // Sort by Price
    }

    // Apply sort direction
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Get unique fish types for filtering
  const uniqueFishTypes = Array.from(
    new Set(users.map((user) => user.FishType))
  );

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
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Stock
          </h1>

          {/* Search Bar, Fish Type Filter, Sort Dropdown and PDF Download Button */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search by Boat ID or Fish Type..."
              className="w-full max-w-md p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Fish Type Filter Dropdown */}
            <select
              value={fishTypeFilter}
              onChange={(e) => setFishTypeFilter(e.target.value)}
              className="ml-4 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Fish Types</option>
              {uniqueFishTypes.map((fishType, index) => (
                <option key={index} value={fishType}>
                  {fishType}
                </option>
              ))}
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="ml-4 p-2 border border-gray-300 rounded-lg"
            >
              <option value="">Sort By</option>
              <option value="quantity">Quantity</option>
              <option value="fishType">Fish Type</option>
              <option value="addedDate">Added Date</option>
              <option value="price">Price</option>
            </select>
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
              className="ml-4 p-2 border border-gray-300 rounded-lg"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <button
              onClick={handleDownloadReport}
              className="bg-green-500 text-white px-4 py-2 ml-4 rounded-lg hover:bg-green-600 transition duration-200 flex items-center"
            >
              <FaDownload className="mr-2" /> Download Report
            </button>
          </div>

          {/* Stock Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Fish Type</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Grade</th>
                  <th className="py-2 px-4 border-b">Boat ID</th>
                  <th className="py-2 px-4 border-b">Quality</th>
                  <th className="py-2 px-4 border-b">Expected Price</th>
                  <th className="py-2 px-4 border-b" color="red">Dropped Price</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>

              <tbody>
                {sortedUsers
                  .filter(
                    (user) =>
                      (user.BoatID.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                        user.FishType.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        )) &&
                      (fishTypeFilter === "" ||
                        user.FishType === fishTypeFilter) // Apply fish type filter
                  )
                  .map((user) => {
                    const quality = determineQuality(user.AddedDate); // Determine quality of fish
                    const droppedPrice =
                      quality === "Stale"
                        ? (user.Price / 2).toFixed(2)
                        : ""; // Calculate dropped price only for stale fish

                    return (
                      <tr key={user._id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">
                          {formattedDate(user.AddedDate)}
                        </td>
                        <td className="py-2 px-4 border-b">{user.FishType}</td>
                        <td className="py-2 px-4 border-b">{user.Quantity}</td>
                        <td className="py-2 px-4 border-b">{user.FishGrade}</td>
                        <td className="py-2 px-4 border-b">{user.BoatID}</td>
                        <td className="py-2 px-4 border-b">{quality}</td>
                        <td className="py-2 px-4 border-b">
                          {user.Price} LKR
                        </td>{" "}
                        {/* Show original price */}
                        <td className="py-2 px-4 border-b">
                          {droppedPrice ? `${droppedPrice} LKR` : ""} {/* Show dropped price only for stale fish */}
                        </td>
                        <td className="py-2 px-4 border-b flex space-x-2">
                          <Link to={`/addstock/${user._id}`}>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                              Update
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default ViewStock;
