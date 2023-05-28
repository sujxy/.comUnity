import express from "express";
import {
  getUser,
  getUserBuddies,
  addRemoveBuddies,
} from "../controllers/user.js";

import { getUserComunity } from "../controllers/comunity.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/buddies", verifyToken, getUserBuddies);

//comunity interaction
router.get("/:id/communities", verifyToken, getUserComunity);

router.patch("/:id/:buddyId", verifyToken, addRemoveBuddies);

export default router;
