import CommentModel from "../models/Comment.js";

export const create = async (req, res) => {
  try {
    const doc = new CommentModel({
      text: req.body.text,
      post: req.params.postid,
      user: req.userId,
    });

    const comment = await doc.save();

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create the comment",
    });
  }
};

export const getAllbyPostId = async (req, res) => {
  try {
    const postId = req.params.postid;

    const comments = await CommentModel.find({ post: postId })
      .populate("user", "fullName avatarUrl")
      .populate("post")
      .exec();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const comments = await CommentModel.find().populate("user").exec();
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const commentId = req.params.id;

    CommentModel.findOneAndDelete({ _id: commentId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Failed to delete the comment",
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: "comment not found",
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to delete the comment",
    });
  }
};
