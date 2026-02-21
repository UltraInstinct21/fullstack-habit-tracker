const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  password: {
    type: String // nullable for Google users
  },
  googleId: {
    type: String
  },
  authProvider: {
    type: String,
    default: "local"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model("userModel", UserSchema);