const commentModel = require("../models/comments_model");

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
      const comment = await commentModel.findById(commentId)
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
    const updatedComment = await commentModel.findByIdAndUpdate(commentId, commentBody, {
      new: true,
    });

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

    res.send(deletedComment);
    } catch (error) {
        res.status(500).send(error.message);
    }
  };

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment
};
