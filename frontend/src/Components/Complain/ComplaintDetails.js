//complaintdetails
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
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
    const [dialogIsOpen, setDialogIsOpen] = useState(false); 
    const [notifyOption, setNotifyOption] = useState('notify'); 
    const [staffEmail, setStaffEmail] = useState(''); 
    const [pieData, setPieData] = useState({}); 
    const [assignedStaff, setAssignedStaff] = useState({}); 

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
            calculateCategoryDistribution(res.data || []); 
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

    const calculateCategoryDistribution = (complaintsData) => {
        const categoryCounts = complaintsData.reduce((acc, { category }) => {
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
        
        const data = {
            labels: Object.keys(categoryCounts),
            datasets: [{
                data: Object.values(categoryCounts),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }]
        };
        setPieData(data); 
    };                                                                                 


    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const openEditModal = () => setEditModalIsOpen(true);
    const closeEditModal = () => setEditModalIsOpen(false);
    const openDialog = () => {
        setDialogIsOpen(true);
        setStaffEmail(''); 
        setNotifyOption('notify'); 
    };
    const closeDialog = () => {
        setDialogIsOpen(false);
        setNotifyOption('notify');   
        setStaffEmail('');  
        setSelectedComplaint(null);
    };

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
        openEditModal();  // Open the edit modal
    };

    const handleUpdate = async () => {
        if (!selectedComplaint) return;
        await handleChange(selectedComplaint._id, { note, ...selectedComplaint });
        setSelectedComplaint(null);
        closeEditModal();  // Close the edit modal after update
    };

    const handleStaffChange = (complaintId, staff) => {
        // Find the complaint based on the complaintId
        const complaintToAssign = complaints.find(complaint => complaint._id === complaintId);

        // Update the selectedComplaint with the found complaint
        setSelectedComplaint(complaintToAssign);

        // Update the assigned staff for the selected complaint
        setAssignedStaff(prevState => ({
            ...prevState,
            [complaintId]: staff,
        }));

        // Open the dialog
        openDialog();
    };

    // Function to handle dialog submission
    const handleDialogSubmit = async () => {
    if (!staffEmail) {
        alert('Please enter a valid staff email.');
        return;
    }

    if (!selectedComplaint || !selectedComplaint._id) {
        alert('No complaint selected or invalid complaint ID.');
        return;
    }

    try {
        // Fetching the complaint details using the MongoDB ID
        const complaintDetails = await fetchComplaintDetails(selectedComplaint._id);

        // Prepare email content using the fetched complaint details
        const emailContent = {
            email: staffEmail,
            notifyOption: notifyOption,
            complaintId: selectedComplaint._id, // MongoDB ID
            // Include other complaint details in the email body if needed
            subject: `Notification for Complaint ID: ${complaintDetails.uniqueId}`, // Or whatever ID you want to display
            message: `Details of the complaint:\nType: ${complaintDetails.type}\nDescription: ${complaintDetails.description}\nStatus: ${complaintDetails.status}`
        };

        const response = await axios.post('http://localhost:5005/complaints/send-notification', emailContent);

        if (response.data.success) {
            alert('Email sent successfully');
        } else {
            alert(`Failed to send email: ${response.data.message}`);
        }
    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.data : error.message);
        alert('Error occurred while sending email: ' + (error.response ? error.response.data.message : error.message));
    } finally {
        closeDialog();
    }
};

// Helper function to fetch complaint details by MongoDB ID
const fetchComplaintDetails = async (complaintId) => {
    try {
        const response = await axios.get(`http://localhost:5005/complaints/${complaintId}`);
        return response.data.complaint; 
    } catch (error) {
        console.error('Error fetching complaint details:', error);
        return null;
    }
};


    // Function to close the dialog
    
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
                                                        onChange={(e) => handleStaffChange(complaint._id, e.target.value)} 
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

                {/* Staff Notification Dialog */}
                <Modal
    isOpen={dialogIsOpen}
    onRequestClose={closeDialog}
    contentLabel="Notify Staff"
    style={{
        content: {
            width: '30%',
            height: 'auto', 
            maxHeight: '300px', 
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '30px',
            padding: '20px',
            backgroundColor: 'pale blue',
           // overflow: 'hidden'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
    }}
>
    <h2 className="text-2xl font-bold mb-4">Notify Staff</h2>

    {/* Read-Only Complaint ID Field */}
    <div className="mb-4">
        <label className="block text-gray-700">Complaint ID:</label>
        <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={selectedComplaint ? selectedComplaint._id : ''} 
            readOnly //read only field
        />
    </div>

    {/* Action Selection */}
    <div className="mb-4">
        <label className="block text-gray-700">Select Action:</label>
        <div className="flex items-center">
            <input
                type="radio"
                value="notify"
                checked={notifyOption === 'notify'}
                onChange={() => setNotifyOption('notify')}
            />
            <label className="ml-2">Notify Staff</label>
        </div>
        <div className="flex items-center">
            <input
                type="radio"
                value="remind"
                checked={notifyOption === 'remind'}
                onChange={() => setNotifyOption('remind')}
            />
            <label className="ml-2">Send Reminder</label>
        </div>
    </div>

    {/* Staff Email Input */}
    <div className="mb-4">
        <label className="block text-gray-700">Staff Email:</label>
        <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={staffEmail}
            onChange={(e) => setStaffEmail(e.target.value)}
            placeholder="Enter staff email"
        />
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end">
        <button onClick={handleDialogSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
            Send
        </button>
        <button onClick={closeDialog} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
            Cancel
        </button>
    </div>
</Modal>


            </div>
        </div>
    );
};

export default Complaints;
