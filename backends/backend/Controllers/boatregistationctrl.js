const Boatdetails = require("../Model/boatregistationmodel"); // Import with a consistent name

// Display all users
const getAllboats = async (req, res, next) => {
    let users;
    try {
        users = await Boatdetails.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching users" });
    }

    if (!users || users.length === 0) {
        return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ users });
};

// Add a new user
const addboats = async (req, res, next) => {
    const { name, Numberof, phone } = req.body;

    let newUser;

    try {
        newUser = new Boatdetails({ name, Numberof, phone});
        await newUser.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error adding boat" });
    }

    return res.status(201).json({ newUser });
};

// Get user by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    let user;
    try {
        user = await Boatdetails.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error fetching boats" });
    }

    if (!user) {
        return res.status(404).json({ message: "boats not found" });
    }

    return res.status(200).json({ user });
}

// Update user details
const updateboats = async (req, res, next) => {
    const id = req.params.id;
    const { name, Numberof, phone } = req.body;

    let updatedUser;
    
    try {
        updatedUser = await Boatdetails.findByIdAndUpdate(
            id,
            { name: name, Numberof: Numberof, phone: phone }, // Ensure correct case
            { new: true } // This option returns the updated document
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating boat details" });
    }

    if (!updatedUser) {
        return res.status(404).json({ message: "boat not found" });
    }

    return res.status(200).json({ user: updatedUser });

}
//delete user
const deleteboats = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try {
        user = await Boatdetails.findByIdAndDelete(id); // Correctly using the User model
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting boat" });
    }

    if (!user) { // Check if user was found and deleted
        return res.status(404).json({ message: "boat not found" });
    }

    return res.status(200).json({ message: "boat deleted successfully", user });
};


exports.getAllboats = getAllboats;
exports.addboats = addboats;
exports.getById = getById;
exports.updateboats = updateboats;
exports.deleteboats = deleteboats;
