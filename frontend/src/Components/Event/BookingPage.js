import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';  
import SideNav from '../../SideNav'; 
import Footer from '../../Footer';  
import EventNav from './EventNav';   

const BookingPage = () => {
    const { id } = useParams(); 
    const [event, setEvent] = useState(null); 
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        ticketQuantity: 1,
        ticketType: '',
        specialRequests: ''
    });
   
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser ? currentUser.userID : null; 

    useEffect(() => {
        
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/tickets/getTickets/${id}`);
                setEvent(response.data); 
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
            const response = await axios.post('http://localhost:5000/api/bookings/create', bookingData);
            if (response.status === 201) {
                alert('Booking created successfully!');
            } else {
                console.error('Error creating booking:', response.data.message);
            }
        } catch (error) {
            console.error('Error submitting the booking:', error);
        }
    };

    return (
        <div className="flex">
            <SideNav /> {/* Side Navigation */}

            <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-white">
                <Header /> {/* Header Component */}
                
                <EventNav /> {/* EventNav Component */}

                {/* Event Details Section */}
                <section className="max-w-7xl mx-auto p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Event Image */}
                        {event && (
                            <div className="bg-white shadow-lg rounded-lg p-6">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="rounded-lg w-full h-96 object-cover mb-4"
                                />
                                <h2 className="text-3xl font-bold text-blue-700 mb-4">{event.title}</h2>
                                <p className="text-lg text-gray-600">{event.description}</p>
                            </div>
                        )}

                        {/* Booking Form */}
                        <div className="bg-white shadow-lg rounded-lg p-8">
                            <h1 className="text-3xl font-bold text-blue-700 mb-6">Reserve Your Event Tickets</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="fullName" className="block text-lg font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="johndoe@example.com"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="07X XXXXXXX"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="ticketQuantity" className="block text-lg font-semibold text-gray-700 mb-2">Number of Tickets</label>
                                    <input
                                        type="number"
                                        id="ticketQuantity"
                                        name="ticketQuantity"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={formData.ticketQuantity}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="ticketType" className="block text-lg font-semibold text-gray-700 mb-2">Ticket Type</label>
                                    <select
                                        id="ticketType"
                                        name="ticketType"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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

                                <div className="mb-6">
                                    <label htmlFor="specialRequests" className="block text-lg font-semibold text-gray-700 mb-2">Special Requests</label>
                                    <textarea
                                        id="specialRequests"
                                        name="specialRequests"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        placeholder="Any special requests?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white font-semibold p-4 rounded-lg hover:bg-blue-600 transition"
                                >
                                    Confirm Booking
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <Footer /> {/* Footer Component */}
            </div>
        </div>
    );
};

export default BookingPage;
