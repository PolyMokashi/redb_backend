
const mongoose = require("mongoose")
const blood_request = new mongoose.Schema({
          name: String,
          bloodgrp: String,
          hospital: String,
          quantity: String,
          accepted: Boolean, 
          rejected: Boolean,
})

const bloodRequest = mongoose.model("bloodRequest",blood_request);
module.exports = bloodRequest;


         