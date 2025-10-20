const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      max: 50,
      required: true,
    },
    emailId: {
      type: String,
      max: 50,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      max: 15,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      max: 50,
      required: true,
    },
    gender: {
      type: String,
      max: 15,
      required: true,
    },
    dob: {
      type: String,
      max: 15,
    },
    address: {
      type: String,
      max: 15,
    },
    profilePic: {
      type: String,
      max: 15,
    },
    follower: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
