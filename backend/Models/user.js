const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tech: {
    type: [String],
    required: true,
  },
  profileImage: String,
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
