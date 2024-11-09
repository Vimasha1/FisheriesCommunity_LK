import React from 'react';
import { NavLink } from 'react-router-dom';

const BoatNavbar = () => {
  return (
    <nav className="bg-gray-200 p-4 shadow-md">
      <div className="flex justify-around">
        {/* Add Boat */}
        <NavLink
          to="/BoatRegistration"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Add Boat
        </NavLink>

        {/* View Boat */}
        <NavLink
          to="/BoatDetails"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          View Boat
        </NavLink>

        {/* Route Manage (Previously Update Boat) */}
        <NavLink
          to="/Schedule"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Route Manage
        </NavLink>
      </div>
    </nav>
  );
};

export default BoatNavbar;
