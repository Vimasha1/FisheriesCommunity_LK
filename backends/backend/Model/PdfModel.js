const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfSchema = new Schema({

    name:{
        type:String, //dataType
        required:true, //validate
        
    },

    title:{
        type:String, //dataType
        required:true, //validate
        
    },

    pdf:{
        type:String, //dataType
        required:true, //validate
        
    },




});

module.exports = mongoose.model(
    "PdfDetails", //file name
    pdfSchema //function

)