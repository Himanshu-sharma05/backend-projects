const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    shortenUrl:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    vistHistory:[{timestamps :{type:Number}}]
},{timestamps:true})

const urlModel = mongoose.model("urlModel",urlSchema);

//exports
module.exports = {urlModel};