import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  files:
    [{
      type: String,
    }]
}, { timestamps: true })

const DocumentTypeModel = mongoose.model("documenttype", schema)
export default DocumentTypeModel;