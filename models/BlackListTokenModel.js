const mongoose =require('mongoose');

const blackListTokenSchema=new mongoose.Schema({
      token:{
        type:String,
        requied:true,
        unique:true
      },
      createdAt:{
        type:Date,
        default:Date.now,
        expires:86400
      }
})

module.exports=mongoose.model("BlacklistToken",blackListTokenSchema);