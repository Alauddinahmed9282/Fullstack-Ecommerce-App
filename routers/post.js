const Post = require("../models/Post");

const router = require("express").Router();

//add post
router.post("/add", async (req, res) => {
  try {
    const newPost = new Post(req.body);
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

//Get post by id
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

//Get Post by user
router.get("/getPosts/:id", (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    Post.find({ userId: req.params.id }).then((posts) => {
      console.log("posts", posts);
      res.status(200).json({
        status: true,
        message: "Post fetched Successfully by user.",
        data: posts,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
