const {Router} = require("express");
const blogRouter = Router();
const multer = require("multer")
const path = require("path")
const blogModel = require("../models/blog");
const commentModel = require("../models/comments")
blogRouter.get("/addblog",(req,res)=>{
    res.render("addBlog",{user: req.user});
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./publicimages/uploads'))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null, filename);
    }
  })

  const upload = multer({ storage: storage })


blogRouter.post("/", upload.single('coverImage'),async (req,res)=>{
    const {title,body} = req.body;
    const blog = await blogModel.create({
        title,
        body,
        coverImage:`/uploads/${req.file.filename}`,
        createdBy:req.user._id
    })
    res.redirect(`/blog/${blog._id}`);
});

blogRouter.get("/:id",async (req,res)=>{
    const blog = await blogModel.findById(req.params.id).populate("createdBy");
    const comments = await commentModel.find({blogId:req.params.id}).populate("createdBy");
    res.render("blog",{user:req.user,blog,comments})
})

blogRouter.post("/comment/:blogId",async (req,res)=>{
    await commentModel.create({
        content:req.body.content,
        blogId: req.body.blogId,
        createdBy:req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports = {blogRouter};