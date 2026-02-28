const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    speaker: { type: String },
    venue: { type: String },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    joinLink: { type: String } // optional (for live session)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
