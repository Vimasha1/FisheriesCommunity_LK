const express = require('express');
const router = express.Router();
const communityMembersController = require('../controllers/CommunityMembercon');

// POST route to add a new community member
router.post('/community-members', communityMembersController.addCommunityMember);

// GET route to fetch all community members
router.get('/community-members', communityMembersController.getAllCommunityMembers);

// GET route to fetch a community member by ID
router.get('/community-members/:id', communityMembersController.getCommunityMemberById);

// PUT route to update a community member by ID
router.put('/community-members/:id', communityMembersController.updateCommunityMemberById);

// DELETE route to delete a community member by ID
router.delete('/community-members/:id', communityMembersController.deleteCommunityMemberById);

module.exports = router;
