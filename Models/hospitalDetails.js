const mongoose = require("mongoose")
const hospital_details= new mongoose.Schema({
   
    HospitalName:{
       type: String,
    required:true
    },
    firstName:{
      type:String,
      required:true
    },  lastName:{
      type:String,
      required:true
    },quantity:{
      type:String,
      required:true
    }
   


})

const hospitalDetails = mongoose.model("hospitalDetails",hospital_details);
module.exports= hospitalDetails;