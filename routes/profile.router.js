import { Router } from "express";
import { handleGetMyProfile, handleGetUserProfile, handleUpdateMyProfile } from "../controllers/profile.controller.js";
import { authenticateAccessToken } from "../middleware/authenticate.jwt.js";

const router = Router();

router.get("/me", authenticateAccessToken, handleGetMyProfile);
router.get("/:userId", handleGetUserProfile);
router.patch("/", authenticateAccessToken, handleUpdateMyProfile);

export default router;