import { Router } from "express";
import { registerController } from "../controllers/auth.controller.js";

const router = Router();

router.get("/test", registerController);

export default router;