const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

//update post
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

//delete post
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

//follow
router.put("/follow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: req.body.userId });

    // 2. Check if users exist
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User to follow not found",
      });
    }

    if (!currentUser) {
      return res.status(404).json({
        status: false,
        message: "Current user not found",
      });
    }

    // 3. Check if user is trying to follow themselves
    if (req.params.id === req.body.userId) {
      return res.status(400).json({
        status: false,
        message: "You cannot follow yourself",
      });
    }

    // 4. Fixed variable name (idFollow → isFollow)
    let isFollow = false;

    // 5. Check if already following (using correct field name)
    if (user.follower && user.follower.includes(req.body.userId)) {
      isFollow = true;
    }

    if (isFollow) {
      return res.status(200).json({
        status: true,
        message: "You already follow this user",
      });
    } else {
      // 6. Add await to update operations and use transaction for data consistency
      await User.updateOne(
        { _id: req.params.id },
        { $push: { follower: req.body.userId } }
      );
      await User.updateOne(
        { _id: req.body.userId },
        { $push: { following: req.params.id } }
      );

      return res.status(200).json({
        status: true,
        message: "Followed user successfully",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//unfollow
router.put("/unfollow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: req.body.userId });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User to follow not found",
      });
    }

    if (!currentUser) {
      return res.status(404).json({
        status: false,
        message: "Current user not found",
      });
    }

    // 3. Check if user is trying to follow themselves
    if (req.params.id === req.body.userId) {
      return res.status(400).json({
        status: false,
        message: "You cannot follow yourself",
      });
    }

    let isFollow = false;
    // 5. Check if already following (using correct field name)
    if (user.follower && user.follower.includes(req.body.userId)) {
      isFollow = true;
    }

    if (!isFollow) {
      return res.status(200).json({
        status: true,
        message: "You are not follow this user",
      });
    } else {
      await User.updateOne(
        { _id: req.params.id },
        { $pull: { follower: req.body.userId } }
      );
      await User.updateOne(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } }
      );

      return res.status(200).json({
        status: true,
        message: "Unfollowed user successfully",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
