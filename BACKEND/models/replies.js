import mongoose from "mongoose";

const schema = mongoose.Schema({
  content: {
    type: String,
  },
  user: {
    type: String,
    ref: 'user',
  },
  post: {
    type: String,
    ref: 'post',
  },
}, { timestamps: true })


const RepliesModel = mongoose.model("reply", schema)
export default RepliesModel;
