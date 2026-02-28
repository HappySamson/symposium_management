const express = require("express");
const router = express.Router();
const {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

// GET all admins
router.get("/", getAdmins);

// POST new admin
router.post("/", addAdmin);

// PUT update admin
router.put("/:id", updateAdmin);

// DELETE admin
router.delete("/:id", deleteAdmin);

module.exports = router;