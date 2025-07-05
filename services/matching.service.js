import prisma from '../prisma/db.js';
import { NotExistsError } from "../utils/errors/errors.js";

export const getRelatedDisabledList = async (userId) => {
  /*
1. 로그인 된 사용자의 id를 disabled_profile / assistant_id에서 조회
2. 해당 정보를 기반으로 찾은 user_id를 기반으로 user & disabled_profile & disabled_type join 후 disabled_user_id 조회
3. 필요 항목
1. birthdate 토대 나이 계산
2. residence_area
3. disabled_type_id와 disability_level, description 조회
*/
  const disabledList = await prisma.disabledProfile.findMany({
    where: {
      assistantId: userId,
    },
  });

  console.log('disabledList', disabledList);

  const calculateAge = (birthdate) => {
    if (!birthdate) return null;
    const birthDateObj = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  let ret = [];
  for await (const disabled of disabledList) {
    // forEach 대신 for...of 루프를 사용해야 await가 정상 동작합니다.
    const user = await prisma.user.findUnique({
      where: {
        userId: disabled.userId,
      },
      include: {
        disabledProfileDisabledProfileUserIdToUser: {
          include: {
            disabledType: true,
          },
        },
      },
    });

    if (user) {
      ret.push({
        userId: user.userId,
        name: user.name,
        age: calculateAge(user.birthdate),
        residenceArea: user.residenceArea,
        disabledTypeId:
          user.disabledProfileDisabledProfileUserIdToUser?.disabledType?.disabledTypeId,
        disabilityLevel: user.disabledProfileDisabledProfileUserIdToUser?.disabilityLevel,
        description: user.disabledProfileDisabledProfileUserIdToUser?.description,
      });
    }
  }

  return ret;
};

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
}

export const deleteMatching = async (matchingId) => {
  const matching = await prisma.matching.delete({
    where: { matchingId: matchingId },
  });

  return matching;
};

export const modifyStatus = async (matchingId, status) => {
  const matching = await prisma.matching.update({
    where: { matchingId: matchingId },
    data: {
      status: status,
      updatedAt: new Date(),
    },
  });

  return matching;
};
