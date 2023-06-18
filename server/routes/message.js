import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addMessage, getMessages } from "../controllers/message.js";

const router = express.Router();

router.post("/", addMessage);
router.get("/:chatId", getMessages);

export default router;
