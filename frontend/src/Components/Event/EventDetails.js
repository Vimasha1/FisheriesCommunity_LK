import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Modal, Input } from "antd";
import Header from "../../Header";
import SideNav from "../../SideNav";
import Footer from "../../Footer";
import EventNav from "./EventNav";
import { FaEdit, FaTrashAlt, FaDownload, FaEnvelope } from "react-icons/fa"; // Import React Icons
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
  const [emailData, setEmailData] = useState({
    totalAmount: "",
    description: "",
  });
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState({
    fullName: true,
    ticketQuantity: true,
    ticketType: true,
    userEmail: false,
    userPhone: false,
    specialRequest: false,
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

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const handleSendEmail = async () => {
    try {
      const emailPayload = {
        totalAmount: emailData.totalAmount,
        description: emailData.description,
        recipient: "managerfinancial300@gmail.com",
      };

      await axios.post("http://localhost:5005/api/tickets/notifyManager", emailPayload);
      message.success("Email sent successfully to managerfinancial300@gmail.com.");
      setIsEmailModalOpen(false); // Close modal after sending
      // Reset email data
      setEmailData({
        totalAmount: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to send email", error);
      message.error("Failed to send email. Please try again.");
    }
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

  const handleCancelEdit = () => {
    setIsEditing(false);
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
    const tableColumn = [
      selectedFields.fullName ? "Full Name" : null,
      selectedFields.ticketQuantity ? "Quantity" : null,
      selectedFields.ticketType ? "Ticket Type" : null,
      selectedFields.userEmail ? "Email" : null,
      selectedFields.userPhone ? "Phone" : null,
      selectedFields.specialRequest ? "Special Request" : null,
    ].filter(Boolean); // Filter out null values

    const tableRows = bookings.map((booking) => [
      selectedFields.fullName ? booking.fullName : null,
      selectedFields.ticketQuantity ? booking.ticketQuantity : null,
      selectedFields.ticketType ? booking.ticketType : null,
      selectedFields.userEmail ? booking.userEmail : null,
      selectedFields.userPhone ? booking.userPhone : null,
      selectedFields.specialRequest ? booking.specialRequest || "None" : null,
    ].filter(Boolean)); // Filter out null values

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      styles: { halign: "left" },
    });

    doc.save("event-booking-report.pdf");
  };

  const handleFieldChange = (field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center"
            >
              <FaEnvelope className="mr-2" /> Send Email
            </button>
          </div>

          {/* Field Selection for Report */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Select Fields for Report:</h2>
            {Object.keys(selectedFields).map((field) => (
              <label key={field} className="block mt-2">
                <input
                  type="checkbox"
                  checked={selectedFields[field]}
                  onChange={() => handleFieldChange(field)}
                />
                {` ${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`}
              </label>
            ))}
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
                    <tr key={booking._id}>
                      <td className="px-4 py-2">
                        {isEditing && formData._id === booking._id ? (
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          booking.fullName
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing && formData._id === booking._id ? (
                          <input
                            type="number"
                            name="ticketQuantity"
                            value={formData.ticketQuantity}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          booking.ticketQuantity
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing && formData._id === booking._id ? (
                          <input
                            type="text"
                            name="ticketType"
                            value={formData.ticketType}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          booking.ticketType
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing && formData._id === booking._id ? (
                          <input
                            type="email"
                            name="userEmail"
                            value={formData.userEmail}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          booking.userEmail
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing && formData._id === booking._id ? (
                          <input
                            type="text"
                            name="userPhone"
                            value={formData.userPhone}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          booking.userPhone
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {isEditing && formData._id === booking._id ? (
                          <input
                            type="text"
                            name="specialRequest"
                            value={formData.specialRequest}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          booking.specialRequest || "None"
                        )}
                      </td>
                      <td className="px-4 py-2 flex space-x-2">
                        {isEditing && formData._id === booking._id ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="text-green-500 hover:text-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditBooking(booking)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteBooking(booking._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <FaTrashAlt />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Email Modal */}
        <Modal
          title="Send Email to Manager"
          visible={isEmailModalOpen}
          onCancel={() => setIsEmailModalOpen(false)}
          footer={[
            <button
              key="back"
              onClick={() => setIsEmailModalOpen(false)}
              className="ant-btn ant-btn-default"
            >
              Cancel
            </button>,
            <button
              key="submit"
              type="submit"
              className="ant-btn ant-btn-primary"
              onClick={handleSendEmail}
            >
              Send Email
            </button>,
          ]}
        >
          <div className="flex flex-col">
            <label className="mb-2">Total Amount:</label>
            <Input
              type="text"
              name="totalAmount"
              value={emailData.totalAmount}
              onChange={handleEmailInputChange}
              className="mb-4"
            />
            <label className="mb-2">Description:</label>
            <Input.TextArea
              name="description"
              value={emailData.description}
              onChange={handleEmailInputChange}
              className="mb-4"
            />
          </div>
        </Modal>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
}

export default EventDetails;
