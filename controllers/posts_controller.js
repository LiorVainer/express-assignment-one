const PostModel = require("../models/posts_model");

const getAllPosts = async (req, res) => {
  const sender = req.query.sender;

  try {
    if (sender) {
      const posts = await PostModel.find({ sender });
      res.send(posts);
    } else {
      const posts = await PostModel.find();
      res.send(posts);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const postBody = req.body;

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(postId, postBody, {
      new: true,
    });

    if (!updatedPost) {
      res.status(404).send("Post not found");
    }

    res.send(updatedPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
};
