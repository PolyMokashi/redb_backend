const mongoose = require("mongoose")
const blood_details = new mongoose.Schema({
    coldate:{
    type: String,
    required: true,
  },
    expdate: {
    type: String,
    required: true,
  },
    bloodgrp:{
    type: String,
    required: true,
  },
    haemog:{
    type: String,
    required: true,
  },
    platelate:{
    type: String,
    required: true,
  },
    quantity:{
    type: String,
    required: true,
  }
})

const bloodDetails= mongoose.model("bloodBank",blood_details);
module.exports = bloodDetails;