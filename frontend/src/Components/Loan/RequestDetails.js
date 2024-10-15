import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RequestDetails(props) {
  const { _id, name, membership, gmail, phone, amount } = props.request;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this request?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5005/requests/${_id}`);
        window.alert('Request Deleted Successfully');
        navigate('/requestdetails');
        window.location.reload(); 
      } catch (error) {
        console.error('Error deleting request:', error);
      }
    }
  };

    // Handler for sending a WhatsApp message
    const handleSendWhatsAppMessage = () => {
      const message = `Hello ${name},\n\nThis is the Treasurer from the Fisheries Community. We're happy to inform you that your loan request of Rs. ${amount} has been approved! Please visit us to collect your funds at your earliest convenience.\n\nBest regards,\nThe Fisheries Community Team`;
      const WhatsAppURL = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
      window.open(WhatsAppURL, '_blank'); // Opens WhatsApp in a new tab
    };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Loan Request Details</h2>
      <h3 className="text-lg text-gray-600">ID: <span className="font-semibold">{_id}</span></h3>
      <h3 className="text-lg text-gray-600">Name: <span className="font-semibold">{name}</span></h3>
      <h3 className="text-lg text-gray-600">Membership: <span className="font-semibold">{membership}</span></h3>
      <h3 className="text-lg text-gray-600">Gmail: <span className="font-semibold">{gmail}</span></h3>
      <h3 className="text-lg text-gray-600">Phone: <span className="font-semibold">{phone}</span></h3>
      <h3 className="text-lg text-gray-600">Amount: <span className="font-semibold">{amount}</span></h3>

      {/* Update and Delete Button Styling */}
      <div className="flex justify-between mt-6 space-x-4">
        <Link
          to={`/requestdetails/${_id}`}
          className="bg-blue-500 text-white w-full px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Update
        </Link>
        <button
          onClick={deleteHandler}
          className="bg-red-500 text-white w-full px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
        >
          Delete
        </button>
        <button
          onClick={handleSendWhatsAppMessage}
          className="bg-green-500 text-white w-full px-5 py-3 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          Approve
       </button>
        
      </div>
    </div>
  );
}

export default RequestDetails;
