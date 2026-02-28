const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

/* ADD EVENT */
router.post("/add-event", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      event
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add event" });
  }
});

module.exports = router;
