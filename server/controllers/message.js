import Message from "../models/message.js";
import Chat from "../models/chat.js";

export const addMessage = async (req, res) => {
  try {
    const { chatId, senderId, text } = req.body;
    const message = new Message({
      chatId: chatId,
      senderId: senderId,
      text: text,
    });

    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId: chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
