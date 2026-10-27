const userModel=require('../models/userModel');
const userService=require('../services/userServices')
const {validationResult}=require('express-validator')

module.exports.registerUser=async(req,res,next)=>{
      const errors=validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})
      }

      const {firstname,lastname,password,email}=req.body;

      console.log(req.body);
       console.log("Firstname:", firstname);

      const hashedPassword=await userModel.hashedPassword(password);
      const user=await userService.createUser({firstname,lastname,password:hashedPassword,email})
      const token=user.generateAuthToken();
      res.status(201).json({token,user})
    }