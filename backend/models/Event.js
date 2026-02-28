const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String, required: true },
  rules: [String],

  imageUrl: { type: String, required: true },

  facultyCoordinator: {
    name: String,
    designation: String,
    department: String,
    phone: String,
    email: String
  },

  studentCoordinator: {
    name: String,
    designation: String,
    department: String,
    phone: String,
    email: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
