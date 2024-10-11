const { request } = require("express");
const Request = require("../Model/RequestModel");

const getAllRequests = async (req, res, next) => {

    //display all requests
    let requests;
    // Get all requests

    try{
        requests = await Request.find();
    }catch (err) {
        console.log(err);
    }
    // not found
    if(!requests){
        return res.status(404).json({message:"Request not found"});
    }
// Display all requests
return res.status(200).json({ requests });
};

//data insert
const addRequests = async (req, res, next) => {
    const { name, membership, gmail, amount } = req.body;
    let request;
    try {
        request = new Request({
            name,
            membership,
            gmail,
            amount,
        });
        await request.save();
    } catch (err) {
        console.log(err);
    }

    if(!request) {
        return res.status(404).send({message:"Unable to add request"});
    }

    return res.status(200).json({request});
}

//get by id
const getRequestById = async (req, res, next) => {
    const id = req.params.id;
    let request;
    try {
        request = await Request.findById(id);
    } catch (err) {
        console.log(err);
    }
    //no available requests
    if(!request) {
        return res.status(404).json({message:"No request found"});
    }
    return res.status(200).json({request});
}

//update request details
const updateRequest = async (req, res, next) => {
    const id = req.params.id;
    const { name, membership, gmail, amount } = req.body;
    let request;
    try {
        request = await Request.findByIdAndUpdate(id, {
            name: name,
            membership: membership,
            gmail: gmail,
            amount: amount });
            request = await request.save();
    } catch (err) {
        console.log(err);
    }
    if(!request) {
        return res.status(404).json({message:"Unable to update request details"});
    }
    return res.status(200).json({request});
        
        
        
};

//delete request
const deleteRequest = async (req, res, next) => {
    const id = req.params.id;
    let request;
    try {
        request = await Request.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if(!request) {
        return res.status(404).json({message:"Unable to delete request"});
    }
    return res.status(200).json({request});
}

            
exports.getRequestById = getRequestById;
exports.getAllRequests = getAllRequests;
exports.addRequests = addRequests;
exports.updateRequest = updateRequest;
exports.deleteRequest = deleteRequest;

