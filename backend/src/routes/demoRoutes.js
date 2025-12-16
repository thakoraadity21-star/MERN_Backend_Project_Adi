import express from "express";

const router = express.Router();

// GET test route (Day 1 style)
router.get("/", (req, res) => {
  res.json({
    message: "Demo API working (GET)"
  });
});

// POST route (Day 2 task)
router.post("/add", (req, res) => {
  const data = req.body;

  res.status(201).json({
    success: true,
    message: "Demo data received successfully",
    data
  });
});

export default router;
