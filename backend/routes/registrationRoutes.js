const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Registration = require("../models/Registration");
const sendConfirmationMail = require("../utils/mailer");

/* =======================
   MULTER CONFIG
======================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/payment"); // folder must exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* =======================
   GET ALL REGISTRATIONS (ADMIN)
======================= */
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   POST REGISTRATION
======================= */
router.post("/", upload.single("paymentScreenshot"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Payment screenshot missing" });
    }

    const registration = new Registration({
      eventId: req.body.eventId,
      eventName: req.body.eventName,

      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      department: req.body.department,
      college: req.body.college,

      paymentStatus: "Completed",
      paymentMode: "GPay",

      // store relative path
      paymentScreenshot: `uploads/payment/${req.file.filename}`,
      status: "Pending"
    });

    await registration.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   APPROVE / REJECT + MAIL
======================= */
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    registration.status = status;
    await registration.save();

    // send mail only when approved
    if (status === "Approved") {
      await sendConfirmationMail(registration);
    }

    res.json({
      message:
        status === "Approved"
          ? "Approved & confirmation mail sent"
          : "Registration rejected"
    });
  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

/* =======================
   DELETE REGISTRATION (ADMIN)
======================= */
router.delete("/:id", async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    // delete payment screenshot file safely
    if (registration.paymentScreenshot) {
      const filePath = path.resolve(
        process.cwd(),
        registration.paymentScreenshot
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Registration.findByIdAndDelete(req.params.id);

    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR FULL:", err);
    res.status(500).json({
      message: "Delete failed",
      error: err.message
    });
  }
});


module.exports = router;
