const captainModel=require("../models/captainModel")
const jwt=require('jsonwebtoken');
const blacklistModel=require('../models/BlackListTokenModel');

module.exports.authCaptain=async (req,res,next)=>{
       const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
   
       if(!token){
           return res.status(401).json({messages:"Unauthorized"})
       }

       try{

        const isBlackListed = await blacklistModel.findOne({ token: token });
   if (isBlackListed) {
     return res.status(401).json({ message: "unauthorized - Logged out token" });
   }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const captain=await captainModel.findById(decoded._id)

    if(!captain){
  return res.status(401).json
  ({message: "Captain not found"});
}

     req.captain=captain;
    return next();
       }catch(err){
       return res.status(401).json({message:"Unauthorized"})
       }

}