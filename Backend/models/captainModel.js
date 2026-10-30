const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


const captainSchema=new mongoose.Schema({
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

    },
    status:{
        
        type:String,
        enum:['Active','Inactive'],
        default:'Inactive'
    },

    vehicle:{

        color:{
              type:String,
            required:true,
            minLength:[3, "Color should be greater than 3 characters"]
        },
        plate:{
            type:String,
            required:true,
            minLength:[3, "Plate should be greater than 3 characters"]
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"capacity should be at least 1"]
        },
        vehicletype:{
          type:String,
          required:true,
          enum:['car','bike','van'],  
    },

},  
    location:{
        latitude:{
            type:Number,

        },
        longitude:{
            type:Number,
            
        }
    }

})

captainSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this.id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

captainSchema.methods.comparePassword=async function(password){
 const isMatch=await bcrypt.compare(password,this.password);
  return isMatch;
}

captainSchema.statics.hashedPassword=async function(password){
    const hashedPassword=await bcrypt.hash(password,10);
    return hashedPassword;
}


const captainModel=mongoose.model('captain',captainSchema);

module.exports=captainModel;
