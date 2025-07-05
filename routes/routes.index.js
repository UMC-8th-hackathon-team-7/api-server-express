import { Router } from "express";
import testRouter from "./test.router.js"; // Importing the test router
import profileRouter from "./profile.router.js";

const routers = Router();

routers.all("/ping", (req, res) => res.status(200).send("Pong!"));

routers.use("/test", testRouter)
routers.use("/profile", profileRouter)

export default routers;