const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Contact = require("../models/Contact");

// ✅ Import your new mail utility
const sendContactResolvedMail = require("../utils/contactResolvedMail");

// =======================================================
// CREATE NEW CONTACT (POST)
// =======================================================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      status: "Pending"
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact submitted successfully",
      contact: newContact,
    });

  } catch (error) {
    console.error("Create Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contact",
    });
  }
});

// =======================================================
// GET ALL CONTACTS
// =======================================================
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      contacts,
    });

  } catch (error) {
    console.error("FETCH CONTACTS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
});

// =======================================================
// DELETE CONTACT
// =======================================================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID",
      });
    }

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    return res.json({
      success: true,
      message: "Contact deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete contact",
    });
  }
});

// =======================================================
// RESOLVE CONTACT + SEND EMAIL
// =======================================================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact ID",
      });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    if (contact.status === "Resolved") {
      return res.status(400).json({
        success: false,
        message: "Contact already resolved",
      });
    }

    // ==============================
    // UPDATE STATUS FIRST
    // ==============================
    contact.status = "Resolved";
    contact.resolvedAt = new Date();
    await contact.save();

    // ==============================
    // SEND EMAIL (NON-BLOCKING)
    // ==============================
    sendContactResolvedMail(contact);

    return res.json({
      success: true,
      message: "Contact resolved and Email sent successfully",
      contact,
    });

  } catch (error) {
    console.error("RESOLVE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to resolve contact",
      error: error.message,
    });
  }
});

module.exports = router;