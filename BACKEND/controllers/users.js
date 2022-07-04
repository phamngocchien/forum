import MessengerModel from "../models/messenger.js";
import UsersModel from "../models/users.js"

export const getUsers = async (req, res) => {
  try {
    const users = await UsersModel.find()
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const addUserInMessage = async (item) => {
  const message = await MessengerModel.findById("6215012ef4257a58c384d902");
  message.participants.push(item);
  message.save();
}
export const createUser = async (req, res) => {
  const users = await UsersModel.find();
  const newUser = req.body;
  const userFilter = users.filter(ele => ele.msv === newUser.msv)
  if (userFilter.length == 0) {
    const user = new UsersModel(newUser)
    await user.save();
    res.status(200).json(user);
    addUserInMessage(user._id);
  } else {
    res.status(400).json(
      "This user already exists",
    );
  }
};

export const createListUser = async (req, res) => {
  try {
    const existUser = []
    const users = await UsersModel.find();
    const listUser = req.body;
    await listUser.map((item) => {
      const userFilter = users.filter(ele => String(ele.msv) == String(item.msv) && String(ele.name) == String(item.name))
      if (userFilter.length === 0) {
        const user = new UsersModel(item)
        user.save();
        addUserInMessage(user._id);

      } else {
        existUser.push(userFilter[0])
      }
    })
    if (existUser.length !== 0) {
      res.status(500).json(existUser);
    } else {
      res.status(200).json(listUser);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = req.body;
    const user = await UsersModel.findOneAndUpdate({ _id: req.params.id }, updateUser, { new: true });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
function removeElement(array, elem) {
  var index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
};
export const deleteUser = async (req, res) => {
  try {
    let user = await UsersModel.findById(req.params.id)
    const message = await MessengerModel.findById("6215012ef4257a58c384d902");
    removeElement(message.participants, user._id)
    message.save();
    user.remove();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const userByID = async (req, res) => {
  try {
    const user = await UsersModel.findById({ _id: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const searchUser = async (req, res) => {
  try {
    const params = req.body.keyword;
    const user = await UsersModel.find({
      $or: [
        { name: new RegExp(params.toLowerCase(), "i") },
        { msv: new RegExp(params.toLowerCase(), "i") },
        { role: new RegExp(params.toLowerCase(), "i") },
        { email: new RegExp(params.toLowerCase(), "i") },
        { major: new RegExp(params.toLowerCase(), "i") },
      ],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ err: error });
  }
};



export const handleFollow = async (req, res) => {
  try {
    const userDetail = await UsersModel.findById({ _id: req.params.id });
    if (req.body.mode === "follow") {
      userDetail.follow.push(req.body.id)
      userDetail.save();
    }
    if (req.body.mode === "unfollow") {
      userDetail.follow.pull(req.body.id)
      userDetail.save();
    }
    res.status(200).json(userDetail);

  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const handleMark = async (req, res) => {
  try {
    const userDetail = await UsersModel.findById({ _id: req.body.idUser });
    const mode = req.body.mode
    const idPost = req.params.idPost
    if (mode === "create") {
      const newBookmark = userDetail.bookmark.push(idPost)
      const newUser = { ...userDetail, bookmark: newBookmark }
      const user = await UsersModel.findOneAndUpdate({ _id: req.body.idUser }, newUser, {
        new: true,
      });
      res.status(200).json(user);
    }
    if (mode === "delete") {
      const newBookmark = removeElement(userDetail.bookmark, idPost)
      const newUser = { ...userDetail, bookmark: newBookmark }
      const user = await UsersModel.findOneAndUpdate({ _id: req.body.idUser }, newUser, {
        new: true,
      });
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUserFollow = async (req, res) => {
  try {
    const userFollow = []
    const userDetail = await UsersModel.findById({ _id: req.params.id });
    const users = await UsersModel.find();
    userDetail.follow.map(item => {
      const userFilter = users.filter(item2 => String(item2._id) === String(item))
      if (userFilter.length !== 0) {
        userFollow.push(userFilter[0]);
      }
    })
    res.status(200).json(userFollow);

  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const handleNotification = async (data) => {
  const userDetail = await UsersModel.findById({ _id: data.writer });
  userDetail.notification.push(data)
  userDetail.save()
};

export const handleNotificationAdmin = async (data) => {
  const users = await UsersModel.find();
  users.map(item => {
    if (item.role === "student") {
      item.notification.push(data)
      item.save()
    }
  })
};

export const handleNotificationUser = async (data, id) => {
  const user = await UsersModel.findById(id);
  user.notification.push(data);
  user.save();
};

export const getQuantityOfUser = async (req, res) => {
  try {
    const users = await UsersModel.find()
    res.status(200).json(users.length);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};