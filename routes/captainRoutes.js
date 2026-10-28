const express=require('express');
const router =express.Router();
const {body}=require("express-validator");
const captainController=require('../controllers/captainController')

router.post('/register',[
   body('firstname').notEmpty().withMessage('First name is required')
      .isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
   body('lastname').optional().isLength({ min: 3 }).withMessage('Last name must be at least 3 characters'),
   body('email').isEmail().withMessage('Invalid Email'),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
   body('vehicle.color').notEmpty().withMessage('Vehicle color is required')
      .isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters'),
   body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required')
      .isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters'),
   body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be a positive number'),
   body('vehicle.vehicletype').isIn(['car', 'bike', 'van']).withMessage('Invalid vehicle type')
],captainController.registerCaptain)


module.exports=router;