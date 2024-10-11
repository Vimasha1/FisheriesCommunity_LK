import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Header from '../../Header'; // Import Header
import Footer from '../../Footer'; // Import Footer
import SideNav from '../../SideNav'; // Import SideNav
import StockNavbar from './StockNavbar'; // Import StockNavbar

function UpdateScock() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams(); // Extracting the 'id' parameter

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5005/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  // Update the data
  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5005/users/${id}`, {
        BoatID: String(inputs.BoatID),
        FishType: String(inputs.FishType),
        Quantity: Number(inputs.Quantity),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history('/viewstock'));
  };

  return (
    <div className="flex">
      {/* Side Navbar */}
      <SideNav />

      {/* Main Content */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        {/* Header */}
        <Header />

        {/* Stock Management Navbar */}
        <StockNavbar />

        {/* Update Stock Form */}
        <div className="flex-grow flex items-center justify-center py-10"> {/* Added padding to top and bottom */}
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full mt-10 mb-10"> {/* Added margin to create space */}
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Update Stock</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="BoatID"
                  value={inputs.BoatID || ""}
                  onChange={handleChange}
                  required
                  placeholder="Boat ID"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="FishType"
                  value={inputs.FishType || ""}
                  onChange={handleChange}
                  required
                  placeholder="Fish Type"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="Quantity"
                  value={inputs.Quantity || ""}
                  onChange={handleChange}
                  required
                  placeholder="Quantity"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Update
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default UpdateScock;
