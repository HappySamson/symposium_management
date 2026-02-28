const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "Editor" },
  status: { type: String, default: "Active" },
});

// Hash password before save
adminSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Hash password before findOneAndUpdate
adminSchema.pre("findOneAndUpdate", async function() {
  const update = this.getUpdate();
  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }
});

module.exports = mongoose.model("Admin", adminSchema);