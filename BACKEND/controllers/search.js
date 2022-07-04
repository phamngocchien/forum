import PostsModel from "../models/posts.js";
import TagsModel from "../models/tags.js";
import UsersModel from "../models/users.js";

export const searchAll = async (req, res) => {
  try {
    const params = req.body.keyword;
    const data = {};
    if (params !== "") {
      const post = await PostsModel.find({
        $or: [
          { title: { $regex: new RegExp(params.toLowerCase().trim(), "i") } },
          { content: { $regex: new RegExp(params.toLowerCase().trim(), "i") } },
        ],
      }).populate('tag')
        .populate('user')
        .sort('-createdAt').limit(3);
      data.post = post;
      const user = await UsersModel.find({
        $or: [
          { name: { $regex: new RegExp(params.toLowerCase().trim(), "i") } },
          { msv: { $regex: new RegExp(params.toLowerCase().trim(), "i") } },
          { email: { $regex: new RegExp(params.toLowerCase().trim(), "i") } },
        ],
      });
      data.user = user;
      const tag = await TagsModel.find({
        $or: [
          { name: { $regex: new RegExp("^" + params.toLowerCase().trim(), "i") } },
        ],
      });
      data.tag = tag;
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ err: error });
  }
}