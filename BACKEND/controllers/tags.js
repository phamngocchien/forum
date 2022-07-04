import TagsModel from "../models/tags.js"

export const getTags = async (req, res) => {
  try {
    const tags = await TagsModel.find().sort({ updatedAt: -1 });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const createTag = async (req, res) => {
  try {
    const tags = await TagsModel.find();
    const newTag = req.body;
    const tagFilter = tags.filter(ele => ele.name === newTag.name)
    if (tagFilter.length == 0) {
      const tag = new TagsModel(newTag)
      await tag.save();
      res.status(200).json(tag);
    } else {
      res.status(400).json(
        "This tag already exists",
      );
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const updateTag = async (req, res) => {
  try {
    const updateTag = req.body;
    const tag = await TagsModel.findOneAndUpdate({ _id: req.params.id }, updateTag, { new: true });
    await tag.save();
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const tagByID = async (req, res) => {
  try {
    const tag = await TagsModel.findById(req.params.id);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const deleteTag = async (req, res) => {
  try {
    const tag = await TagsModel.findById(req.params.id);
    tag.remove();
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const SearchTag = async (req, res) => {
  try {
    const params = req.body.name.toLowerCase();
    const tag = await TagsModel.find({
      $or: [
        { name: new RegExp("^" + params.toLowerCase().trim(), "i") }
      ],
    });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ err: error });
  }
}

export const getQuantityOfTag = async (req, res) => {
  try {
    const tags = await TagsModel.find();
    res.status(200).json(tags.length);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
