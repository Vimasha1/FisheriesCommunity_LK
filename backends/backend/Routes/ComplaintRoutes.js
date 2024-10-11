const express = require("express");   
const router = express.Router();

// Import the Complaint model
const Complaint = require("../Model/ComplaintModel"); 

// Import the ComplaintController
const ComplaintController = require("../Controllers/ComplaintController");

// Define the routes and map them to controller functions
router.get("/", ComplaintController.getAllComplaints);
router.post("/", ComplaintController.addComplaint);

router.get("/:id", ComplaintController.getComplaintById); 
router.put("/:id", ComplaintController.updateComplaintById); 
router.delete("/:id", ComplaintController.deleteComplaintById); 

// Export the router
module.exports = router;
