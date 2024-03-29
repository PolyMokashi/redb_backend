const mongoose = require("mongoose")
const authentication = new mongoose.Schema({
   username:String,
   password:String,
})

const authSchema = mongoose.model("authentication",authentication);
module.exports = authSchema;