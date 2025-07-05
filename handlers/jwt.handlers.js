import jwt from "jsonwebtoken";
import config from "./config.js";
import logger from "../logger/console.js";

const { JWT_SECRET } = config.SERVER;

export const parseBearerFromHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.token = token;
    console.info(`Parsed token: ${token}`);
  }
  next();
};

export const decodeToken = (req, res, next) => {
  const token = req.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      console.info(`Decoded token: ${JSON.stringify(decoded, null, 2)}`);
    } catch (error) {
      console.error(`Token decoding error: ${error.message}`);
    }
  }
  next();
};
