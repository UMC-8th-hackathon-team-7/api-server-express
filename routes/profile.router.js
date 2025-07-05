import { Router } from "express";
import { handleGetMyProfile } from "../controllers/profile.controller.js";
import { authenticateAccessToken } from "../middleware/authenticate.jwt.js";

const router = Router();

router.get("/me", handleGetMyProfile);


export default router;