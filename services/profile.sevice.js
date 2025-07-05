import prisma from "../prisma/db.js";

export const getMyProfile = async (userId) => {
  const profile = await prisma.user.findUnique({
    where: { userId },
    include: {
      disabledProfileDisabledProfileUserIdToUser: {
        include: {
          disabledType: true,
        },
      },
    },
  });

  if (!profile) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  // 비밀번호는 제거
  delete profile.password;

  // 장애인일 경우 정보 병합
  if (profile.isDisabled && profile.disabledProfileDisabledProfileUserIdToUser) {
    const d = profile.disabledProfileDisabledProfileUserIdToUser;
    profile.disability = {
      type: d.disabledType.name,
      level: d.disabilityLevel,
      description: d.description,
    };
  }

  // 불필요한 내부 관계 제거
  delete profile.disabledProfileDisabledProfileUserIdToUser;

  return profile;
};
