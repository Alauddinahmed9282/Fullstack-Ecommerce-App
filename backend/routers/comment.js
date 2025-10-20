const router = require("express").Router();
const Comment = require("../models/Comment");

//add comments
router.post("/add", async (req, res) => {
  const { comment, userId, username, postId } = req.body;
  try {
    const newComment = new Comment({ comment, userId, username, postId });
    newComment.save();

    res.status(200).json({
      status: true,
      message: "Comment added successfully.",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete comments
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    if (comment) {
      await Comment.findOneAndDelete({ _id: id })
        .then(() => {
          res.status(200).json({
            status: true,
            message: "Comment deleted successfully",
          });
        })
        .catch((error) => {
          res.status(201).json(error);
        });
    } else {
      res.status(200).json({
        status: false,
        message: "No comment found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all comment by post
router.get("/get/:id", async (req, res) => {
  try {
    await Comment.find({ postId: req.params.id }).then((comments) => {
      res.status(200).json({
        status: true,
        message: "Comments fetched Successfully.",
        data: comments,
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//update comment
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    Comment.findOneAndUpdate({ _id: id }, { $set: req.body })
      .then(() => {
        res.status(200).json({
          status: true,
          message: "Comment update successfully",
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
