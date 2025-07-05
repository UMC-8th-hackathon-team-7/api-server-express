import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const { JWT_SECRET } = process.env;

/**
 * Access Token을 생성합니다. Bearer를 붙여서 반환합니다.
 * 1시간의 유효기간을 가지고 있습니다.
 * @param {int} userId
 * @returns {string} - Bearer Token
 */
export const createAccessToken = ({ userId }) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1h',
  });
  // return `Bearer ${token}`;
  return `${token}`;
};

export const createTestToken = ({ userId }) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1y',
  });
  return `Bearer ${token}`;
};
