import prisma from '../prisma/db.js';
import { changeDateStringToISO, getAllDisabledTypes, getUserByPhoneNumber, registerUserService } from '../services/auth.service.js';
import { createAccessToken } from '../utils/create.jwt.tokens.js';
import { InvalidInputError } from '../utils/errors/errors.js';

export const registerController = async (req, res, next) => {
  try {
    req.body.birthdate = changeDateStringToISO(req.body.birthdate);
    const { profileImage, phoneNumber, password, isDisabled, name, birthdate, residenceArea } =
      req.body;

    if (isDisabled) {
      const { assistantId, disabledTypeId, disabilityLevel, description } = req.body;
      if (!disabledTypeId || !disabilityLevel) {
        throw new InvalidInputError('장애인 등록을 위해 필요한 정보를 모두 입력해주세요.');
      }
      await registerUserService({
        profileImage,
        phoneNumber,
        password,
        isDisabled,
        name,
        birthdate,
        residenceArea,
      }, {
        assistantId,
        disabledTypeId,
        disabilityLevel,
        description,
      });
    } else {
      await registerUserService({
        profileImage,
        phoneNumber,
        password,
        isDisabled,
        name,
        birthdate,
        residenceArea,
      });
    }


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

// disabled type를 받는 api
export const getDisabledTypesController = async (req, res, next) => {
  try {
    const disabledTypes = await getAllDisabledTypes();
    return res.success({
      disabledTypes,
    });
  } catch (error) {
    next(error);
  }
};

// phone number를 기준으로 userId 반환
export const getUserIdByPhoneNumberController = async (req, res, next) => {
  try {
    const { phoneNumber } = req.query;
    const user = await getUserByPhoneNumber(phoneNumber);

    if (!user) {
      throw new InvalidInputError('해당 전화번호로 등록된 사용자가 없습니다.');
    }

    return res.success({
      userId: user.userId,
    });
  } catch (error) {
    next(error);
  }
};