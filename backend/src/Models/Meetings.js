const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  meeting_id: { type: String, require: true },
  admin_id: { type: String, require: true },
  participants: [String],
  date: { type: Date, require: true },
});

module.exports = mongoose.model("Meetings", UserSchema);
