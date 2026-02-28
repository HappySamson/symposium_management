const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const upload = require("../middleware/upload");

/* ===========================
   GET ALL TEAM MEMBERS
=========================== */
router.get("/", async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===========================
   CREATE TEAM MEMBER
=========================== */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newMember = new Team({
      name: req.body.name,
      role: req.body.role,
      category: req.body.category,
      department: req.body.department,
      imageUrl: req.file
        ? `http://localhost:5000/uploads/team/${req.file.filename}`
        : ""
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ===========================
   UPDATE TEAM MEMBER
=========================== */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      role: req.body.role,
      category: req.body.category,
      department: req.body.department
    };

    if (req.file) {
      updateData.imageUrl =
        `http://localhost:5000/uploads/team/${req.file.filename}`;
    }

    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* ===========================
   DELETE TEAM MEMBER
=========================== */
router.delete("/:id", async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;