const commentModel = require("../models/comments_model");
const postModel = require("../models/posts_model");

const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.find();
    res.send(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await commentModel.findById(commentId);
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createComment = async (req, res) => {
  const commentBody = req.body;

  try {
    // Check if the postId exists
    const postExists = await postModel.findById(commentBody.postId);
    if (!postExists) {
      return res.status(400).send("Invalid postId: Post does not exist");
    }

    const comment = await commentModel.create(commentBody);
    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const commentBody = req.body;

  try {
    const updatedComment = await commentModel.findByIdAndUpdate(
      commentId,
      commentBody,
      {
        new: true,
      }
    );

    if (!updatedComment) {
      res.status(404).send("Comment not found");
    }

    res.send(updatedComment);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const deletedComment = await commentModel.findByIdAndDelete(commentId);
    if (!deletedComment) {
      res.status(404).send("Comment not found");
    }

    res.send(deletedComment.id);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getCommentsByPostId = async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await commentModel.find({ postId });

    if (comments.length === 0) {
      return res.status(404).send("No comments found for this post");
    }

    res.send(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostId,
};
