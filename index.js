// Written by Kyeoung Woon Park https://github.com/kyeoungwoon
// Template Repository: https://github.com/kyeoungwoon/nodejs-api-server-template
// npm 패키지 import
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

import { errorHandler, responseHandler } from './handlers/response.handlers.js';
// Router import , /routes/index.js에서 Router들을 1차적으로 모아서 export 합니다.
import routers from './routes/routes.index.js';
import { corsOptions } from './utils/options.js';

// Socket.io Router는 이 주석 아래에 import 해주시면 됩니다.
// ex) const exampleSocketRouter = require("./routes/example.socket.router"); // commonJS
// ex) import exampleSocketRouter from "./routes/example.socket.router"; // ES6
dotenv.config();

const PORT = process.env.SERVER_PORT;

// ** 중요 ** 미들웨어 순서를 변경할 때는 신경써서 작업해 주세요.
const app = express();

app.use(responseHandler);
app.use((req, res, next) => {
  req.transactionId = uuidv4(); // 고유한 트랜잭션 ID 생성
  next();
});

app.use(cookieParser());
app.use(cors(corsOptions));
// Preflight 요청 수동 처리 (필요한 경우)
// app.options("*", cors(corsOptions));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Router 연결
app.use('/', routers);

// 에러 핸들러는 최하단에 위치해야 하는 미들웨어입니다. 절대 순서를 변경하지 마세요.
app.use(errorHandler);

// http, https 사용하실 프로토콜에 맞추어 주석 해제하고 사용하시면 됩니다.
const server = http.createServer(app);

const serverStartMessage = `
#############################################
    🛡️  Server listening on port: ${PORT} 🛡️     
#############################################
`;

server.listen(PORT, '0.0.0.0', () => {
  console.log(serverStartMessage);
  console.log('Static files served from:', path.join(__dirname, 'uploads'));
});

// 상단에 socket.io import 주석을 해제하고 사용하시면 됩니다.

// const io = new Server(server, {
//   cors: corsOptions,
//   // CORS option은 HTTP 서버와 공유합니다.
//   // 따로 설정하시려면 다시 작성하시면 됩니다.
//   cookie: true,
// });

// 하단에 Socket.io Router를 추가하면 됩니다.
// ex)
// const exampleSocket = io.of("/example");
// exapmpleSocketRouter(exampleSocket);
