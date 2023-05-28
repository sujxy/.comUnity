import Chat from "../models/chat.js";
import Message from "../models/message.js";

//create chat bw user and buddy

export const createChat = async (req, res) => {
  try {
    const { senderId, recieverId } = req.body;

    const newChat = new Chat({
      members: [senderId, recieverId],
    });
    const savedChat = await newChat.save();

    res.status(200).json(savedChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get user chats

export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ members: { $in: [userId] } });
    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//find user chats

export const findChat = async (req, res) => {
  try {
    const { fId, sId } = req.params;
    const chat = await Chat.findOne({ members: { $all: [fId, sId] } });
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
