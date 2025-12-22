import User from '../models/userModel.js'; //
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 
const generateToken = (id) => {
    // 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
    });
};

// 
// 
// 
export const registerUser = async (req, res) => { //
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        //
        return res.status(400).json({ message: "Please include all fields (name, email, password)" });
    }

    try {
        // 
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 
        const newUser = await User.create({ name, email, password: hashedPassword });

        if (newUser) {
            //
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

// 
//
//
export const authUser = async (req, res) => { // 
    const { email, password } = req.body;

    try {
        // 
        const user = await User.findOne({ email });

        // 
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            // 
            res.status(401).json({ message: "Invalid credentials (Email or Password is wrong)" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};

// 
//
// 
export const getMe = async (req, res) => {
  
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        message: "Profile data fetched successfully"
    });
};