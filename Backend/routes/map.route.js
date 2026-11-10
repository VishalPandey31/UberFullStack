const express =require('express');
const router=express.Router();
const authMiddleware=require('../middleware/userMiddleware');
const mapController =require('../controllers/map.controller');
const {query}=require('express-validator');


router.get('/getCoordinates',query('address').isString().isLength({min:3}),authMiddleware.authUser,mapController.getCoordinates)


router.get('/getDistanceTime',query('origin').isString().isLength({min:3}),query('destination').isString().isLength({min:3}),authMiddleware.authUser,mapController.getDistanceTime)


router.get('/getAutoCompleteSuggestions',query('input').isString().isLength({min:3}),authMiddleware.authUser,mapController.getAutoCompleteSuggestions)

module.exports=router;