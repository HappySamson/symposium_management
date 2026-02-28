const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Banner = require("../models/Banner");

/* =======================
   MULTER CONFIG
======================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/banners");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* =======================
   ADD BANNER
======================= */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const banner = new Banner({
      title: req.body.title,
      subtitle: req.body.subtitle,
      image: `uploads/banners/${req.file.filename}`,
      isActive: req.body.isActive !== "false"
    });

    await banner.save();
    res.status(201).json({ message: "Banner added successfully" });
  } catch {
    res.status(500).json({ message: "Add banner failed" });
  }
});

/* =======================
   GET ALL BANNERS (ADMIN)
======================= */
router.get("/", async (req, res) => {
  const banners = await Banner.find().sort({ createdAt: -1 });
  res.json(banners);
});

/* =======================
   GET ACTIVE BANNERS
======================= */
router.get("/active", async (req, res) => {
  const banners = await Banner.find({ isActive: true });
  res.json(banners);
});

/* =======================
   UPDATE BANNER
======================= */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner)
      return res.status(404).json({ message: "Banner not found" });

    banner.title = req.body.title;
    banner.subtitle = req.body.subtitle;
    banner.isActive = req.body.isActive === "true";

    if (req.file) {
      if (fs.existsSync(banner.image)) fs.unlinkSync(banner.image);
      banner.image = `uploads/banners/${req.file.filename}`;
    }

    await banner.save();
    res.json({ message: "Banner updated successfully" });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
});

/* =======================
   DELETE BANNER
======================= */
router.delete("/:id", async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) return res.status(404).json({ message: "Not found" });

  if (fs.existsSync(banner.image)) fs.unlinkSync(banner.image);
  await banner.deleteOne();

  res.json({ message: "Banner deleted" });
});

module.exports = router;
