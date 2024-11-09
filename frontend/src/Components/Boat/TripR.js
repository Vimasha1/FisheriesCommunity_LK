import React, { useState } from 'react';
import BoatNavbar from './BoatNavbar';  
import SideNav from '../../SideNav';  
import Header from '../../Header';  
import Footer from '../../Footer';  

function TripR() {
    const [boatNumber, setBoatNumber] = useState('');
    const [numEmployees, setNumEmployees] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log({
            boatNumber,
            numEmployees,
            ownerName,
            departureTime,
            arrivalTime
        });
    };

    return (
        <div className="flex min-h-screen bg-blue-50">
            {/* Side Navbar */}
            <SideNav />

            {/* Main Content Area */}
            <div className="ml-56 flex-grow flex flex-col">
                {/* Header */}
                <Header />

                {/* Boat Navbar */}
                <BoatNavbar />

                {/* Boat Trip Registration Form */}
                <div className="flex-grow flex items-center justify-center py-10">
                    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Boat Trip Registration</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Boat Number */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Enter Boat Number:
                                </label>
                                <input
                                    type="text"
                                    value={boatNumber}
                                    onChange={(e) => setBoatNumber(e.target.value)}
                                    required
                                    placeholder="Boat Number"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Number of Employees */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Number of Employees:
                                </label>
                                <input
                                    type="number"
                                    value={numEmployees}
                                    onChange={(e) => setNumEmployees(e.target.value)}
                                    required
                                    placeholder="Number of Employees"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Owner Name */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Owner Name:
                                </label>
                                <input
                                    type="text"
                                    value={ownerName}
                                    onChange={(e) => setOwnerName(e.target.value)}
                                    required
                                    placeholder="Owner Name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Departure Time */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Departure Time:
                                </label>
                                <input
                                    type="time"
                                    value={departureTime}
                                    onChange={(e) => setDepartureTime(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Arrival Time */}
                            <div className="relative">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Arrival Time:
                                </label>
                                <input
                                    type="time"
                                    value={arrivalTime}
                                    onChange={(e) => setArrivalTime(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default TripR;
