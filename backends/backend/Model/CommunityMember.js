const mongoose = require('mongoose');

const communityMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true }, // Ensure username is unique
    password: { type: String, required: true }
});

module.exports = mongoose.model('CommunityMember', communityMemberSchema);
