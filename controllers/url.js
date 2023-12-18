const shortid = require('shortid')
const URL = require('../models/url');

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({"error":"Url is required"});
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory:[],
    });
    return res.json({id:shortID})
}

async function handlerURLRedirect(req,res){
    const shortId = req.params.shortId;
    console.log(shortId,"shortId")
    if(!shortId) return res.status(400).json({"Error": "shortId is required" })
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {$push:{
        visitHistory:{timestamp : Date.now()},
    }}
    );
    res.redirect(entry.redirectURL);
}

async function handleAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks : result.visitHistory.length, Analytics : result.visitHistory})
}

module.exports = {
    handleGenerateNewShortURL,
    handlerURLRedirect,
    handleAnalytics
}