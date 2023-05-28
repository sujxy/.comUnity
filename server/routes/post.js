import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getUserPosts,
  getFeedPosts,
  upvotePost,
  savePost,
  saveToUser,
  getComunityPosts,
} from "../controllers/post.js";

const router = express.Router();

//read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);
router.get("/comunity/:comId", verifyToken, getComunityPosts);

//update
router.patch("/:id/upvote", verifyToken, upvotePost);
router.patch("/:id/save", verifyToken, saveToUser, savePost);

export default router;
