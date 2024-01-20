const mongoose = require("mongoose")
const authentication = new mongoose.Schema({
   username:String,
   password:String,
   activeUser:Boolean,
   roles:String
})

const authSchema = mongoose.model("authentication",authentication);
module.exports = authSchema;