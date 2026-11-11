const rideService=require('../services/ride.service');
const {validationResult}=require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        res.status(201).json({ ride });

        // 1. Pickup ke coordinates nikalein
        const pickupCoordinates = await mapService.getCoordinates(pickup);

        // 2. 5 KM radius mein captains dhundein
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            5
        );

        // 3. User ki details sath mein lein
        const rideWithUser = await rideModel.findById(ride._id).populate('user');

        // 4. Sabhi active captains ko 'new-ride' event emit karein!
        captainsInRadius.forEach(captain => {
            if (captain.socketId) {
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: rideWithUser
                });
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ errors: err.message });
    }
};

module.exports.getFare=async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    const {pickup,destination}=req.query;
    try{
        const fare=await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }
    catch(err){
      return res.status(500).json({errors:err.message});
    
    }
}