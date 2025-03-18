const {model,Schema} = require("mongoose");
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true});

const blogModel = model("blogModel",blogSchema);

module.exports = blogModel;