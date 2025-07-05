import prisma from '../prisma/db.js';
import { registerUserService } from '../services/auth.service.js';
import { createAccessToken } from '../utils/create.jwt.tokens.js';
import { InvalidInputError } from '../utils/errors/errors.js';

export const registerController = async (req, res, next) => {
  try {
    let { profileImage, phoneNumber, password, isDisabled, name, birthdate, residenceArea } =
      req.body;

    if (birthdate) {
      if (typeof birthdate === 'string') {
        const parsed = new Date(birthdate);
        if (isNaN(parsed.getTime())) {
          throw new InvalidInputError('유효하지 않은 생년월일 형식입니다.');
        }
        birthdate = parsed.toISOString();
      }
    }

    await registerUserService({
      profileImage,
      phoneNumber,
      password,
      isDisabled,
      name,
      birthdate,
      residenceArea,
    });

    return res.status(201).success({
      message: '회원가입이 완료되었습니다.',
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user || user.password !== password) {
      throw new InvalidInputError('전화번호 또는 비밀번호가 올바르지 않습니다.');
    }

    return res.success({
      message: '로그인에 성공하였습니다.',
      user,
      accessToken: createAccessToken({ userId: user.userId }),
    });
  } catch (error) {
    next(error);
  }
};
