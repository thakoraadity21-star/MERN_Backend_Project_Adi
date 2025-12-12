import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
// 
// 
import asyncHandler from 'express-async-handler'; 

// 
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. 
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 
            token = req.headers.authorization.split(' ')[1];

            // 2.
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 

            // 3. 
            req.user = await User.findById(decoded.id).select('-password'); 
            
            if (req.user) {
                //
                next();
            } else {
                res.status(401);
                throw new Error('User not found'); 
            }

        } catch (error) {
            console.error(error); //
            res.status(401);
            throw new Error('Not authorized, token failed'); 
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// 
// 
export { protect };