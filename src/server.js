import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// राउट्स इंपोर्ट करें
import userRoutes from './routes/userRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';

dotenv.config();

const app = express();

// --- CORS कॉन्फ़िगरेशन (जैसा आपने प्रदान किया है) ---
const allowedOrigins = [
    'http://localhost:3000',
    'https://mern-backend-project-adi.onrender.com'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false })); // यदि आवश्यकता हो तो जोड़ें

// --- डेटाबेस कनेक्शन फ़ंक्शन (कोई बदलाव नहीं) ---
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('FATAL ERROR: MONGO_URI is not defined in environment variables.');
            return false; // इंगित करता है कि कनेक्शन विफल रहा
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
        return true; // इंगित करता है कि कनेक्शन सफल रहा
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.error('MongoDB error:', error);
        return false; // इंगित करता है कि कनेक्शन विफल रहा
    }
};


// --- ⚠️ मुख्य निष्पादन ब्लॉक को `async` में बदलें ⚠️ ---
async function startServer() {
    const isConnected = await connectDB(); // MongoDB कनेक्ट होने तक प्रतीक्षा करें
    
    // यदि कनेक्शन विफल हो जाता है, तो सर्वर शुरू न करें
    if (!isConnected) {
        console.error('Exiting server startup due to database connection failure.');
        return; 
    }

    // राउट्स मैपिंग
    app.use('/api/users', userRoutes);
    app.use('/api/resources', resourceRoutes);

    // Ping/Health Check Route
    app.get('/', (req, res) => {
        res.send('MERN Backend Project Adi is running!');
    });

    const PORT = process.env.PORT || 10000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// सर्वर शुरू करें
startServer();
