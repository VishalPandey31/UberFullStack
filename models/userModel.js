const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true,
        minlength:[3,"first name shoulb be greater than 3 characters"]
    },
     lastname:{
        type:String,
        minlength:[3,"last name shoulb be greater than 3 characters"]
    },
    password:{
        type:String,
        required:true,
       select :false
    },
    email:{
        type:String,
        required:true,
        unique:true,
        length:[3,"Email Should be greater than 3 characters"]
    },

    socketId:{
          type:String,

    }
})


userSchema.methods.generateAuthToken=function(){
 const token=jwt.sign({_id:this.id}, process.env.JWT_SECRET)
 return token
}

userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashedPassword=async function(password){
    return await bcrypt.hash(password,10)
}

const userModel=mongoose.model("user",userSchema)

module.exports=userModel;