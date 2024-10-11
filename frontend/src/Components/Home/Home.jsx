import React from 'react';
import Header from '../../Header';
import Footer from '../../Footer';
import SideNav from '../../SideNav';


import BoatImg from '../../assests/Boat-removebg-preview.png';
import ComplaintImg from '../../assests/Complaint-removebg-preview.png';
import DailyFishImg from '../../assests/Daily_Fish_Stock-removebg-preview.png';
import EmployeeImg from '../../assests/Employee-removebg-preview.png';
import EventImg from '../../assests/event-removebg-preview.png';
import LoanImg from '../../assests/Loan-removebg-preview.png';
import WholesalerImg from '../../assests/wholesaler-removebg-preview.png';
import CommunityImg from '../../assests/null.png';

const Home = () => {
  const boxes = [
    { id: 1, image: BoatImg, name: 'Boat Management', link: '/BoatRegistration' },
    { id: 2, image: ComplaintImg, name: 'Complaint Management', link: '/add-complaint' },
    { id: 3, image: DailyFishImg, name: 'Daily Fish Stock Management', link: '/AddNewStock' },
    { id: 4, image: EmployeeImg, name: 'Employee Management', link: '#' },
    { id: 5, image: EventImg, name: 'Event Management', link: '/event' },
    { id: 6, image: LoanImg, name: 'Loan Requests Management', link: '/mainloan' },
    { id: 7, image: WholesalerImg, name: 'Supplier Management', link: '/supplier' },
    { id: 8, image: CommunityImg, name: 'Community Management', link: '/community-member' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="ml-56 flex-grow flex flex-col bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Section */}
        <main className="p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {boxes.map((box) => (
              <div 
                key={box.id} 
                className="relative bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 group"
              >
                <a href={box.link} className="block">
                  <img 
                    src={box.image} 
                    alt={box.name} 
                    className="w-28 h-28 mx-auto mb-3 object-contain transition-transform transform group-hover:scale-110"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-blue-800 text-center">{box.name}</h3>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-100 opacity-0 group-hover:opacity-30 transition-opacity rounded-2xl"></div>
                </a>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
