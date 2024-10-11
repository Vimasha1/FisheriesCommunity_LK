import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate for react-router-dom v6+
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from '../../Header';  
import SideNav from '../../SideNav';  
import ComplainNav from './ComplainNav';  
import Footer from '../../Footer';  

Chart.register(ArcElement, Tooltip, Legend);

Modal.setAppElement('#root'); // Ensure accessibility by defining the root element for modal

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [note, setNote] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const navigate = useNavigate();  // useNavigate hook from react-router-dom v6+

    // Check for email in localStorage on component mount
    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email !== 'complain@gmail.com') {
            localStorage.clear(); // Clear localStorage
            navigate('/login'); // Redirect to login page
        }
    }, [navigate]);

    useEffect(() => {
        fetchComplaints();
    }, []);

    useEffect(() => {
        filterComplaintsByStatus();
    }, [statusFilter, complaints]);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5005/complaints');
            setComplaints(res.data || []);
        } catch (err) {
            setError('Failed to fetch complaints');
        } finally {
            setLoading(false);
        }
    };

    const filterComplaintsByStatus = () => {
        setFilteredComplaints(
            statusFilter === 'All'
                ? complaints
                : complaints.filter(complaint => complaint.status === statusFilter)
        );
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const openEditModal = () => setEditModalIsOpen(true);
    const closeEditModal = () => setEditModalIsOpen(false);

    const downloadGraph = () => {
        const chartCanvas = document.getElementById('complaintPieChart');
        html2canvas(chartCanvas).then(canvas => {
            const link = document.createElement('a');
            link.download = 'complaint_analysis.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    const handleChange = async (id, updates) => {
        try {
            await axios.put(`http://localhost:5005/complaints/${id}`, updates);
            fetchComplaints();
        } catch (err) {
            console.error('Update failed:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5005/complaints/${id}`);
            fetchComplaints();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const handleEdit = (complaint) => {
        setSelectedComplaint(complaint);
        setNote(complaint.note || '');
        openEditModal();
    };

    const handleUpdate = async () => {
        if (!selectedComplaint) return;
        await handleChange(selectedComplaint._id, { note, ...selectedComplaint });
        setSelectedComplaint(null);
        closeEditModal();
    };

    const calculateCategoryDistribution = () => {
        const categoryCounts = complaints.reduce((acc, { category }) => {
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        const labels = ['Finance', 'Sales', 'BoatTrip', 'Employees', 'Event', 'Others'];
        return {
            labels,
            data: labels.map(label => categoryCounts[label] || 0),
        };
    };

    const { labels, data } = calculateCategoryDistribution();
    const pieData = {
        labels,
        datasets: [{ data, backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'] }],
    };

    return (
        <div className="flex">
            <SideNav />
            <div className="ml-56 flex-grow flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
                <Header />
                <ComplainNav />

                <div className="p-8">
                    <h1 className="text-4xl font-bold text-blue-700 mb-6">Received Complaints</h1>

                    {loading && <p>Loading complaints...</p>}
                    {error && <p>{error}</p>}

                    {!loading && !error && (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div className="tabs space-x-4">
                                    {['All', 'Pending', 'In Progress', 'Resolved'].map(status => (
                                        <button
                                            key={status}
                                            className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 
                                            ${statusFilter === status ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'}`}
                                            onClick={() => setStatusFilter(status)}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>

                                <button onClick={openModal} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow-md">
                                    View Analysis
                                </button>
                            </div>

                            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gray-200 text-gray-600">
                                    <tr>
                                        <th className="p-4 text-left">Complaint ID</th>
                                        <th className="p-4 text-left">Email</th>
                                        <th className="p-4 text-left">Type</th>
                                        <th className="p-4 text-left">Description</th>
                                        <th className="p-4 text-left">Assigned Staff</th>
                                        <th className="p-4 text-left">Status</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredComplaints.length > 0 ? (
                                        filteredComplaints.map((complaint) => (
                                            <tr key={complaint._id} className="border-b hover:bg-gray-50">
                                                <td className="p-4">{complaint.complaintId}</td>
                                                <td className="p-4">{complaint.mailId}</td>
                                                <td className="p-4">{complaint.category}</td>
                                                <td className="p-4">{complaint.description}</td>
                                                <td className="p-4">
                                                    <select
                                                        className="rounded-lg p-2 border border-gray-300 focus:ring focus:ring-blue-300"
                                                        value={complaint.assignedStaff || ''}
                                                        onChange={(e) => handleChange(complaint._id, { assignedStaff: e.target.value })}
                                                    >
                                                        <option value="">Choose...</option>
                                                        <option value="Treasurer">Treasurer</option>
                                                        <option value="Boat Register">Boat Register</option>
                                                        <option value="Employee Manager">Employee Manager</option>
                                                        <option value="Sales Staff">Sales Staff</option>
                                                        <option value="Events Staff">Events Staff</option>
                                                    </select>
                                                </td>
                                                <td className="p-4">
                                                    <select
                                                        className="rounded-lg p-2 border border-gray-300 focus:ring focus:ring-blue-300"
                                                        value={complaint.status}
                                                        onChange={(e) => handleChange(complaint._id, { status: e.target.value })}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="In Progress">In Progress</option>
                                                        <option value="Resolved">Resolved</option>
                                                    </select>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex justify-center space-x-4">
                                                        <button
                                                            onClick={() => handleEdit(complaint)}
                                                            className="text-blue-500 hover:text-blue-700 transform transition-transform hover:scale-110"
                                                        >
                                                            <i className="fas fa-pencil-alt text-xl"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(complaint._id)}
                                                            className="text-red-500 hover:text-red-700 transform transition-transform hover:scale-110"
                                                        >
                                                            <i className="fas fa-trash-alt text-xl"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="p-4 text-center text-gray-500">No complaints available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

                <Footer />

                {/* Pie Chart Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Complaint Analysis"
                    style={{
                        content: {
                            width: '30%',
                            height: '50%',
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '10px',
                            padding: '20px',
                            backgroundColor: 'white',
                        },
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        },
                    }}
                >
                    <h2 className="text-2xl font-bold mb-4">Complaint Category Distribution</h2>
                    <Pie data={pieData} id="complaintPieChart" />
                    <div className="flex justify-end mt-4">
                        <button onClick={downloadGraph} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                            Download Graph
                        </button>
                        <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                            Close
                        </button>
                    </div>
                </Modal>

                {/* Edit Complaint Modal */}
                {selectedComplaint && (
                    <Modal
                        isOpen={editModalIsOpen}
                        onRequestClose={closeEditModal}
                        contentLabel="Edit Complaint"
                        style={{
                            content: {
                                width: '40%',
                                height: '50%',
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '10px',
                                padding: '20px',
                                backgroundColor: 'white',
                            },
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            },
                        }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Edit Complaint</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Note</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                                Save
                            </button>
                            <button onClick={closeEditModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                                Cancel
                            </button>
                        </div>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Complaints;
