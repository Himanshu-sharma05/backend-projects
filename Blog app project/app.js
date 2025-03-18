require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8000;
const blog = require("./models/blog");

mongoose
    .connect(process.env.MONGO_URL)
    .then(e => console.log("mognodb connected..."));

const {router} = require("./routes/user");
const {blogRouter} = require("./routes/blog")
const { checkForAuthentication } = require("./middlewares/authentication");

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve("./publicimages")))

app.get('/',async (req,res)=>{
    const allBlogs = await blog.find({});
    res.render("home",{
        user: req.user,
        blogs:allBlogs
    })
});

app.use("/user", router);
app.use("/blog",blogRouter);

app.listen(PORT,()=> console.log(`Server Started at PORT : ${PORT}`));

