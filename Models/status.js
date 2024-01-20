const mongoose = require("mongoose")
const status = new mongoose.Schema({
          name:String,
          stat:String
})

const status_value = mongoose.model("status",status);
module.exports = status_value;