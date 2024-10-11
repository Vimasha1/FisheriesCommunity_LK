// UserControl.js
const User = require("../Model/UserModel");

// Get all users
const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }

    if (!users) {
        return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({ users });
};

// Get user by ID
const getById = async (req, res, next) => {
    const id = req.params.id;
    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
};

// Add a new user
const addUser = async (req, res, next) => {
    const { BoatID, FishType, Quantity } = req.body;
    let user;

    try {
        user = new User({ BoatID, FishType, Quantity });
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add user" });
    }

    return res.status(201).json({ user });
};

// Update user data
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { BoatID, FishType, Quantity } = req.body;
    let user;

    try {
        user = await User.findByIdAndUpdate(id, { BoatID, FishType, Quantity }, { new: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to update user data" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
};

// Delete user by ID
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;

    try {
        console.log(id);
        user = await User.findByIdAndDelete(id);
    } catch (err) {
        return res.status(500).json({ message: "Error deleting user" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
};

exports.deleteUser = deleteUser;


exports.deleteUser = deleteUser;


exports.getAllUsers = getAllUsers;
exports.getById = getById;
exports.addUser = addUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
