import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import demoRoutes from "./routes/demoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";

dotenv.config();

const app = express();

/* ================= FIX __dirname ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= CORS ================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-backend-project-adi.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());

/* ================= API ROUTES ================= */
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/demo", demoRoutes);

/* ================= DB CONNECT ================= */
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI missing");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB error:", error.message);
    process.exit(1);
  }
};

/* ================= FRONTEND BUILD (PRODUCTION) ================= */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../../client/build/index.html")
    );
  });
}

/* ================= SERVER START ================= */
const PORT = process.env.PORT || 10000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
