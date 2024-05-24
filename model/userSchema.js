const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userId: { type: String },
    userName: { type: String },
    password: { type: String },
    conformPassword: { type: String },

  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);



