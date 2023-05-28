import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createChat, findChat, getUserChats } from "../controllers/chat.js";

const router = express.Router();

//posts
router.post("/", verifyToken, createChat);
//get
router.get("/:userId", verifyToken, getUserChats);
router.get("/find/:fId/:sId", verifyToken, findChat);

export default router;
