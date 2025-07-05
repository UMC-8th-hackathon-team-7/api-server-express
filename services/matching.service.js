import prisma from '../prisma/db.js';
import { NotExistsError } from "../utils/errors/errors.js";

export const addMatching = async (data) => {
  const { title, categoryId, place, description, status, authorId, assistedUserId } = data;
  const matching = await prisma.matching.create({
    data: {
      title,
      categoryId,
      place,
      description,
      status: 'pending',
      authorId,
      assistedUserId,
    },
  });

  return matching;
};

export const listMatching = async (categoryId) => {
  const list = await prisma.matching.findMany({
    where: { categoryId: categoryId },
    select: {
      title: true,
      place: true,
      createdAt: true,
      matchingCategory: {
        select: {
          categoryId: true,
          name: true,
        },
      },
    },
  });

  return list;
};

function getAge(birthdate) {
  const today = new Date();
  const birth = new Date(birthdate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export const getMatchingDetail = async (matchingId) => {
  const matchingDetail = await prisma.matching.findUnique({
    where: { matchingId },
    include: {
      matchingCategory: true, // 분류
      userMatchingAuthorIdToUser: true, // 보호자 프로필
      userMatchingAssistedUserIdToUser: {
        include: {
          disabledProfileDisabledProfileUserIdToUser: {
            include: {
              disabledType: true, // 장애 부위
            },
          },
        },
      },
    },
  });

  if (!matchingDetail) {
    throw new NotExistsError("해당 글을 찾을 수 없습니다.");
  }

  const author = matchingDetail.userMatchingAuthorIdToUser;
  const assistedUser = matchingDetail.userMatchingAssistedUserIdToUser;

  // 보호자 정보 구성
  const protectorProfile = {
    name: author.name,
    age: getAge(author.birthdate),
    residenceArea: author.residenceArea,
    totalHelpTime: 0, 
  };

  // 장애인 정보 구성
  const disabledProfile = assistedUser.disabledProfileDisabledProfileUserIdToUser;

  const assistedUserProfile = {
    name: assistedUser.name,
    age: getAge(assistedUser.birthdate),
    residenceArea: assistedUser.residenceArea,
    disabilityLevel: disabledProfile?.disabilityLevel,
    disabilityType: disabledProfile?.disabledType?.name,
    description: disabledProfile?.description,
  };

  return {
    title: matchingDetail.title,
    description: matchingDetail.description,
    place: matchingDetail.place,
    createdAt: matchingDetail.createdAt,
    category: matchingDetail.matchingCategory.name,
    protector: protectorProfile,
    assistedUser: assistedUserProfile,
  };
};
