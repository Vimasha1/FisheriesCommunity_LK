const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    complaintId: { type: String, required: true },
    name: { type: String, required: true },
    mailId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: 'Open' },
    assignedStaff: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    fileUrl: { type: String } ,
    note: { type: String }
});

module.exports = mongoose.model('Complaint', complaintSchema);
