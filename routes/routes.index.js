import { Router } from "express";
import testRouter from "./test.router.js"; // Importing the test router

const routers = Router();

routers.all("/ping", (req, res) => res.status(200).send("Pong!"));

routers.use("/test", testRouter)

export default routers;