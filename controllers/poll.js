var Model = require('../models/model');
async function set(req, res){
var { user, pollid,option } = req.params,
votef = 1,
{ counter } = await Model.findOneAndUpdate({ key: `${user}/${pollid}/${option}` }, { $inc: { counter: votef } }, { upsert: true, new: true }).exec()
res.json({
option:option,
votes:counter,
})
}
async function get(req,res){
var { user, pollid ,option } = req.params,
{ counter } = await Model.findOne({key:`${user}/${pollid}/${option}`})
res.json({option:option,votes:counter,})    
}
module.exports = { get,set }
