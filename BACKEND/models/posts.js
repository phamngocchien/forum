import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  category: {
    type: String
  },
  vote: [{
    user: {
      type: String
    },
    direction: {
      type: String
    },
    score: {
      type: Number
    }
  }],
  user: {
    type: String,
    ref: 'user',
  },
  tag: [{
    type: String,
    ref: 'tag',
  }],
  type: { type: String },
  status: { type: Boolean },
  view: [{ type: String }],
  isFinish: { type: Boolean }
}, { timestamps: true })

const PostsModel = mongoose.model("post", schema)
export default PostsModel;
