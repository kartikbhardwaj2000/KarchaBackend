const mongoose = require('mongoose');
const jobSchema = mongoose.Schema({
    name:{ type:String, required:true},
    data:{type:mongoose.Schema.Types.Mixed},
    type:{type: String, default:'normal'},
    priority:{type:Number,default: 0},
    nextRunAt:{type:Date},
    shouldSaveResult:{type:Boolean,default:true}
})
module.exports = new mongoose.model('Jobs',jobSchema);