const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    officerId: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "officer",
    },
    name: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
    bio: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
