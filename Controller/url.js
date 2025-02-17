const shortid = require("shortid")
const {urlModel} = require("../Model/url")


async function handleShortenUrl(req,res){
    if(!req.body){res.send("Please provide a valid url")}
    const body = req.body;
    const shortenUrl = shortid(8);
    const result = await urlModel.create({
        shortenUrl:shortenUrl,
        redirectUrl:body.url,
        visitHistory:[]
    })
    // res.json({shortenUrl:result.shortenUrl})
    res.render('home.ejs',{shortenUrl:result.shortenUrl})

}

async function handleGetShortenUrl(req,res){
    const shortenUrl = req.params.id;
    const entry = await urlModel.findOneAndUpdate({shortenUrl},{$push:{vistHistory:{timestamps:Date.now()}}})
    res.redirect(entry.redirectUrl);   
}



async function handleAnalytics(req,res){
    const shortenUrl = req.params.shortId;
    const result = await urlModel.findOne({shortenUrl});
    return res.json({totalClicks:result.vistHistory.length, analytics:result.vistHistory})
    
}

//exports
module.exports = {handleShortenUrl,handleGetShortenUrl,handleAnalytics};
