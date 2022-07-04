import MessengerModel from "../models/messenger.js"

export const createMessage = async (req, res) => {
  try {
    const message = new MessengerModel(req.body);
    message.save()
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export const getListMessage = async (req, res) => {
  try {
    const { id } = req.params
    const messagesUser = []
    const message = await MessengerModel.find().populate({ path: 'participants', select: '_id name', })
      .populate({ path: 'messages.user', select: '_id name' }).sort('-updatedAt')
    message.map(item => {
      item.participants.map(item2 => {
        if (String(item2._id) === id) {
          const participant = item.participants.filter(item3 => String(item3._id) !== id)
          if (item.messages.length !== 0) {
            var messageClosest = item?.messages?.reduce((prev, curr) => (Number(new Date(prev.createdAt).getTime()) < Number(new Date(curr.createdAt).getTime()) ? curr : prev)
            );
          } else {
            var messageClosest = [];
          }
          const item3 = {
            isGroup: item.isGroup,
            _id: item._id,
            participants: participant,
            messages: messageClosest,
            updatedAt: item.updatedAt
          }
          messagesUser.push(item3);
        }
      })
    })
    res.status(200).json(messagesUser);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const getMessageGroup = async (req, res) => {
  try {
    const message = await MessengerModel.find({ isGroup: true }).populate({ path: 'participants', select: '_id name', })
      .populate({ path: 'messages.user', select: '_id name' }).sort('-updatedAt')
    res.status(200).json(message[0].messages);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const getMessageById = async (req, res) => {
  try {
    const message = await MessengerModel.findById(req.params.id).populate({ path: 'participants', select: '_id name', })
      .populate({ path: 'messages.user', select: '_id name' }).sort('-updatedAt')
    const item = {
      _id: message._id,
      isGroup: message.isGroup,
      messages: message.messages
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export const createReplyInMessage = async (data) => {
  const item = {
    user: data.user,
    content: data.content,
    createdAt: data.createdAt
  }
  const message = await MessengerModel.findById(data.idMessage).populate({ path: 'participants', select: '_id name', })
  await message.messages.push(item)
  message.save();
}