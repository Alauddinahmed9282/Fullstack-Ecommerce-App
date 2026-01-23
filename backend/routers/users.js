const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = require("express").Router();

//update user
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
});

//delete user
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    await User.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
});

//Get all users
router.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

//Get all users (alternative endpoint)
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

//Get user by id
router.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
});

//follow user
router.put("/follow/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const userToFollow = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: userId });

    if (!userToFollow) {
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

    if (req.params.id === userId) {
      return res.status(400).json({
        status: false,
        message: "You cannot follow yourself",
      });
    }

    const isFollowing =
      userToFollow.follower && userToFollow.follower.includes(userId);

    if (isFollowing) {
      return res.status(200).json({
        status: true,
        message: "You already follow this user",
      });
    }

    await User.updateOne(
      { _id: req.params.id },
      { $push: { follower: userId } }
    );
    await User.updateOne(
      { _id: userId },
      { $push: { following: req.params.id } }
    );

    res.status(200).json({
      status: true,
      message: "Followed user successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to follow user",
      error: error.message,
    });
  }
});

//unfollow user
router.put("/unfollow/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const userToUnfollow = await User.findOne({ _id: req.params.id });
    const currentUser = await User.findOne({ _id: userId });

    if (!userToUnfollow) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    if (!currentUser) {
      return res.status(404).json({
        status: false,
        message: "Current user not found",
      });
    }

    if (req.params.id === userId) {
      return res.status(400).json({
        status: false,
        message: "You cannot unfollow yourself",
      });
    }

    const isFollowing =
      userToUnfollow.follower && userToUnfollow.follower.includes(userId);

    if (!isFollowing) {
      return res.status(200).json({
        status: true,
        message: "You are not following this user",
      });
    }

    await User.updateOne(
      { _id: req.params.id },
      { $pull: { follower: userId } }
    );
    await User.updateOne(
      { _id: userId },
      { $pull: { following: req.params.id } }
    );

    res.status(200).json({
      status: true,
      message: "Unfollowed user successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to unfollow user",
      error: error.message,
    });
  }
});

module.exports = router;
