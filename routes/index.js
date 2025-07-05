import { Router } from "express";

const routers = Router();

routers.all("/ping", (req, res) => res.status(200).send("Pong!"));

export default routers;