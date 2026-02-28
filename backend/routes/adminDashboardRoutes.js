const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Event = require("../models/Event");
const Registration = require("../models/Registration");
const Contact = require("../models/Contact");
const Team = require("../models/Team");
const Banner = require("../models/Banner");
const Admin = require("../models/Admin");

/*
  GET  /api/admin/dashboard
*/
router.get("/", async (req, res) => {
  try {
    /* ===============================
       1️⃣ BASIC COUNTS
    ==================================*/
    const [
      totalEvents,
      totalRegistrations,
      technicalEvents,
      nonTechnicalEvents,
      contacts,
      teams,
      banners,
      totalAdmins
    ] = await Promise.all([
      Event.countDocuments(),
      Registration.countDocuments(),
      Event.countDocuments({ category: "Technical" }),
      Event.countDocuments({ category: "Non-Technical" }),
      Contact.countDocuments(),
      Team.countDocuments(),
      Banner.countDocuments(),
      Admin.countDocuments()
    ]);

    /* ===============================
       2️⃣ REGISTRATIONS PER EVENT
    ==================================*/
   const eventChartData = await Registration.aggregate([
  {
    $match: {
      eventName: { $exists: true, $ne: "" }
    }
  },
  {
    $group: {
      _id: "$eventName",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      label: "$_id",
      count: 1
    }
  },
  {
    $sort: { count: -1 }
  }
]);

    /* ===============================
       3️⃣ RECENT REGISTRATIONS
    ==================================*/
    const recentRegistrations = await Registration.find()
      .sort({ createdAt: -1 })
      .limit(5)
      // .populate("eventId", "title")
      .select("name email eventName createdAt");

    /* ===============================
       4️⃣ FINAL RESPONSE
    ==================================*/
    res.json({
      stats: {
        totalEvents,
        totalRegistrations,
        technicalEvents,
        nonTechnicalEvents,
        contacts,
        teams,
        banner: banners,
        totalAdmins,

       eventChart: {
  labels: eventChartData.map(e => e.label),
  values: eventChartData.map(e => e.count)
}
      },

      recentRegistrations: recentRegistrations.map(r => ({
        _id: r._id,
        name: r.name,
        email: r.email,
        eventName: r.eventName,
        createdAt: r.createdAt
      }))
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      message: "Dashboard fetch failed",
      error: error.message
    });
  }
});

module.exports = router;