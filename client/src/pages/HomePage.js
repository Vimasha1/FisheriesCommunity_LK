import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState(""); // For search filter
  const [selectedLocation, setSelectedLocation] = useState(""); // For location filter
  const [selectedTime, setSelectedTime] = useState(""); // For time filter
  const navigate = useNavigate();

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/tickets/getTickets");
      setEvents(response.data.tickets || []); // Safeguard if `tickets` is undefined
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle event card click
  const handleCardClick = (eventId) => {
    navigate(`/booking/${eventId}`); // Navigate to booking page with event ID
  };

  // Filter events based on search, location, and time
const filteredEvents = events.filter((event) => {
  const searchTextMatch =
    (event.title && event.title.toLowerCase().includes(searchText.toLowerCase())) || // Safeguard: check if `title` exists
    (event.description && event.description.toLowerCase().includes(searchText.toLowerCase())); // Safeguard: check if `description` exists

  const locationMatch =
    selectedLocation === "" || event.location === selectedLocation; // Filter by location

  const timeMatch =
    selectedTime === "" ||
    selectedTime === "Any date" ||
    new Date(event.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) === selectedTime; // Filter by time

  return searchTextMatch && locationMatch && timeMatch;
});


  return (
    <div className="HE_home_container">
      <section className="HE_hero_section">
        <div className="HE_hero_content">
          <h1 className="HE_logo">Eventick</h1>
          <h2 className="HE_hero_title">
            SBS MTV The Kpop Show Ticket Package
          </h2>
          <p className="HE_hero_text">
            Look no further! Our SBS The Show tickets are the simplest way for
            you to experience a live Kpop recording.
          </p>
          <div className="HE_hero_buttons">
            <button className="HE_get_ticket_button">Get Ticket</button>
            <button className="HE_learn_more_button">Learn More</button>
          </div>
        </div>
      </section>

      <section className="HE_event_search">
        <input
          type="text"
          className="HE_search_input"
          placeholder="Search Event"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Update search text
        />
        <select
          className="HE_search_select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)} // Update location filter
        >
          <option value="">Place</option>
          <option value="Galle">Galle</option>
          <option value="Colombo">Colombo</option>
          <option value="Mathara">Mathara</option>
          <option value="Kandy">Kandy</option>
        </select>
        <select
          className="HE_search_select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)} // Update time filter
        >
          <option value="">Time</option>
          <option value="Any date">Any date</option>
          {/* Add more options based on the event dates */}
        </select>
      </section>

      <section className="HE_upcoming_events">
        <h3 className="HE_upcoming_title">Upcoming Events</h3>
        <div className="HE_event_cards">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event._id}
                className="HE_event_card"
                onClick={() => handleCardClick(event._id)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="HE_event_image"
                />
                <p className="HE_event_date">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h4 className="HE_event_name">{event.title}</h4>
                <p className="HE_event_location">{event.location}</p>
              </div>
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </div>
        <button className="HE_load_more_button">Load More</button>
      </section>
    </div>
  );
};

export default HomePage;
