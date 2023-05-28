import Post from "../models/post.js";
import User from "../models/user.js";
import Comunity from "../models/comunity.js";

export const createPost = async (req, res) => {
  try {
    const { Id, content, picturePath, isComunity } = req.body;

    if (isComunity == 1) {
      const comunity = await Comunity.findById(Id);
      const newPost = new Post({
        userId: Id,
        content: content,
        picturePath: picturePath,
        firstName: comunity.name,
        lastName: "",
        description: comunity.description,

        userPicturePath: comunity.picturePath,
        isComunity: true,
        saves: {},
        upvotes: {},
        comments: [],
      });
      await newPost.save();
    } else {
      const user = await User.findById(Id);
      const newPost = new Post({
        userId: Id,
        content: content,
        picturePath: picturePath,
        firstName: user.firstName,
        lastName: user.lastName,
        description: user.description,
        department: user.department,
        userPicturePath: user.picturePath,
        isComunity: false,
        saves: {},
        upvotes: {},
        comments: [],
      });
      await newPost.save();
    }

    const posts = await Post.find({});
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getComunityPosts = async (req, res) => {
  try {
    const { comId } = req.params;
    const posts = await Post.find({ userId: comId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const upvotePost = async (req, res) => {
  try {
    const { userId } = req.body; //id of interacting user
    const { id } = req.params; //post id
    const post = await Post.findById(id);
    const isUpvoted = post.upvotes.get(userId);

    if (isUpvoted) {
      post.upvotes.delete(userId);
    } else {
      post.upvotes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { upvotes: post.upvotes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//savepost

//update user saved array
export const saveToUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const user = await user.findById(userId);
    const post = await user.findById(id);

    const isSaved = post.saves.get(userId);
    if (isSaved) {
      user.savedPosts = user.savedPosts.filter((key_id) => {
        return key_id != id;
      });
    } else {
      user.savedPosts.push(id);
    }

    await user.save();
    next();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//post update
export const savePost = async (req, res) => {
  try {
    const { userId } = req.body; //id of user savingthe post
    const { id } = req.params; //post id
    const post = await Post.findById(id);

    const isSaved = post.saves.get(userId);

    if (isSaved) {
      post.saves.delete(userId);
    } else {
      post.saves.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { saves: post.saves },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
