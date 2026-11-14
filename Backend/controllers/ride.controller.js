const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captainModel'); // 👈 Imported

// 1. Create Ride & Notify Captains
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

        // Pickup coordinates & Radius
        const pickupCoordinates = await mapService.getCoordinates(pickup);
        let captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            10 // 10 KM radius
        );

        // Agar radius mein koi na mile (testing purpose), toh active online captains ko alert karein
        if (!captainsInRadius || captainsInRadius.length === 0) {
            captainsInRadius = await captainModel.find({ socketId: { $exists: true, $ne: "" } });
        }

        const rideWithUser = await rideModel.findById(ride._id).populate('user');

        // Sabhi active captains ko 'new-ride' event emit karein
        captainsInRadius.forEach(captain => {
            if (captain.socketId) {
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: rideWithUser
                });
            }
        });

    } catch (err) {
        console.error("Error creating ride:", err);
        return res.status(500).json({ errors: err.message });
    }
};

// 2. Get Fare
module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        console.error("Error getting fare:", err);
        return res.status(500).json({ errors: err.message });
    }
};

// 3. Confirm Ride (Captain dwara accept karna)
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        await rideModel.findOneAndUpdate(
            { _id: rideId },
            {
                status: 'accepted',
                captain: req.captain._id
            }
        );

        const ride = await rideModel.findOne({ _id: rideId })
            .populate('user')
            .populate('captain')
            .select('+otp');

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        console.log("🚕 Ride Confirmed! User Socket ID:", ride.user?.socketId);

        // User ko socket alert bhejein
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-confirmed',
                data: ride
            });
            console.log("✅ 'ride-confirmed' event sent to user socket:", ride.user.socketId);
        } else {
            console.warn("⚠️ User socketId not found on ride.user!");
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error confirming ride:", err);
        return res.status(500).json({ message: err.message });
    }
};

// 4. Start Ride with OTP verification
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.body;

    try {
        const ride = await rideModel.findOne({ _id: rideId })
            .populate('user')
            .populate('captain')
            .select('+otp');

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.status !== 'accepted') {
            return res.status(400).json({ message: 'Ride is not accepted yet' });
        }

        // ❌ Pehle yeh tha: if (ride.otp !== otp)
        // ✅ Isse replace karein (100% safe):
        if (String(ride.otp).trim() !== String(otp).trim()) {
            return res.status(400).json({ message: 'Invalid OTP! Please check with passenger.' });
        }

        await rideModel.findOneAndUpdate({ _id: rideId }, { status: 'ongoing' });

        // User ko alert bhejein ki Ride Start ho gayi hai
        if (ride.user && ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-started',
                data: ride
            });
        }

        return res.status(200).json(ride);
    } catch (err) {
        console.error("Error starting ride:", err);
        return res.status(500).json({ message: err.message });
    }
};