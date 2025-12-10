import express from 'express';
// ऑथेंटिकेशन कंट्रोलर फ़ंक्शंस को इंपोर्ट करें (यह मानकर कि वे controllers फ़ोल्डर में हैं)
import { registerUser, authUser } from '../controllers/userController.js';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authUser);

export default router;