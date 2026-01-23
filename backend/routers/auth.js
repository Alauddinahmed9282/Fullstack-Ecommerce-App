const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, emailId, mobile, password, gender } = req.body;

  // Validate input
  if (!username || !emailId || !mobile || !password || !gender) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }

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
    res.status(200).json({
      status: true,
      message: "Registration successful",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        status: false,
        message: `${field} already exists`,
      });
    }
    res.status(500).json({
      status: false,
      message: "Registration failed",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  // Validate input
  if (!emailId || !password) {
    return res.status(400).json({
      status: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(200).json({
        status: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).json({
        status: true,
        message: "Login successful",
        data: user,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Wrong password",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Login failed",
      error: error.message,
    });
  }
});

module.exports = router;
