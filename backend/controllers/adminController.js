const Admin = require("../models/Admin");

// GET all admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching admins" });
  }
};

// POST new admin
exports.addAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error adding admin" });
  }
};

// PUT update admin
exports.updateAdmin = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updatedAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error updating admin" });
  }
};

// DELETE admin
exports.deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting admin" });
  }
};