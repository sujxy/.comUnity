import { verifyToken } from "../middleware/auth.js";
import {
  getAllComunity,
  getComunity,
  getMembers,
  patchUsers,
} from "../controllers/comunity.js";

import express from "express";

const router = express.Router();

router.get("/", verifyToken, getAllComunity);

router.get("/:comId/members", verifyToken, getMembers);
router.get("/:comId", verifyToken, getComunity);
router.patch("/:id/:comId", verifyToken, patchUsers);

export default router;
