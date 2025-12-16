// backend/src/routes/demoRoutes.js
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Demo GET API working" });
});

router.post("/add", (req, res) => {
  console.log("POST BODY:", req.body);

  res.status(201).json({
    success: true,
    message: "Demo POST API working",
    data: req.body,
  });
});

export default router;
