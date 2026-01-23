const Post = require("../models/Post");
const router = require("express").Router();
const upload = require("../middleware/upload");

//add post
router.post("/add", upload.single("imageUrl"), async (req, res) => {
  try {
    const { userId, username, description, caption } = req.body;

    // Validate required fields
    if (!userId || !username) {
      return res.status(400).json({
        status: false,
        message: "User ID and username are required",
      });
    }

    const postData = {
      userId,
      username,
      caption: description || caption || "",
      likes: [],
      comments: [],
    };

    if (req.file) {
      postData.imageUrl = req.file.filename;
    }

    const newPost = new Post(postData);
    await newPost.save();

    res.status(200).json({
      status: true,
      message: "Post added successfully.",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Failed to add post",
      error: error.message,
    });
  }
});

//update post
router.put("/update/:id", upload.single("imageUrl"), async (req, res) => {
  const { id } = req.params;
  try {
    const updateData = {
      caption: req.body.description || req.body.caption || "",
    };

    // If a new image is uploaded, update the imageUrl
    if (req.file) {
      updateData.imageUrl = req.file.filename;
    }

    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
});

//delete post
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    await Post.findByIdAndDelete({ _id: id });
    res.status(200).json({
      status: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
});

//get post details by post id
router.get("/getPost/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id });

    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch post",
      error: error.message,
    });
  }
});

//get All post
router.get("/getAllPost", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
});

//get All Post of any user
router.get("/getPostByUser/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const posts = await Post.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      status: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch user posts",
      error: error.message,
    });
  }
});

//like post
router.put("/like/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
    }

    const isLiked = post.likes && post.likes.includes(userId);

    if (isLiked) {
      await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: userId } }
      );

      return res.status(200).json({
        status: true,
        message: "Post unliked successfully",
      });
    } else {
      await Post.updateOne(
        { _id: req.params.id },
        { $push: { likes: userId } }
      );

      return res.status(200).json({
        status: true,
        message: "Post liked successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to like post",
      error: error.message,
    });
  }
});

module.exports = router;
