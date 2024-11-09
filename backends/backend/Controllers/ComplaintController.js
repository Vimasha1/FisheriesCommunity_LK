const multer = require('multer');
const Complaint = require("../Model/ComplaintModel");
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { sendEmailNotification } = require('../mailer'); 
const { sendEmail } = require('../emailService');

// Configure multer to store files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});
const upload = multer({ storage: storage });

// Utility function to check if the ID is valid
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (err) {
        console.error("Error fetching complaints:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Add a new complaint with file upload
const addComplaint = async (req, res) => {
    const { name, mailId, phoneNumber, complaintType, complaintDescription, status = 'Open', note } = req.body;

    if (!name || !mailId || !phoneNumber || !complaintType || !complaintDescription) {
        return res.status(400).json({ message: "All fields (name, email, phone, complaint type, description) are required." });
    }

    try {
        const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const complaint = new Complaint({
            complaintId: uuidv4(),
            name,
            mailId,
            phoneNumber,
            category: complaintType,
            description: complaintDescription,
            status,
            fileUrl,
            note
        });

        await complaint.save();
        
        res.status(201).json({ complaintId: complaint.complaintId });
    } catch (err) {
        console.error("Error saving complaint:", err);
        res.status(500).json({ message: "Unable to add complaint" });
    }
};

// Get complaint by ID
const getComplaintById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const complaint = await Complaint.findById(id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json({ complaint });
    } catch (err) {
        console.error("Error fetching complaint:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Update complaint by ID
const updateComplaintById = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const complaint = await Complaint.findByIdAndUpdate(id, updates, { new: true });

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // Send notification if status has been updated
        if (updates.status) {
            const emailSubject = `Update on your Complaint ID: ${complaint.complaintId}`;
            const emailText = `
                Dear Sir/Madam,

                Your complaint with ID: ${complaint.complaintId} is now ${updates.status}. 
                We will let you know more about your complaint within two days. 

                Thank you.

                Best regards,
                Community Staff
            `;

            await sendEmailNotification(complaint.mailId, emailSubject, emailText);
        }

        res.status(200).json({ complaint });
    } catch (err) {
        console.error("Error updating complaint:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Send notification email
const sendNotification = async (req, res) => {
    const { email, notifyOption, complaintId } = req.body;

    if (!email || !notifyOption || !complaintId) {
        return res.status(400).json({ success: false, message: 'Email, notifyOption, and complaintId are required.' });
    }

    try {
        const complaint = await Complaint.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found.' });
        }

        let message;
        if (notifyOption === 'notify') {
            message = `
                Dear Staff,

                You have been assigned a new complaint. Kindly requesting you to consider about this issue.
                Unique Complaint ID: ${complaint.complaintId}
                MongoDB ID: ${complaint._id}
                Name: ${complaint.name}
                Description: ${complaint.description}
                Email: ${complaint.mailId}
                Phone: ${complaint.phoneNumber}
                Status: ${complaint.status}

                Thank you
            `;
        } else if (notifyOption === 'remind') {
            message = `
                Dear Staff,

                This is a reminder to follow up on the assigned complaint.
                Unique Complaint ID: ${complaint.complaintId}
                MongoDB ID: ${complaint._id}
                Name: ${complaint.name}
                Description: ${complaint.description}
                Email: ${complaint.mailId}
                Phone: ${complaint.phoneNumber}
                Status: ${complaint.status}

                Thank you
            `;
        } else {
            return res.status(400).json({ success: false, message: 'Invalid notification option' });
        }

        await sendEmail(email, 'Complaint Notification', message);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
};

// Delete complaint by ID
const deleteComplaintById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const complaint = await Complaint.findByIdAndDelete(id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json({ message: "Complaint deleted successfully" });
    } catch (err) {
        console.error("Error deleting complaint:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Export the controller functions
module.exports = {
    getAllComplaints,
    addComplaint: [upload.single('file'), addComplaint],
    getComplaintById,
    updateComplaintById,
    deleteComplaintById,
    sendNotification
};
