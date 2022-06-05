const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    default: "",
    maxlength: 25,
  },
  password: { type: String, default: "", maxlength: 50, required: true },
  email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("User", userSchema);
