import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user details in local storage when the component mounts
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    if (userData && userData.email) {
      setCurrentUser(userData); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loanAdmin');
    setCurrentUser(null); 
    navigate('/'); 
  };

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-lg shadow-lg p-6 flex justify-between items-center border-b border-white/20">
      <h1 className="text-3xl font-bold text-[#001f3f]">Fisheries Management System</h1>
      <div className="space-x-4">
        {currentUser ? (
          <div className="flex items-center space-x-4">
            {/* Logout Button */}
            <button
              className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded hover:from-gray-600 hover:to-gray-500 transition transform hover:scale-105 shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {/* If no user, show login and signup buttons */}
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded hover:from-blue-400 hover:to-blue-300 transition transform hover:scale-105 shadow-md"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-4 py-2 rounded hover:from-gray-600 hover:to-gray-500 transition transform hover:scale-105 shadow-md"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
