const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    summary: String,
    content: String,
    image: String,
  },
  {
    tomestamp: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);