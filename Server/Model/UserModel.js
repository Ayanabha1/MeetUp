const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  },
  password: {
    type: String,
    min: 6,
    required: "Password is required",
  },
  meettings: {
    type: [String],
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", userSchema);
