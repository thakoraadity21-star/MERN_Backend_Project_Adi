const express = require("express");
const router = express.Router();

//steps 
const User = require("../models/userModel"); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { protect } = require('../middleware/AuthMiddleware'); 

//user method 
//register method to guide in post man 
//all steps 

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body; 

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "This email is already registered" });
        }

        //handl pass
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); 

        //save the new user in postman and do same user port 
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            message: "User successfully registered",
            user: { id: newUser._id, name: newUser.name, email: newUser.email }
        });

    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Server error during registration" });
    }
});

//stpes
//user=info for post all etc to discover in postman 
//login api methods how to do all step 

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        //compares pass = gamil+pass

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        //creat token for post man new user 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token, 
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error during login" });
    }
});


//steps
//simple info for profile  to what do in post man and what show to impact 
//
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        message: "This is a protected profile route!"
    });
});

//export to router show in end point 
module.exports = router;