import React from 'react';
import { NavLink } from 'react-router-dom';

const SupplierNav = () => {
  return (
    <nav className="bg-gray-200 p-4 shadow-md">
      <div className="flex justify-around">
        {/* Supplier Dashboard */}
        <NavLink
          to="/supplierList"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Suppliers
        </NavLink>

        {/* Add Supplier */}
        <NavLink
          to="/supplier"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Add Supplier
        </NavLink>

       

       

       
      </div>
    </nav>
  );
};

export default SupplierNav;
