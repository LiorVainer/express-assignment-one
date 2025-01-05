const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  }
});

const commentModel = mongoose.model("Comments", commentSchema);

module.exports = commentModel;
