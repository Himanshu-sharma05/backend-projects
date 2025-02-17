//importing libraries and connection handler
const express = require('express');
const app = express();
const {handleConnection} = require("./connection")
const path = require("path")

//importing routes
const newRoute = require("./Routes/url")
const staticRoute = require('./Routes/staticRouter')


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//connection
handleConnection('mongodb://127.0.0.1:27017/urlpractice');

//routes
app.use("/url",newRoute)
app.use('/',staticRoute)


//Server Side rendering
app.set("view engine","ejs");
app.set("views",path.resolve('./views'))




app.listen(8000,()=>{console.log("listening on port 8000...")});