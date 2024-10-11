const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({

    name:{
        type:String, //dataType
        required:true, //validate
        
    },

    membership:{
        type:Number, //dataType
        required:true, //validate
        
    },

    gmail:{
        type:String, //dataType
        required:true, //validate
        
    },

    amount:{
        type:Number, //dataType
        required:true, //validate
        
    }


});

module.exports = mongoose.model(
    "RequestModel", //file name
    requestSchema //function

)