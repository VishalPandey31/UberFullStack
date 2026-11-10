const mapsService =require ('../services/maps.service');
const {validationResult}= require('express-validator');
module.exports.getCoordinates=async (req,res,next)=>{

    const {address}=req.query;

    try{

        const coordinates=await mapsService.getCoordinates(address);
        res.status(200).json({coordinates});
    }catch(err){
        res.status(500).json({message:"Internal Server Error", error:err.message})
    }
}

module.exports.getDistanceTime=async (req,res,next)=>{

    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
        }
        const {origin,destination}=req.query;
        const distanceTime=await mapsService.getDistanceTime(origin,destination);
        res.status(200).json({distanceTime});


    }catch(err){

        console.log(err);
        res.status(500).json({message:'Internal server error',error:err.message});
    }
}

module.exports.getAutoCompleteSuggestions=async (req,res,next)=>{

    try{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {input}=req.query;
        const suggestions=await mapsService.getAutoCompleteSuggestions(input);
        res.status(200).json({suggestions});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error",error:err.message});
        
    }
}