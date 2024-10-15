//UserModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  BoatID: {
    type: String,
    required: true,
  },

  FishType: {
    type: String,
    required: true,
  },

  Quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  FishGrade: {
    type: String,
    required: true,
  },

  AddedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  Price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("UserModel", userSchema);
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
