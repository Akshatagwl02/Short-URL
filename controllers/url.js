const shortid = require('shortid');
const URL = require('../models/url');
async function handleGenerateShortUrl(req,res){
    const body = req.body;
    if(!body.url) res.status(404).json("Error: url is required");
    const shortId = shortid();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })
    res.json({id: shortId});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
}