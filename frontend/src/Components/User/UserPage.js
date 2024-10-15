// UserPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Payment from './5187967.jpg';
import details from './4932756.jpg'
import member from './8071610.jpg'
import memdetail from './6670916.jpg'


const UserPage = () => {
  const navigate = useNavigate();

  return (
    <div className="user-page">
      <h2 className="title">User Dashboard</h2>
      <div className="button-container">
        <button 
          className="button"
          onClick={() => navigate('/make-payment')}
        >
          <img src={Payment} alt="Make Payment" className="button-image" />
          <span className="button-text">Make Payment</span>
        </button>
        <button 
          className="button"
          onClick={() => navigate('/payment-details')}
        >
          <img src={details} alt="Payment Details" className="button-image" />
          <span className="button-text">Payment Details</span>
        </button>
        <button 
          className="button"
          onClick={() => navigate('/community-member')}
        >
          <img src={member} alt="Register Member" className="button-image" />
          <span className="button-text">Register Member</span>
        </button>
        <button 
          className="button"
          onClick={() => navigate('/my-details')}
        >
          <img src={memdetail} alt="Member Details" className="button-image" />
          <span className="button-text">Member Details</span>
        </button>
      </div>
    </div>
  );
};

export default UserPage;
