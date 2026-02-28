const mongoose = require("mongoose");

const coordinatorSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  faculty: {
    type: String,
    required: true
  },
  student: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Coordinator", coordinatorSchema);
