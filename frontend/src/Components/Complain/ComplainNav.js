import React from 'react';
import { NavLink } from 'react-router-dom';

const ComplainNav = () => {
  return (
    <nav className="bg-gray-200 p-4 shadow-md">
      <div className="flex justify-around">
        {/* Complaint Form */}
        <NavLink
          to="/add-complaint"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Complaint Form
        </NavLink>

        {/* Process */}
        <NavLink
          to="/process"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Process
        </NavLink>

        {/* Complaints */}
        <NavLink
          to="/complaint-details"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Complaints
        </NavLink>
      </div>
    </nav>
  );
};

export default ComplainNav;
