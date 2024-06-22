const express = require('express');
const app = express();
const port = 3000;
const urlRoute = require('./routes/ul');
const URL = require('./models/url');
const {connectToMongodb} = require('./connect');
connectToMongodb('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDb connected"));
app.use(express.json());
app.use('/url',urlRoute);
app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
        $push:{
            visitHistory:{
                timestamp: Date.now(),
            }
        },
    }
);
res.redirect(entry.redirectURL);
})
app.listen(port,()=>{
    console.log(`server connected at port: ${port}`);
})