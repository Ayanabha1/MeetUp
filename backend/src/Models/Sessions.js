const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  socket_id: { type: String, require: true },
  user_id: { type: String, require: true },
  session_token: { type: String, require: true },
});

module.exports = mongoose.model("Sessions", UserSchema);
