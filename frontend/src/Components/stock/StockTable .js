// StockTable.js
import React from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

// Stock Table Component
const StockTable = ({ users, onDelete }) => {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5005/users/${id}`).then(() => {
      onDelete(id); // Call delete function passed as props
    });
  };

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Fish Type</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Grade</th>
            <th className="py-2 px-4 border-b">Boat ID</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{formattedDate(user.AddedDate)}</td>
              <td className="py-2 px-4 border-b">{user.FishType}</td>
              <td className="py-2 px-4 border-b">{user.Quantity}</td>
              <td className="py-2 px-4 border-b">{user.FishGrade}</td>
              <td className="py-2 px-4 border-b">{user.BoatID}</td>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
