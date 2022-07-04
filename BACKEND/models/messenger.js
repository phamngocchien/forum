import mongoose from "mongoose";

const schema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
  },
  participants: [{
    type: String,
    ref: 'user'
  }],
  messages: [{
    content: {
      type: String
    },
    user: {
      type: String,
      ref: 'user'
    },
    createdAt: Date
  }]
}, { timestamps: true })

const MessengerModel = mongoose.model("messenger", schema)
export default MessengerModel;