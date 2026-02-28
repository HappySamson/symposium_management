const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

  res.status(200).json({
  message: "Login successful",
  admin: {
    id: admin._id,
    name: admin.name,
    email: admin.email
  }
});

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
