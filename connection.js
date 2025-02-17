const mongoose = require("mongoose");
async function handleConnection(url){
    mongoose.connect(url).then(()=> console.log("mongoDB connected successfully"))
}
module.exports = {handleConnection};