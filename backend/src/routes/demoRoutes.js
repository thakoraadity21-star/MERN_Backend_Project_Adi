import express from "express";

const router = express.Router();

// 🔹 In-memory data
let demoData = [
  {
    id: 1,
    test: "local",
    createdAt: new Date()
  }
];

// ================= GET =================
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Demo GET API working",
    data: demoData,
  });
});

// ================= POST =================
router.post("/add", (req, res) => {
  const { test } = req.body;

  if (!test) {
    return res.status(400).json({
      success: false,
      message: "Test field is required",
    });
  }

  const newItem = {
    id: demoData.length ? demoData[0].id + 1 : 1,
    test,
    createdAt: new Date(),
  };

  demoData.unshift(newItem);

  res.status(201).json({
    success: true,
    message: "Demo POST API working",
    data: demoData,
  });
});

// ================= PUT (UPDATE) =================
router.put("/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const { test } = req.body;

  const item = demoData.find(d => d.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Item not found",
    });
  }

  item.test = test || item.test;

  res.status(200).json({
    success: true,
    message: "Data updated successfully",
    data: demoData,
  });
});

// ================= DELETE =================
router.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = demoData.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Item not found",
    });
  }

  demoData.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Data deleted successfully",
    data: demoData,
  });
});

export default router;
