import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { createChat, findChat, getUserChats } from "../controllers/chat.js";

const router = express.Router();

//posts
router.post("/", createChat);
//get
router.get("/:userId", getUserChats);
router.get("/find/:fId/:sId", findChat);

export default router;
