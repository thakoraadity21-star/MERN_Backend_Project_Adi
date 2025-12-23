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

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= API ROUTES ================= */
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/demo", demoRoutes);

/* ================= DB ================= */
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
};

/* ================= FRONTEND (VERY IMPORTANT) ================= */
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../../client/build");

  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

/* ================= SERVER ================= */
const PORT = process.env.PORT || 10000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
});
