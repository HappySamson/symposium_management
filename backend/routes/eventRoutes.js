const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

/* ============================
   ADD EVENT (ADMIN)
   ============================ */
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      event
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add event",
      error: error.message
    });
  }
});

/* ============================
   GET ALL EVENTS (USER + ADMIN)
   ============================ */
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
});

/* ============================
   GET SINGLE EVENT (FOR EDIT)
   ============================ */
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event"
    });
  }
});

/* ============================
   UPDATE EVENT (EDIT MODAL)
   ============================ */
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message
    });
  }
});

/* ============================
   DELETE EVENT
   ============================ */
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete event"
    });
  }
});

module.exports = router;
