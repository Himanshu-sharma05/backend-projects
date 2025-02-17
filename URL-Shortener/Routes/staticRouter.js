const express = require('express')
const router = express.Router()
const {urlModel} = require("../Model/url")
router.get('/',async (req,res)=>{
    const allurl = await urlModel.find({});
    return res.render('home',{urls:allurl});
})

module.exports = router;