const express = require("express");
const newRoute = express.Router()
const {handleShortenUrl,handleGetShortenUrl,handleAnalytics} = require("../Controller/url")
newRoute.post('/',handleShortenUrl);
newRoute.get('/:id',handleGetShortenUrl);
newRoute.get('/analytics/:shortId',handleAnalytics);
module.exports = newRoute;
