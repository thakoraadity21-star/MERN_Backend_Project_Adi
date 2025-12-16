import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import demoRoutes from "./routes/demoRoutes.js";
import userRoutes from './routes/userRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';

dotenv.config();

const app = express();

// CORS
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
app.use(express.json());

// DB
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('FATAL ERROR: MONGO_URI is not defined');
      return false;
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    return false;
  }
};

// Server
async function startServer() {
  const isConnected = await connectDB();

  if (!isConnected) {
    console.error('Server stopped due to DB error');
    return;
  }

  app.use('/api/users', userRoutes);
  app.use('/api/resources', resourceRoutes);
  app.use("/api/demo", demoRoutes);


  app.get('/', (req, res) => {
    res.send('MERN Backend Project Adi is running!');
  });

  const PORT = process.env.PORT || 10000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
