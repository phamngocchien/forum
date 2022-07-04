import DocumentTypeModel from "../models/document-type.js";

export const getDocumentType = async (req, res) => {
  try {
    const types = await DocumentTypeModel.find();
    res.status(200).json(types);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const createDocumentType = async (req, res) => {
  try {
    const types = await DocumentTypeModel.find();
    const newType = req.body;
    const typeFilter = types.filter(ele => ele.name === newType.name)
    if (typeFilter.length == 0) {
      const type = new DocumentTypeModel(newType)
      await type.save();
      res.status(200).json(type);
    } else {
      res.status(400).json(
        "This tag already exists",
      );
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const updateDocumentType = async (req, res) => {
  try {
    const value = req.body;
    const type = await DocumentTypeModel.findOneAndUpdate({ _id: req.params.id }, value, { new: true });
    await type.save();
    res.status(200).json(type);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const DocTypeByID = async (req, res) => {
  try {
    const type = await DocumentTypeModel.findById(req.params.id);
    res.status(200).json(type);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const deleteDocType = async (req, res) => {
  try {
    const type = await DocumentTypeModel.findById(req.params.id);
    type.remove();
    res.status(200).json(type);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const searchDocType = async (req, res) => {
  try {
    const params = req.body.name;
    const type = await DocumentTypeModel.find(
      { name: { $regex: new RegExp(params.toLowerCase().trim(), "i") } }
    );
    res.status(200).json(type);
  } catch (error) {
    res.status(500).json({ err: error });
  }
}