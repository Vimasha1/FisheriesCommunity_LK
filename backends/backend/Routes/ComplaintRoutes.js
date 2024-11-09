// route
const express = require("express");
const router = express.Router();
const { sendEmail } = require('../emailService');
const Complaint = require("../Model/ComplaintModel");
const ComplaintController = require("../Controllers/ComplaintController");
const nodemailer = require('nodemailer');

// Define the routes and map them to controller functions
router.get("/", ComplaintController.getAllComplaints);
router.post("/", ComplaintController.addComplaint);
router.get("/:id", ComplaintController.getComplaintById);
router.put("/:id", ComplaintController.updateComplaintById);
router.delete("/:id", ComplaintController.deleteComplaintById);

// Route to send email notifications
router.post('/send-notification', ComplaintController.sendNotification);

router.post('/send-notification', async (req, res) => {
    const { email, notifyOption, complaintId } = req.body; // Destructure all fields

    // Validate input
    if (!email || !notifyOption || !complaintId) {
        return res.status(400).send({ success: false, message: 'Email, notifyOption, and complaintId are required.' });
    }

    try {
        // Fetch complaint details by MongoDB ID
        const complaint = await Complaint.findById(complaintId); // Use MongoDB ID to find complaint
        if (!complaint) {
            return res.status(404).json({ success: false, message: 'Complaint not found' });
        }

        // Construct the email content
        const mailOptions = {
            from: 'tursholivea@gmail.com',
            to: email,
            subject: `New Complaint Notification - ID: ${complaint.complaintId}`,
            text: `You have a new complaint notification:\n\n` +
                  `Unique Complaint ID: ${complaint.complaintId}\n` +
                  `MongoDB ID: ${complaint._id}\n` +
                  `Name: ${complaint.name}\n` +
                  `Description: ${complaint.description}\n` +
                  `Email: ${complaint.mailId}\n` +
                  `Phone: ${complaint.phoneNumber}\n` +
                  `Status: ${complaint.status}\n\n` +
                  `Notification Type: ${notifyOption}`, // Include complaint details and notify option
        };

        // Send email logic using the sendEmail function
        const emailSent = await sendEmail(mailOptions);
        if (emailSent) {
            return res.json({ success: true, message: 'Email sent successfully' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to send email' });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ success: false, message: 'Failed to send email' });
    }
});




module.exports = router;
