// controllers/supplierController.js
const Supplier = require('../Model/Supplier'); 

// Register new supplier
exports.registerSupplier = async (req, res) => {
  const { supplierId, name, itemCategory, deliveryType, contactInfo, address } = req.body;

  if (!supplierId || !name || !itemCategory || !deliveryType || !contactInfo.email || !contactInfo.phone || !address) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Check if Supplier ID already exists
    const existingSupplier = await Supplier.findOne({ supplierId });
    if (existingSupplier) {
      return res.status(400).json({ message: 'Supplier ID already exists' });
    }

    const newSupplier = new Supplier({
      supplierId,
      name,
      itemCategory,
      deliveryType,
      contactInfo,
      address,
    });

    await newSupplier.save();

    res.status(201).json({ message: 'Supplier registered successfully', supplier: newSupplier });
  } catch (error) {
    console.error('Error registering supplier:', error);
    res.status(500).json({ message: 'Error registering supplier' });
  }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({}); 
    res.status(200).json({ suppliers }); 
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers' });
  }
};

// Update supplier by ID
exports.updateSupplierById = async (req, res) => {
  const { id } = req.params;
  const { name, companyName, itemCategory, deliveryType, contactInfo, address } = req.body;

  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { name, companyName, itemCategory, deliveryType, contactInfo, address },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json({ message: 'Supplier updated successfully', supplier: updatedSupplier });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ message: 'Error updating supplier' });
  }
};

// Delete supplier by ID
exports.deleteSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(id);

    if (!deletedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ message: 'Error deleting supplier' });
  }
};
