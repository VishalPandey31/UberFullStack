const rideModel=require('../models/ride.model');
const mapsService=require('./maps.service');
const { randomInt } = require('node:crypto');

async function getFare(pickup, destination) {
   if (!pickup || !destination) {
      throw new Error('Pickup and destination are required');
   }

   const distanceTime = await mapsService.getDistanceTime(pickup, destination);
   const distanceInKm = distanceTime.distance.value / 1000;
   const durationInMinutes = distanceTime.duration.value / 60;

   const calculate = ({ baseFare, perKmRate, perMinuteRate }) => Math.round(
      baseFare + distanceInKm * perKmRate + durationInMinutes * perMinuteRate
   );

 return {
   car: calculate({ baseFare: 50, perKmRate: 15, perMinuteRate: 3 }),
   auto: calculate({ baseFare: 30, perKmRate: 10, perMinuteRate: 2 }),
   motorcycle: calculate({ baseFare: 20, perKmRate: 8, perMinuteRate: 1.5 }),
   distance: distanceTime.distance,   // 👈 Yeh add karein
   duration: distanceTime.duration    // 👈 Yeh add karein
};
}


module.exports.getFare = getFare; 

function getOtp(num) {
    function generateOtp(num) {
        const otp = randomInt(
            Math.pow(10, num - 1),
            Math.pow(10, num)
        ).toString();

        return otp;
    }

    return generateOtp(num);
}

    
module.exports.createRide=async ({user,pickup,destination,vehicleType})=>{
     if(! user || !pickup || !destination || !vehicleType){

        throw new Error("All fields are required");
     }
     const  fare=await getFare(pickup,destination);
     const ride =rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(4),
        fare:fare[vehicleType],
     })

     return ride;
}

module.exports.getFare = getFare;

