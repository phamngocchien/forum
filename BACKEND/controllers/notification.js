import MessengerModel from "../models/messenger.js";
import PostsModel from "../models/posts.js";
import UsersModel from "../models/users.js";
import { createReplyInMessage } from "./messenger.js";
import { handleNotification, handleNotificationAdmin, handleNotificationUser } from "./users.js";

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};
export const controllerNotification = (socket, io) => {
  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id);
    io.emit("members_online", onlineUsers)
  });
  socket.on("push_notification", async (data) => {
    handleNotification(data)
    const receiver = getUser(data.writer);
    io.to(receiver.socketId).emit("get_notification", data)
  });
  socket.on("push_new_post_admin", async (data) => {
    const post = await PostsModel.find({ title: data.post })
    const newData = await { ...data, postId: post[0]?._id }
    await handleNotificationAdmin(newData)
    await socket.broadcast.emit('get_new_post_admin', newData);
  });
  socket.on("push_new_post_user", async (data) => {
    const userFollow = []
    const userFollowOnline = []

    const users = await UsersModel.find();
    users.map(item => {
      item.follow.map(item1 => {
        if (item1 === data.writer) {
          userFollow?.push(item)
          handleNotificationUser(data, item._id)
        }
      })
    })
    userFollow.map(item3 => {
      onlineUsers.map(item4 => {
        if (item3._id == item4.userId) {
          userFollowOnline?.push(item4.socketId)
        }
      })
    })
    userFollowOnline.map(item5 => {
      if (item5 !== "") {
        io.to(item5).emit('push_new_post_user', data);
      }
    })
  });
  //messenger
  socket.on("send_message", async (data) => {
    const users = [];
    await createReplyInMessage(data);
    const message = await MessengerModel.findById(data.idMessage)
    await message.participants.map(item => {
      onlineUsers.map(item2 => {
        if (String(item) === String(item2.userId)) {
          users.push(item2.socketId)
        }
      })
    })
    const user = await UsersModel.findById(data.user)
    const time = new Date(data.createdAt)
    const newData = {
      idMessage: data.idMessage,
      user: {
        _id: user._id,
        name: user.name
      },
      content: data.content,
      createdAt: time
    }
    users.map(item5 => {
      if (item5 !== "") {
        io.to(item5).emit('receive_message', newData);
      }
    })
  })

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("members_online", onlineUsers)
  });
}

export const getNotification = async (req, res) => {
  try {
    const userDetail = await UsersModel.findById(req.params.id);
    res.status(200).json(userDetail.notification);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const handleReadNotify = async (req, res) => {
  const date = new Date(req.body.createdAt)
  try {
    const userDetail = await UsersModel.findById(req.params.id);
    const notifyFilter = userDetail.notification.filter((item) => item._id == req.body.idNoti)
    notifyFilter[0].read = true;
    userDetail.save();
    res.status(200).json(notifyFilter[0]);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};