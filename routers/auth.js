const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, emailId, mobile, password, gender } = req.body;
  const newUser = new User({
    username,
    emailId,
    mobile,
    password,
    gender,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
