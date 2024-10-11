import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Boatrdb({ _id, name, Numberof, phone }) {
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5005/boats/${_id}`)
      .then(res => res.data)
      .then(() => window.location.reload());
  }
  

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-xl p-6 m-4 max-w-md transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Card Content */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Boat Registration</h2>
        <div className="text-gray-600 space-y-2">
          <p><span className="font-bold text-blue-900">ID:</span> {_id}</p>
          <p><span className="font-bold text-blue-900">Name:</span> {name}</p>
          <p><span className="font-bold text-blue-900">Registration Number:</span> {Numberof}</p>
          <p><span className="font-bold text-blue-900">Phone:</span> {phone}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between space-x-2 mt-6">
        <Link
          to={`/BoatDetails/${_id}`}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 text-center"
        >
          Update
        </Link>
        <button
          onClick={deleteHandler}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-red-700 transition-transform transform hover:scale-105 text-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Boatrdb;
