import prisma from '../prisma/db.js';
import { AlreadyExistsError } from '../utils/errors/errors.js';

export const registerUserService = async (nonDisabledData, disabledData = null) => {
  let userId;
  try {
    const user = await prisma.user.create({
      data: nonDisabledData,
    });
    userId = user.userId;
    if (nonDisabledData.isDisabled) {
      await prisma.disabledProfile.create({
        data: {
          ...disabledData,
          userId
        },
      });
    }
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    throw new AlreadyExistsError('회원가입에 실패하였습니다. 중복된 전화번호는 아닌지 확인해주세요.');
  }
};

export const changeDateStringToISO = (dateString) => {
  if (typeof dateString === 'string') {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('유효하지 않은 날짜 형식입니다.');
    }
    return parsedDate.toISOString();
  }
  return dateString;
};

export const getUserByPhoneNumber = async (phoneNumber) => {
  return await prisma.user.findUnique({
    where: { phoneNumber },
  });
};

export const getAllDisabledTypes = async () => {
  return await prisma.disabledType.findMany();
};

