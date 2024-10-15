import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
    const { id } = useParams(); // Get event ID from URL
    const [event, setEvent] = useState(null); // Store event data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        ticketQuantity: 1,
        ticketType: '',
        specialRequests: ''
    });
    //get user id in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.userID : null; // Safely get userID

    useEffect(() => {
        // Fetch event details using the eventId (ticket_id)
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`/api/tickets/getTickets/${id}`);
                setEvent(response.data); // Set event data once it's fetched
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };
        fetchEventDetails();
    }, [id]);

    // Handle form data changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          // Prepare the booking data to be sent to the backend
          const bookingData = {
              userId: userId, 
              ticketId: id,   
              fullName: formData.fullName,
              ticketQuantity: formData.ticketQuantity,
              userEmail: formData.email,
              userPhone: formData.phone,
              ticketType: formData.ticketType,
              specialRequests: formData.specialRequests,
          };
  
          // Make an API call to the backend to create the booking
          const response = await axios.post('/api/bookings/create', bookingData);
  
          if (response.status === 201) {
              alert('Booking created successfully!');
              // Optionally, you can redirect the user or clear the form
          } else {
              console.error('Error creating booking:', response.data.message);
          }
      } catch (error) {
          console.error('Error submitting the booking:', error);
      }
  };

  
  

    return (
        <div className="main_container">
            <div className="booking-container">
                {/* Left half for event image */}
                <div className="booking-image-container">
                    {event && <img src={event.image} alt={event.title} className="event-image" />}
                </div>

                {/* Right half for booking form */}
                <div className="booking-form-container">
                    <h1 className="event-title">Reserve Your Event Tickets</h1>
                    <p className="event-subtitle">Fill out the details below to book your tickets.</p>

                    <form className="event-booking-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName" className="form-label">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="form-input"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="johndoe@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="form-input"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="07X XXXXXXX"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ticketQuantity" className="form-label">Number of Tickets</label>
                            <input
                                type="number"
                                id="ticketQuantity"
                                name="ticketQuantity"
                                className="form-input"
                                value={formData.ticketQuantity}
                                onChange={handleChange}
                                required
                                min="1"
                                placeholder="1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ticketType" className="form-label">Ticket Type</label>
                            <select
                                id="ticketType"
                                name="ticketType"
                                className="ticket_type"
                                value={formData.ticketType}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a ticket type</option>
                                <option value="Standard">Standard</option>
                                <option value="VIP">VIP</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="specialRequests" className="form-label">Special Requests</label>
                            <textarea
                                id="specialRequests"
                                name="specialRequests"
                                className="form-textarea"
                                value={formData.specialRequests}
                                onChange={handleChange}
                                placeholder="Any special requests?"
                            />
                        </div>

                        <button type="submit" className="tkt_submit_btn">Confirm Booking</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
