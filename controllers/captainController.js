const captainModel=require('../models/captainModel')
const captainService=require('../services/captainnService');
const {validationResult}=require('express-validator')

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