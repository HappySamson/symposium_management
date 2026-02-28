const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      category,
      venue,
      description,
      rules,
      facultyCoordinator,
      studentCoordinator
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const event = new Event({
      name,
      category,
      venue,
      description,
      rules: JSON.parse(rules),
      imageUrl: `/uploads/${req.file.filename}`,
      facultyCoordinator: JSON.parse(facultyCoordinator),
      studentCoordinator: JSON.parse(studentCoordinator)
    });

    await event.save();

    res.status(201).json(event);
  } catch (err) {
    console.error("EVENT CREATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
