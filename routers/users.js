const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    User.findOneAndUpdate({ _id: id }, { $set: req.body })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "User data update successfully",
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      User.findByIdAndDelete({ _id: id }).then(() => {
        res.status(200).json({
          status: true,
          message: "User deleted successfully",
        });
      });
    } else {
      res.status(200).json({
        status: false,
        message: "User not found with this id",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get users
router.get("/getUsers", async (req, res) => {
  try {
    await User.find().then((users) => {
      res.status(200).json({
        status: true,
        message: "User fetched data.",
        data: users,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get user by id
router.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });

    user &&
      res.status(200).json({
        status: true,
        message: "User fetched successfully",
        data: user,
      });

    !user &&
      res.status(200).json({
        status: false,
        message: "User not found",
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
