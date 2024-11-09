import React, { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import Header from "../../Header";
import SideNav from "../../SideNav";
import Footer from "../../Footer";
import EventNav from "./EventNav";
import { FaEdit, FaTrashAlt, FaDownload } from "react-icons/fa"; // Import React Icons
import jsPDF from "jspdf";
import "jspdf-autotable"; // To use autoTable for structured tables

function EventDetails() {
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    ticketQuantity: 1,
    ticketType: "",
    userEmail: "",
    userPhone: "",
    specialRequest: "",
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bookings/all");
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      message.error("Failed to fetch bookings. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditBooking = (booking) => {
    setIsEditing(true);
    setFormData({
      _id: booking._id,
      fullName: booking.fullName,
      ticketQuantity: booking.ticketQuantity,
      ticketType: booking.ticketType,
      userEmail: booking.userEmail,
      userPhone: booking.userPhone,
      specialRequest: booking.specialRequest,
    });
  };

  const updateBooking = async (updatedBooking) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${updatedBooking._id}`,
        updatedBooking
      );
      return response.data;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      await updateBooking(formData);
      setIsEditing(false);
      fetchBookings();
      message.success("Booking updated successfully.");
    } catch (error) {
      console.error("Failed to update booking", error);
      message.error("Failed to update booking. Please try again.");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId)
      );
      message.success("Booking deleted successfully");
    } catch (error) {
      console.error("Failed to delete booking", error);
      message.error("Failed to delete booking. Please try again.");
    }
  };

  // Function to download the booking report as a PDF
  const handleDownloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Event Booking Report", 14, 20);

    // Add table with autoTable plugin
    const tableColumn = ["Full Name", "Quantity", "Ticket Type", "Email", "Phone", "Special Request"];
    const tableRows = bookings.map((booking) => [
      booking.fullName,
      booking.ticketQuantity,
      booking.ticketType,
      booking.userEmail,
      booking.userPhone,
      booking.specialRequest || "None",
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      styles: { halign: "left" },
    });

    doc.save("event-booking-report.pdf");
  };

  return (
    <div className="flex">
      <SideNav /> {/* Side Navigation */}
      <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-white">
        <Header /> {/* Header Component */}
        <EventNav /> {/* Event Navigation */}

        {/* Booking Details Section */}
        <section className="p-8 max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-blue-700 mb-10 mt-6">
              Your Bookings
            </h1>
            {/* Report Download Button */}
            <button
              onClick={handleDownloadReport}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 flex items-center"
            >
              <FaDownload className="mr-2" /> Download Report
            </button>
          </div>

          {/* Display Bookings in Table Format */}
          {bookings.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-600">No bookings found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-white shadow-md rounded-lg">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Full Name</th>
                    <th className="px-4 py-2 text-left">Ticket Quantity</th>
                    <th className="px-4 py-2 text-left">Ticket Type</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Phone</th>
                    <th className="px-4 py-2 text-left">Special Request</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="border-t">
                      <td className="px-4 py-2">{booking.fullName}</td>
                      <td className="px-4 py-2">{booking.ticketQuantity}</td>
                      <td className="px-4 py-2">{booking.ticketType}</td>
                      <td className="px-4 py-2">{booking.userEmail}</td>
                      <td className="px-4 py-2">{booking.userPhone}</td>
                      <td className="px-4 py-2">
                        {booking.specialRequest || "None"}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleEditBooking(booking)}
                          className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                          <FaEdit className="inline mr-1" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking._id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-200 ml-2"
                        >
                          <FaTrashAlt className="inline mr-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Edit Booking Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg z-50 mt-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Booking</h3>
              <div className="space-y-4">
                <label className="block">
                  Full Name:
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block">
                  Ticket Quantity:
                  <input
                    type="number"
                    name="ticketQuantity"
                    value={formData.ticketQuantity}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block">
                  Ticket Type:
                  <input
                    type="text"
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block">
                  Email:
                  <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block">
                  Phone:
                  <input
                    type="tel"
                    name="userPhone"
                    value={formData.userPhone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
                <label className="block">
                  Special Request:
                  <textarea
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </label>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <Footer /> {/* Footer Component */}
      </div>
    </div>
  );
}

export default EventDetails;
