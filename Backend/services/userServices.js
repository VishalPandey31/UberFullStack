const userModel=require("../models/userModel");

module.exports.createUser=async({firstname,lastname,password,email})=>{
    if(!firstname || !lastname || !password || !email){
        throw new Error("All fields are required");
    }

    
    const user= await userModel.create({
        firstname,
        lastname,
        password,
        email
    })
    return user;
}