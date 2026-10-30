const mongoose=require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MONGODB CONNECTED");
    })
    .catch(err=>{console.log(err)});
}

module.exports=connectDB;