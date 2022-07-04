import PostsModel from "../models/posts.js";
import RepliesModel from "../models/replies.js"

export const getReplies = async (req, res) => {
  try {
    RepliesModel.find()
      .populate('post')
      .populate('user')
      .then(data => {
        res.status(200).json(data);
      })
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const getReplyByPost = async (req, res) => {
  try {
    const reply = await RepliesModel.find({ post: req.params.id }).populate('user');
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getReplyByUserId = async (req, res) => {
  try {
    const reply = await RepliesModel.find({ user: req.params.id });

    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createReply = async (req, res) => {
  try {
    const newReply = req.body;
    const reply = new RepliesModel(newReply);
    await reply.save();
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const updateReply = async (req, res) => {
  try {
    const updateReply = req.body;
    const reply = await RepliesModel.findOneAndUpdate({ _id: req.params.id }, updateReply, { new: true }).populate('user');
    await reply.save();
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const deleteReply = async (req, res) => {
  try {
    let reply = await RepliesModel.findById({ _id: req.params.id })
    reply.remove();
    res.status(200).json(reply);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const deleteReplyByPost = async (req, res) => {
  try {
    const replies = await RepliesModel.find({ post: req.params.id });
    replies.map(item => {
      item.remove()
    })
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}