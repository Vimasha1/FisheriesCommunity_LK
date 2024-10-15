import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dash.css'; 
import SideNav from './SideNav';

const Dash = () => {
  const [boxes] = useState([
    { id: 1, image: '/Boat-removebg-preview.png', name: 'Boat Management', link: '#' },
    { id: 2, image: '/Complaint-removebg-preview.png', name: 'Complaint Management', link: '#' },
    { id: 3, image: '/Daily_Fish_Stock-removebg-preview.png', name: 'Daily Fish Stock Management', link: '/AddNewStock' }, // Correct path
    { id: 4, image: '/Employee-removebg-preview.png', name: 'Employee Management', link: '#' },
    { id: 5, image: '/event-removebg-preview.png', name: 'Event Management', link: '#' },
    { id: 7, image: '/Loan-removebg-preview.png', name: 'Loan Requests Management', link: '#' },
    { id: 8, image: '/wholesaler-removebg-preview.png', name: 'Wholesaler Management', link: '#' },
    { id: 6, image: '/null.png', name: 'Community Management', link: '#' },
  ]);

  return (
    <div className="dash-container">
      <SideNav />
      {boxes.map((box, index) => (
        <div key={index} className="dash-item">
          <Link to={box.link}> {/* Use Link for proper routing */}
            <img src={box.image} alt={`Image ${box.id}`} />
            <p>{box.name}</p> {/* Adding the name under the image */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Dash;
