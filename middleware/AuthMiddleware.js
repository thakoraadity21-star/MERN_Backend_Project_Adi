const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); 
const User = require('../models/userModel');
//all steps 

const protect = asyncHandler(async (req, res, next) => {
 let token;

 // 1.check hader
 if (
 req.headers.authorization &&
 req.headers.authorization.startsWith('Bearer')
 ) {
 try {
 //get token for hader
 token = req.headers.authorization.split(' ')[1];

 // 2.verify 
 const decoded = jwt.verify(token, process.env.JWT_SECRET); 

 // 3.user define 
 req.user = await User.findById(decoded.id).select('-password'); 
 
 if (req.user) {
 //basic steps 
 next();
 } else {
 res.status(401);
 //this for check for error to find 
 throw new Error('User not found'); 
 }

 } catch (error) {
 //show error and handel it 
 res.status(401);
 //steps 
 throw new Error('Not authorized, token failed'); 
 }
   } else {
    res.status(401);
 //if token not show this 
 throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };