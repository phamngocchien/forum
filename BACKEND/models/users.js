import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  msv: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  major: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  bookmark: [{
    type: String,
    ref: 'post',
  }],
  follow: [{
    type: String,
  }],
  notification: [{
    type: {
      type: String
    },
    userName: {
      type: String,
    },
    userId: {
      type: String,
    },
    post: {
      type: String,
    },
    postId: {
      type: String,
    },
    writer: {
      type: String,
    },
    read: {
      type: Boolean
    },
    createdAt: {
      type: Date
    }
  }
  ]
}, { timestamps: true })
// schema.virtual('posts', {
//   ref: 'post',
//   localField: '_id',
//   foreignField: 'user'
// });
const UsersModel = mongoose.model("user", schema)
export default UsersModel;

