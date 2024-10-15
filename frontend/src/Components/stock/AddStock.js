import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../Header";
import Footer from "../../Footer";
import SideNav from "../../SideNav";
import StockNavbar from "./StockNavbar";
import Header from "../../Header";  
import Footer from "../../Footer";  
import SideNav from "../../SideNav";  
import StockNavbar from "./StockNavbar";  

function AddNewScock() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    BoatID: "",
    FishType: "",
    Quantity: "",
    FishGrade: "",
    AddedDate: "",
    Price:"",
  });

  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const navigate = useNavigate();

  

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate Quantity
    if (inputs.Quantity <= 0) {
      alert("Quantity cannot be less than 0.");
      return;
    }

    setShowPopup(true); // Show the popup
    setTimeout(() => setShowPopup(false), 6000); // Hide the popup after 4 seconds
    // Optionally clear the form inputs
    setInputs({
      BoatID: "",
      FishType: "",
      Quantity: "",
      Date: "", 
      Price:"",
    });
    sendRequest().then(() => history("/viewAstock"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5005/users", {
        BoatID: String(inputs.BoatID),
        FishType: String(inputs.FishType),
        Quantity: Number(inputs.Quantity),
        FishGrade: String(inputs.FishGrade),
        AddedDate: inputs.AddedDate,
        Price: Number(inputs.Price),

      })
      .then((res) => res.data)
      .catch((err) => alert(err.response.data.message));

      setTimeout(() => {
        setShowPopup(false); // Hide popup after 2 seconds
      }, 2000);
  };

// Get today's date for min attribute
const today = new Date().toISOString().split("T")[0];

    sendRequest().then(() => history('/viewstock'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5005/users", {
      BoatID: String(inputs.BoatID),
      FishType: String(inputs.FishType),
      Quantity: Number(inputs.Quantity),
    }).then(res => res.data);
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

        {/* Add Stock Form */}
        <div className="flex-grow flex items-center justify-center py-12">
          {" "}
          {/* Added padding for spacing */}
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
              Add New Stock
            </h1>
        <div className="flex-grow flex items-center justify-center py-12"> {/* Added padding for spacing */}
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Add New Stock</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="BoatID"
                  value={inputs.BoatID}
                  onChange={handleChange}
                  required
                  placeholder="Boat ID"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <select
                <input
                  type="text"
                  name="FishType"
                  value={inputs.FishType}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Fish Type
                  </option>
                  <option value="TUNA">TUNA</option>
                  <option value="INDIAN MACKERE">INDIAN MACKEREL</option>
                  <option value="SAIL FISH">SAIL FISH</option>
                  <option value="RED MULLET">RED MULLET</option>
                  <option value="CRAB">CRAB</option>
                  <option value="PRAWN">PRAWN</option>
                  <option value="CUTTLE FISH">CUTTLE FISH</option>
                  <option value="BARRAMUNDI">BARRAMUNDI</option>
                </select>
              </div>

              <div className="relative">
                <select
                  name="FishGrade"
                  value={inputs.FishGrade}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select Fish Grade
                  </option>
                  <option value="Extra large">Extra large</option>
                  <option value="Large">Large</option>
                  <option value="Small">Small</option>
                </select>
              </div>

                  placeholder="Fish Type"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  name="Quantity"
                  value={inputs.Quantity}
                  onChange={handleChange}
                  required
                  min="0"  
                  placeholder="Quantity"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <input
                  type="date"
                  name="AddedDate"
                  value={inputs.AddedDate}
                  onChange={handleChange}
                  required
                  min={today}
                  max={today}
                  placeholder="Date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="Price"
                  value={inputs.Price}
                  onChange={handleChange}
                  required
                  min={100}
                  placeholder="Expected Price (LKR)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Submit
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

export default AddNewScock;
