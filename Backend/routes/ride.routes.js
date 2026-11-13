const express =require('express');
const router =express.Router();
const {body,query}=require('express-validator');
const rideController=require('../controllers/ride.controller');
const authMiddleware=require('../middleware/userMiddleware');
const captainMiddleware = require('../middleware/captainMiddleware'); 

router.post('/create',authMiddleware.authUser,
   
    body('pickup').isString().notEmpty().withMessage('pickup address is requied'),
    body('destination').isString().notEmpty().withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['car', 'auto', 'motorcycle']).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/getFare',authMiddleware.authUser,
    query('pickup').isString().notEmpty().withMessage('Invalid pickup address '),
     query('destination').isString().notEmpty().withMessage('Invalid destination address'),
     rideController.getFare

)
router.post('/confirm', captainMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
);

module.exports = router;