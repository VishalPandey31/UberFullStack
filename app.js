const dotenv=require('dotenv')
dotenv.config();

const express=require("express");
const cors=require('cors')
const connectDB=require('./db/db')
connectDB();
const userRoutes=require('./routes/userRoutes')
const app=express();

app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);

app.get("/",(req,res)=>{
    res.send("Hello world")
})

module.exports= app;