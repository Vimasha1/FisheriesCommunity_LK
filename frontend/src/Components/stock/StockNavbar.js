import React from 'react';
import { NavLink } from 'react-router-dom';

const StockNavbar = () => {
  return (
    <nav className="bg-gray-200 p-4 shadow-md">
      <div className="flex justify-around">
        <NavLink
          to="/AddNewStock"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          Add Stock
        </NavLink>
        {/*<NavLink
        <NavLink
          to="#"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          View Stock
        </NavLink>*/}
        

        <NavLink
          to="/viewTstock"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >Total
        </NavLink>
        <NavLink
          to="/viewAstock"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >Update Stock
        </NavLink>
        <NavLink
          to="/Tuna"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >Report
        </NavLink>

          Update Stock
        </NavLink>
        <NavLink
          to="/viewstock"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg transform scale-105'
              : 'text-blue-700 font-semibold px-4 py-2 hover:bg-blue-200 rounded-full'
          }
        >
          View Stock
        </NavLink>
      </div>
    </nav>
  );
};

export default StockNavbar;
