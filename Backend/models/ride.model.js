const mongoose=require('mongoose');

const rideSchema=new mongoose.Schema({
    use:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Captain',
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true
    },
    fare:{
        type:Number,
        required:true
        
    },
    status:{
        type:String,
          enum:['pending','acceped','ongoing','completed','cancelled'],
        default:'pending'
    }, 
    duration:{
        type:Number
    },
    distance:{
        type:Number
    },
    paymentId:{
        type:String
    },
    orderId:{
        type:String
    },
    signature:{
        type:String
    }

})

module.exports=mongoose.model('Ride',rideSchema)