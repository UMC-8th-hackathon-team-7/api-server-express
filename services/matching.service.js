import prisma from '../prisma/db.js';

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
