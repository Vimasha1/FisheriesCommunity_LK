import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import DatePicker for date input
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles
import { format } from "date-fns"; // For formatting the date
import { FaSearch, FaGlobe, FaCalendarAlt } from "react-icons/fa"; // Import icons
import Header from '../../Header'; // Importing Header component
import SideNav from '../../SideNav'; // Importing SideNav component
import Footer from '../../Footer'; // Importing Footer component
import EventNav from './EventNav'; // Importing the new EventNav

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // To store selected date
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tickets/getTickets");
      setEvents(response.data.tickets || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCardClick = (eventId) => {
    navigate(`/booking/${eventId}`);
  };

  const filteredEvents = events.filter((event) => {
    const searchTextMatch =
      (event.title && event.title.toLowerCase().includes(searchText.toLowerCase())) ||
      (event.description && event.description.toLowerCase().includes(searchText.toLowerCase()));

    const locationMatch = selectedLocation === "" || event.location === selectedLocation;

    const dateMatch =
      selectedDate === null || 
      format(new Date(event.date), "MM/dd/yyyy") === format(selectedDate, "MM/dd/yyyy");

    return searchTextMatch && locationMatch && dateMatch;
  });

  return (
    <div className="flex">
      <SideNav /> {/* Side Navigation */}

      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-white">
        <Header /> {/* Header Component */}

        {/* Event Navigation */}
        <EventNav /> {/* EventNav Component */}

        {/* Hero Section */}
        <section className="p-10 bg-blue-50 shadow-lg rounded-lg text-center max-w-5xl mx-auto mb-10 hover:shadow-2xl transition duration-300 mt-6">
  <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Fisheries Community Events</h1>
  <p className="text-gray-600 text-lg">
    Join us for our upcoming community events and activities! Stay updated on the latest happenings.
  </p>
</section>


        {/* Redesigned Search and Filters Section */}
        <section className="p-6 bg-white shadow-lg rounded-xl max-w-6xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 shadow-lg hover:shadow-xl"
                placeholder="Search Events"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Location Select */}
            <div className="relative">
              <FaGlobe className="absolute left-4 top-3 text-gray-400" />
              <select
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 shadow-lg hover:shadow-xl"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option value="Galle">Galle</option>
                <option value="Colombo">Colombo</option>
                <option value="Mathara">Mathara</option>
                <option value="Kandy">Kandy</option>
              </select>
            </div>

            {/* Date Picker with Icon */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-3 text-gray-400" />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)} // Handle date change
                placeholderText="Select Date"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                dateFormat="MM/dd/yyyy" // Specify the date format
              />
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-10">
          <h3 className="text-3xl font-bold text-blue-700 mb-6">Upcoming Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="border border-gray-200 p-4 rounded-lg shadow-lg bg-white hover:bg-blue-100 hover:shadow-xl transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                  onClick={() => handleCardClick(event._id)}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-500 text-sm">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h4 className="text-xl font-bold text-blue-600">{event.title}</h4>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No upcoming events found.</p>
            )}
          </div>
        </section>

        {/* Footer */}
        <Footer /> {/* Footer Component */}
      </div>
    </div>
  );
};

export default HomePage;
