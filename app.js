// lior-vainer-322780941-rom-pollak-325106409

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const mongoose = require("mongoose");
const postsRoute = require("./routes/posts_route");
const commentsRoute = require("./routes/comments_route");

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
