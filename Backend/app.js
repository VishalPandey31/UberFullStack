const dotenv=require('dotenv')
dotenv.config();

const cookie=require('cookie-parser')
const express=require("express");
const cors=require('cors')
const connectDB=require('./db/db')
connectDB();
const userRoutes=require('./routes/userRoutes')
const captainRoutes=require('./routes/captainRoutes');
const app=express();

const  mapsRoutes=require('./routes/map.route')
const rideRoutes=require('./routes/ride.routes');

app.use(cors());
app.use(cookie());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/captain', captainRoutes);
app.use('/api/maps',mapsRoutes);
app.use('/api/rides',rideRoutes);

app.get("/",(req,res)=>{
    res.send("Hello world")
})

module.exports= app;