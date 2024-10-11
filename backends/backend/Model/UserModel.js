//UserModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    BoatID:{
        type:String,
        required:true
    },

    FishType:{
        type:String,
        required:true
    },

    Quantity:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model(
    "UserModel",
    userSchema
)