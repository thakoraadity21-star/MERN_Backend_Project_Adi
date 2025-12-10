import User from '../models/userModel.js'; // CommonJS 'require' को ES Module 'import' से बदला गया
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT टोकन जनरेट करने का फ़ंक्शन
const generateToken = (id) => {
    // 1 घंटे में टोकन समाप्त हो जाएगा
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
    });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => { // 'exports.' को 'export const' से बदला गया
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        // HTTP 400 Bad Request
        return res.status(400).json({ message: "Please include all fields (name, email, password)" });
    }

    try {
        // यूजर मौजूद है या नहीं, जाँच करें
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // पासवर्ड को हैश करें
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // डेटाबेस में नया यूजर बनाएँ
        const newUser = await User.create({ name, email, password: hashedPassword });

        if (newUser) {
            // सफलता पर 201 Created स्टेटस के साथ टोकन भेजें
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken(newUser._id), 
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error during registration", error: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => { // फ़ंक्शन का नाम 'loginUser' से 'authUser' में बदला गया
    const { email, password } = req.body;

    try {
        // ईमेल से यूजर खोजें
        const user = await User.findOne({ email });

        // यूजर मौजूद है और पासवर्ड सही है
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            // HTTP 401 Unauthorized
            res.status(401).json({ message: "Invalid credentials (Email or Password is wrong)" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};

// @desc    Get user profile data (requires token)
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res) => {
    // यह फ़ंक्शन authMiddleware (protect) पास होने के बाद चलता है,
    // इसलिए req.user में यूजर का डेटा पहले से होता है।
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        message: "Profile data fetched successfully"
    });
};