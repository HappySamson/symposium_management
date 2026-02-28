const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    category: { type: String, required: true },
    department: { type: String, required: true },
    imageUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);