const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, emailId, mobile, password, gender } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    emailId,
    mobile,
    password: hashedPassword,
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

router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await User.findOne({ emailId });
    !user && res.status(200).json({ status: false, message: "User not found" });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.status(200).json({
          status: true,
          message: "User found succefully",
          data: user,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Wrong password",
        });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
