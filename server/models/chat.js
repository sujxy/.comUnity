import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
