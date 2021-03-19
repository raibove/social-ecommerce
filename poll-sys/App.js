require('dotenv').config()
var app = require('express')(),
Model = require('../models/model'),
mongoose = require('mongoose'),
port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/polled', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
app.post('/vote/:user/:pollid/:option', async (req, res) => {
var { user, pollid,option } = req.params,
votef = 1,
{ counter } = await Model.findOneAndUpdate({ key: `${user}/${pollid}/${option}` }, { $inc: { counter: votef } }, { upsert: true, new: true }).exec()
res.json({
option:option,
votes:counter,
})
})
app.get('/results/:user/:pollid/:option', async (req, res) => {
var { user, pollid ,option } = req.params,
{ counter } = await Model.findOne({key:`${user}/${pollid}/${option}`})
res.json({option:option,votes:counter,})    
})
app.listen(port, () => console.log(`Server running at ${port}`))
module.exports = app
