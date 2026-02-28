const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    eventName: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    college: {
      type: String,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["Completed", "Pending"],
      default: "Completed"
    },

    paymentMode: {
      type: String,
      default: "GPay"
    },

    // IMPORTANT: must store relative path
    paymentScreenshot: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
