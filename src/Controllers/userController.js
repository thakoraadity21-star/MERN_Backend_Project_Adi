const User = require("../models/userModel");
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 
//define the user =req...

//help in logick
//find the path and handel 
const generateToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
    });
};

//handel user 
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please include all fields (name, email, password)" });
    }

    try {
        //check the user 
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        //passs work do in post 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new pass in user 
        const newUser = await User.create({ name, email, password: hashedPassword });

        if (newUser) {
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                //find the real token path 
                token: generateToken(newUser._id), 
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during registration", error: error.message });
    }
};

//find the rela loginuser
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        //all detlis 
        const user = await User.findOne({ email });

        //check the user find and login source
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                //define token 
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials (Email or Password is wrong)" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};

//exports find the req,res path 
//

exports.getMe = async (req, res) => {
    //stpes...
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        message: "Profile data fetched successfully"
    });
};