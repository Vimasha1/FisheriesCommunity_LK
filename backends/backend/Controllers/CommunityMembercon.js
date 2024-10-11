const CommunityMember = require('../Model/CommunityMember');

// Add a new community member
const addCommunityMember = async (req, res) => {
  try {
    const newMember = new CommunityMember(req.body);
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error creating community member', error });
  }
};

// Fetch all community members
const getAllCommunityMembers = async (req, res) => {
  try {
    const members = await CommunityMember.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching community members', error });
  }
};

// Fetch a community member by ID
const getCommunityMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const member = await CommunityMember.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: 'Community member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching community member details', error });
  }
};

// Update a community member by ID
const updateCommunityMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const updatedMember = await CommunityMember.findByIdAndUpdate(memberId, req.body, { new: true });

    if (!updatedMember) {
      return res.status(404).json({ message: 'Community member not found' });
    }

    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ message: 'Error updating community member', error });
  }
};

// Delete a community member by ID
const deleteCommunityMemberById = async (req, res) => {
  try {
    const memberId = req.params.id;
    const deletedMember = await CommunityMember.findByIdAndDelete(memberId);

    if (!deletedMember) {
      return res.status(404).json({ message: 'Community member not found' });
    }

    res.json({ message: 'Community member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting community member', error });
  }
};

module.exports = {
  addCommunityMember,
  getAllCommunityMembers,
  getCommunityMemberById,
  updateCommunityMemberById,
  deleteCommunityMemberById,
};
