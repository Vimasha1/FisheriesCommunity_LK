import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Display data
function Details(props) {
  const { _id, BoatID, FishType, Quantity } = props.user;

  const history = useNavigate();

  // Delete data handler
  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5005/users/${_id}`)
      .then((res) => res.data)
      .then(() => window.location.reload());
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <div className="text-gray-700 space-y-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-blue-900">Boat Id:</h3>
          <p className="text-gray-600">{BoatID}</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-blue-900">Fish Type:</h3>
          <p className="text-gray-600">{FishType}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-blue-900">Quantity:</h3>
          <p className="text-gray-600">{Quantity}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6 space-x-4">
        {/* Update Button */}
        <Link to={`/addstock/${_id}`} className="w-full">
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Update
          </button>
        </Link>

        {/* Delete Button */}
        <button
          onClick={deleteHandler}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Details;
