const captainModel=require('../models/captainModel');
const captainService=require('../services/captainnService');
const {validationResult}=require('express-validator')
const blackListTokenModel=require('../models/BlackListTokenModel');

module.exports.registerCaptain=async function(req,res,next){

    const errors=validationResult(req);
    if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})

    }


    const {firstname,vehicle,email,password,lastname}=req.body;

    const isCaptainAlreadyExists=await captainModel.findOne({email})
  if(isCaptainAlreadyExists){
 return res.status(400).json({message:"Captain Already Exists"});
  }


    const hashedPassword=await captainModel.hashedPassword(password);
    const captain=await captainService.createCaptain({
         firstname,
         lastname, 
         password:hashedPassword,
         email,
         color:vehicle.color,
         plate:vehicle.plate,
         capacity:vehicle.capacity,
         vehicletype:vehicle.vehicletype
    })
    const token=captain.generateAuthToken();

    res.status(200).json({token,captain});

}

module.exports.loginCaptain=async function(req,res,next){
  const errors=validationResult(req);
  if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
        
  }

  const {email,password}=req.body;
   
  const user=await captainModel.findOne({email}).select("+password");

  if(!user){
         return res.status(401).json({message:"Invalid email or password"});
  }
     const isValidPassword= await user.comparePassword(password);
       if(!isValidPassword){
         return res.status(401).json({message:"Invalid email or password"});
      }

      const token=user.generateAuthToken();
      res.cookie('token',token);
        return res.status(200).json({message:"Login Successfull",token,user})
  }


  module.exports.profileCaptain=async function(req,res,next){
        res.status(200).json(req.captain);
  }

  module.exports.logoutCaptain=async function(req,res,next){
    res.clearCookie('token');
       const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
            blackListTokenModel.create({token});    

         res.status(200).json({message:"Logout Successfull"})
  }