import prisma from '../prisma/db.js';
import { changeDateStringToISO, getUserByPhoneNumber, registerUserService } from '../services/auth.service.js';
import { createAccessToken } from '../utils/create.jwt.tokens.js';
import { InvalidInputError } from '../utils/errors/errors.js';

export const registerController = async (req, res, next) => {
  try {
    req.body.birthdate = changeDateStringToISO(req.body.birthdate);
    const { profileImage, phoneNumber, password, isDisabled, name, birthdate, residenceArea } =
      req.body;

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
    const user = await getUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw new InvalidInputError('전화번호 또는 비밀번호가 올바르지 않습니다.');
    }

    if (user.password !== password) { // 해커톤이라 그냥 평문 비교
      console.log(user);
      console.error('로그인 실패: 전화번호 또는 비밀번호가 올바르지 않습니다.', {
        phoneNumber,
        password,
        user_password: user.password
      });
      throw new InvalidInputError('전화번호 또는 비밀번호가 올바르지 않습니다.');
    }

    return res.success({
      message: '로그인에 성공하였습니다.',
      accessToken: createAccessToken({ userId: user.userId }),
      userId: user.userId,
    });
  } catch (error) {
    next(error);
  }
};
