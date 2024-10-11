import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
  return (
    <nav className="bg-gray-200 p-4 shadow-md">
      <div className="flex justify-around">
        {/* Register Member */}
        <NavLink
          to="/community-member"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Register Member
        </NavLink>

        {/* Member Details */}
        <NavLink
          to="/my-details"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Member Details
        </NavLink>

        {/* Make Payment */}
        <NavLink
          to="/make-payment"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Make Payment
        </NavLink>

        {/* Payment Details */}
        <NavLink
          to="/payment-details"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Payment Details
        </NavLink>
      </div>
    </nav>
  );
};

export default UserNav;
