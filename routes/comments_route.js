const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments_controller");

router.get("/", commentsController.getAllComments);

router.post("/", commentsController.createComment);

router.put("/:id", commentsController.updateComment);

router.get("/:id", commentsController.getCommentById);

router.delete("/:id", commentsController.deleteComment);

router.get("/post/:postId", commentsController.getCommentsByPostId);

module.exports = router;
