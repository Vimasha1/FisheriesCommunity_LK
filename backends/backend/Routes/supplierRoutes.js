// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const supplierController = require('../Controllers/supplierController');

// Route to register a new supplier
router.post('/suppliers', supplierController.registerSupplier);

// Route to get all suppliers
router.get('/suppliers', supplierController.getAllSuppliers);

// Route to update supplier by ID
router.put('/suppliers/:id', supplierController.updateSupplierById);

// Route to delete supplier by ID
router.delete('/suppliers/:id', supplierController.deleteSupplierById);

module.exports = router;
