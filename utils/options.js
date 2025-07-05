import dotenv from 'dotenv';

dotenv.config();

export const corsOptions = {
  // origin: process.env.SERVER.CORS.ORIGIN, // CORS domain 설정
  origin: '*', // CORS domain 설정
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'], // 허용할 HTTP 메서드
  // allowedHeaders: ["Content-Type", "Authorization"], // 허용할 헤더
  optionsSuccessStatus: 204, // Preflight 응답 상태 코드 (IE 호환성 이슈 방지)
};
