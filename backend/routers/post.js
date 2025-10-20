const Post = require("../models/Post");
const router = require("express").Router();
const upload = require("../middleware/upload");

//add post
router.post("/add", upload.single("imageUrl"), async (req, res) => {
  try {
    const newPost = new Post(req.body);
    if (req.file) {
      newPost.imageUrl = req.file.filename;
    }
    newPost
      .save()
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Post added successfully.",
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update post
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    Post.findOneAndUpdate({ _id: id }, { $set: req.body })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Post data update successfully",
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
    const post = await Post.findOne({ _id: id });
    if (post) {
      Post.findByIdAndDelete({ _id: id }).then(() => {
        res.status(200).json({
          status: true,
          message: "Post deleted successfully",
        });
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Post not found with this id",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get post details by post id
router.get("/getPost/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id });

    post &&
      res.status(200).json({
        status: true,
        message: "Post fetched successfully",
        data: post,
      });

    !post &&
      res.status(200).json({
        status: false,
        message: "post not found",
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

//get All post
router.get("/getAllPost", async (req, res) => {
  try {
    await Post.find().then((posts) => {
      res.status(200).json({
        status: true,
        message: "Post fetched data.",
        data: posts,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//get All Post of any user
router.get("/getPostByUser/:id", async (req, res) => {
  try {
    await Post.find({ userId: req.params.id }).then((posts) => {
      res.status(200).json({
        status: true,
        message: "Post fetched Successfully.",
        data: posts,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Posts of any user
// router.get("/getPostByUser/:id", async (req, res) => {
//   if (!req.params.id) {
//     return res.status(400).json({
//       status: false,
//       message: "User ID is required",
//       data: null,
//     });
//   }

//   try {
//     const posts = await Post.find({ userId: req.params.id });

//     if (!posts || posts.length === 0) {
//       return res.status(404).json({
//         status: false,
//         message: "No posts found for this user",
//       });
//     }
//     res.status(200).json({
//       status: true,
//       message: "Posts fetched successfully",
//       data: posts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// });

//like post
router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    let isLiked = false;
    post.likes.map((item) => {
      if (item === req.body.userId) {
        isLiked = true;
      }
    });

    if (isLiked) {
      await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.body.userId } }
      );

      return res.status(200).json({
        status: true,
        message: "Like remove successfully",
      });
    } else {
      await Post.updateOne(
        { _id: req.params.id },
        { $push: { likes: req.body.userId } }
      );

      return res.status(200).json({
        status: true,
        message: "Post liked successfully",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
