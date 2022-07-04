import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  }
}, { timestamps: true })

const TagsModel = mongoose.model("tag", schema)
export default TagsModel;