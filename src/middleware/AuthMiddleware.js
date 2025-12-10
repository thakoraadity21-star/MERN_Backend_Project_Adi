import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
// asyncHandler का उपयोग करने के लिए, हमें इसे इंस्टॉल करने की आवश्यकता हो सकती है।
// यदि यह पहले से installed नहीं है, तो Render में 'npm install express-async-handler' कमांड चलाएँ।
import asyncHandler from 'express-async-handler'; 

// @desc    यूजर को सुरक्षित करें (टोकन को सत्यापित करें)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. हेडर जांचें
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // हेडर से टोकन प्राप्त करें
            token = req.headers.authorization.split(' ')[1];

            // 2. टोकन सत्यापित करें
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 

            // 3. यूजर को परिभाषित करें और पासवर्ड फ़ील्ड को हटा दें
            req.user = await User.findById(decoded.id).select('-password'); 
            
            if (req.user) {
                // सब ठीक है, अगले middleware पर जाएँ
                next();
            } else {
                res.status(401);
                throw new Error('User not found'); 
            }

        } catch (error) {
            console.error(error); // कंसोल में एरर लॉग करें
            res.status(401);
            throw new Error('Not authorized, token failed'); 
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// ES Module एक्सपोर्ट
// हमें इसे नाम से निर्यात करना होगा क्योंकि हम इसे routes फ़ाइलों में 'import { protect }' के रूप में उपयोग कर रहे हैं।
export { protect };