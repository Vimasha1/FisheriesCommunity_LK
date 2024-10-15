import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header';  // Importing Header component
import SideNav from '../../SideNav';  // Importing SideNav component
import UserNav from './UserNav';  // Importing UserNav component
import Footer from '../../Footer';  // Importing Footer component

const AllMembers = () => {
Finance_Management(IT22297068)
  const [paymentAmount, setPaymentAmount] = useState('');
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const [members, setMembers] = useState([]);
Daily_Fish_Stock_Management(IT22154408)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/community-members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching community members', error);
      }
    };

    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/community-members/${id}`);
      setMembers(members.filter((member) => member._id !== id));
    } catch (error) {
      console.error('Error deleting community member', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-member/${id}`);
  };

  const handleBack = () => {
    navigate('/userpage');
  };

Finance_Management(IT22297068)
  // Filter members based on the search term
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );


 Daily_Fish_Stock_Management(IT22154408)
  return (
    <div className="flex">
      <SideNav /> {/* Side Navigation */}

      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
        <Header /> {/* Header Component */}
        <UserNav /> {/* User Navigation */}

        <div className="p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Community Members</h2>

 Finance_Management(IT22297068)
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
              />
            </div>

            {/* Show members or No members message */}
            {filteredMembers.length === 0 ? (
              <div className="text-center text-gray-600">No community members found.</div>
            ) : (
              <ul className="space-y-6">
                {filteredMembers.map((member) => (

            {/* Show members or No members message */}
            {members.length === 0 ? (
              <div className="text-center text-gray-600">No community members found.</div>
            ) : (
              <ul className="space-y-6">
                {members.map((member) => (
 Daily_Fish_Stock_Management(IT22154408)
                  <li
                    key={member._id}
                    className="border border-gray-200 p-6 rounded-lg shadow-md bg-gray-50 hover:bg-blue-50 transition duration-200"
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      <strong>Name:</strong> {member.name}
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> {member.address}
                    </p>
                    <p className="text-gray-700">
                      <strong>Mobile Number:</strong> {member.mobileNumber}
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> {member.email}
                    </p>
                    <p className="text-gray-700">
                      <strong>Username:</strong> {member.username}
                    </p>
                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={() => handleUpdate(member._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(member._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Footer /> {/* Footer Component */}
      </div>
    </div>
  );
};

export default AllMembers;
