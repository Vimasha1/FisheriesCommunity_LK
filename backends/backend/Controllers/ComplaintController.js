const multer = require('multer');
const Complaint = require("../Model/ComplaintModel");
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Configure multer to store files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store files in the "uploads" directory
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
    const { name, mailId, phoneNumber, complaintType, complaintDescription, status = 'Open', note } = req.body; // Add note field

    if (!name || !mailId || !phoneNumber || !complaintType || !complaintDescription) {
        return res.status(400).json({ message: "Missing required fields" });
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
            fileUrl, // Save the file URL in the database
            note // Save the note in the database
        });

        await complaint.save();
        res.status(201).json({ complaint });
    } catch (err) {
        console.error("Error saving complaint:", err);
        res.status(500).json({ message: "Unable to add complaint" });
    }
};

// Get complaint by ID (includes file URL and note)
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

// Update complaint by ID (now includes updating note)
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

        res.status(200).json({ complaint });
    } catch (err) {
        console.error("Error updating complaint:", err);
        res.status(500).json({ message: "Server Error" });
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

module.exports = {
    getAllComplaints,
    addComplaint: [upload.single('file'), addComplaint], 
    getComplaintById,
    updateComplaintById,
    deleteComplaintById
};
