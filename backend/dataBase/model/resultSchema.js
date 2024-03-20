const mongoose = require("mongoose")


const resultSchema = new mongoose.Schema({
  userName:String,
  userId:String,
  totalMark:Number,
  wrongAnswerCount:Number,
  correctAnswerCount:Number

},{
    timestamps:true
})

module.exports = mongoose.model('result',resultSchema)