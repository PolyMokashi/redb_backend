
const mongoose = require("mongoose")
const blood_request = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bloodgrp: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  accepted: {
    type: String,
    required: true,
  },
  rejected: {
    type:String,
    required:true
},
});

const bloodRequest = mongoose.model("bloodRequest",blood_request);
module.exports = bloodRequest;


         