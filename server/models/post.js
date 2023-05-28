import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    department: String,
    picturePath: String,
    userPicturePath: String,
    description: String,
    content: String,
    isComunity: Boolean,
    upvotes: {
      type: Map,
      of: Boolean,
    },
    saves: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
