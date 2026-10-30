const captainModel=require('../models/captainModel');

module.exports.createCaptain=async ({firstname,lastname,email, password,color,plate,capacity,vehicletype})=>{
    if(!firstname|| !lastname || !email || !password|| !color ||!plate ||!capacity || !vehicletype){
       throw new Error("All fields are required");
    }

    const captain=captainModel.create({
         firstname,
        lastname,
        password,
        email,
        vehicle:{
            color,
            plate,
            capacity,
            vehicletype
        }
    })

    return captain;
        
}