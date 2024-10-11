import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./Components/Home/Home";
import AddNewScock from './Components/stock/AddStock';
import BoatUpdate from './Components/Boat/BoatUpdate';
import UpdateScock from './Components/stock/UpdateStock';
import BoatRD from './Components/Boat/BoatRD';
import TripD from './Components/Boat/TripD';
import TripR from './Components/Boat/TripR';
import BoatR from './Components/Boat/BoatRegester';
import ViewStock from './Components/stock/ViewStock';
import Loan from './Components/Loan/Loan';
import Addrequest from './Components/Loan/Addrequest';
import Requests from './Components/Loan/Requests';
import Updaterequest from './Components/Loan/Updaterequest';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Contactadmin from './Components/Loan/Contactadmin';
import Uploadcollateral from './Components/Loan/Uploadcollateral';
import Complaints from './Components/Complain/ComplaintDetails';
import ComplaintForm from './Components/Complain/ComplaintForm';
import Process from './Components/Complain/Process';
import CommunityMemberForm from './Components/User/CommunityMemberForm';
import UserPage from './Components/User/UserPage';
import UpdateMember from './Components/User/UpdateMember';
import MyDetails from './Components/User/MyDetails';
import PaymentGateway from './Components/User/PaymentGateway';
import PaymentDetails from './Components/User/PaymentDetails';
import SignupPage from "./Components/account/SignupPage";
import LoginPage from "./Components/account/LoginPage";
import HomeScreen from "./Components/Event/HomePage";
import AdminPage from "./pages/AdminPage";
import UserProfilePage from "./pages/UserProfilePage";
import BookingPage from "./Components/Event/BookingPage";
import EventDetails from "./Components/Event/EventDetails";
//import supplier management
import SupplierRegister from './Components/supplier/SupplierRegister';
import SupplierList from './Components/supplier/SupplierList';

function App() {
    const currentUser = localStorage.getItem("currentUser"); // Check if the user is logged in
   

    return (
        <React.Fragment>
            <Routes>
                {/* Public Routes (Login and Signup) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                
                {/* Protected Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/mainhome" element={currentUser ? <Home /> : <Navigate to="/login" />} />
                <Route path="/viewstock" element={currentUser ? <ViewStock /> : <Navigate to="/login" />} />
                <Route path="/AddNewStock" element={currentUser ? <AddNewScock /> : <Navigate to="/login" />} />
                <Route path="/addstock/:id" element={currentUser ? <UpdateScock /> : <Navigate to="/login" />} />
                
                <Route path="/BoatRegistration" element={currentUser ? <BoatR /> : <Navigate to="/login" />} />
                <Route path="/BoatDetails" element={currentUser ? <BoatRD /> : <Navigate to="/login" />} />
                <Route path="/BoatDetails/:id" element={currentUser ? <BoatUpdate /> : <Navigate to="/login" />} />
                <Route path="/Schedule" element={currentUser ? <TripR /> : <Navigate to="/login" />} />
                <Route path="/ScheduleDetails" element={currentUser ? <TripD /> : <Navigate to="/login" />} />
                
                <Route path="/mainloan" element={currentUser ? <Loan /> : <Navigate to="/login" />} />
                <Route path="/addrequest" element={currentUser ? <Addrequest /> : <Navigate to="/login" />} />
                <Route path="/requestdetails" element={currentUser ? <Requests /> : <Navigate to="/login" />} />
                <Route path="/regi" element={currentUser ? <Register /> : <Navigate to="/login" />} />
                <Route path="/log" element={currentUser ? <Login /> : <Navigate to="/login" />} />
                <Route path="/contact" element={currentUser ? <Contactadmin /> : <Navigate to="/login" />} />
                <Route path="/upload" element={currentUser ? <Uploadcollateral /> : <Navigate to="/login" />} />
                <Route path="/requestdetails/:id" element={currentUser? <Updaterequest /> : <Navigate to="/login" />} />

                <Route path="/add-complaint" element={currentUser ? <ComplaintForm /> : <Navigate to="/login" />} />
                <Route path="/process" element={currentUser ? <Process /> : <Navigate to="/login" />} />
                <Route path="/complaint-details" element={currentUser ? <Complaints /> : <Navigate to="/login" />} />
                
                <Route path="/community-member" element={currentUser ? <CommunityMemberForm /> : <Navigate to="/login" />} />
                <Route path="/payment-details" element={currentUser ? <PaymentDetails /> : <Navigate to="/login" />} />
                <Route path="/userpage" element={currentUser ? <UserPage /> : <Navigate to="/login" />} />
                <Route path="/my-details" element={currentUser ? <MyDetails /> : <Navigate to="/login" />} />
                <Route path="/update-member/:id" element={currentUser ? <UpdateMember /> : <Navigate to="/login" />} />
                <Route path="/make-payment" element={currentUser ? <PaymentGateway /> : <Navigate to="/login" />} />

                <Route path="/eventDetails" element={currentUser ? <EventDetails /> : <Navigate to="/login" />} />
                <Route path="/admin/*" element={currentUser ? <AdminPage /> : <Navigate to="/login" />} />
                <Route path="/*" element={currentUser ? <HomeScreen /> : <Navigate to="/login" />} />

                <Route path="/booking/:id" element={currentUser ? <BookingPage /> : <Navigate to="/login" />} />
                <Route path="/profile" element={currentUser ? <UserProfilePage /> : <Navigate to="/login" />} />
                {/* Supplier management */}
                <Route path="/supplier" element={currentUser? <SupplierRegister /> : <Navigate to="/login" />} />
                <Route path="/supplierList" element={currentUser? <SupplierList/>  : <Navigate to="/login" /> } />
                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;
