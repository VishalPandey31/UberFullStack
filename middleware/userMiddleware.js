const userModal=require("../models/userModel")
const jwt=require('jsonwebtoken');
const blacklistModel=require('../models/BlackListTokenModel');


module.exports.authUser=async (req,res,next)=>{
   const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];


   if(!token){
   return res.status(401).json({message:"Unauthorized"})
   }
   try{

      
  const isBlackListed = await blacklistModel.findOne({ token: token });
   if (isBlackListed) {
     return res.status(401).json({ message: "unauthorized - Logged out token" });
   }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await userModal.findById(decoded._id)

    if(!user){
  return res.status(401).json
  ({message: "User not found"});
}

     req.user=user;
    return next();

   }catch(error){
    return res.status(401).json({message:"unauthorized"})
   }

}
