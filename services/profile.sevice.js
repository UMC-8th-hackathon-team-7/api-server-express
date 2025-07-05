import prisma from "../prisma/db.js";
import { NotExistsError } from "../utils/errors/errors.js";

export const getUserProfile = async (userId) => {
  const profile = await prisma.user.findUnique({
    where: { userId : Number(userId) },
    include: {
      disabledProfileDisabledProfileUserIdToUser: {
        include: {
          disabledType: true,
        },
      },
    },
  });

  if (!profile) {
    throw new NotExistsError("사용자를 찾을 수 없습니다.");
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
      disabledTypeId: d.disabledTypeId,
      assistantId: d.assistantId,
    };
  }

  // 불필요한 내부 관계 제거
  delete profile.disabledProfileDisabledProfileUserIdToUser;

  return profile;
};

export const updateUser = async (userId, data) => {

  const user = await prisma.user.findUnique({ where: { userId } });
  if (!user) throw new NotExistsError("사용자를 찾을 수 없습니다.");

  const updatedUser = await prisma.user.update({
    where: { userId },
    data: {
      name: data.name,
      password: data.password,
      birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
      residenceArea: data.residenceArea,
      profileImage: data.profileImage,
    },
  });

  if (user.isDisabled && data.disabledInfo) {
    const disabledProfile = await prisma.disabledProfile.findUnique({ where: { userId } });
    if (disabledProfile) {
      await prisma.disabledProfile.update({
        where: { userId },
        data: {
          disabilityLevel: data.disabledInfo.disabilityLevel,
          description: data.disabledInfo.description,
          disabledTypeId: data.disabledInfo.disabledTypeId,
          assistantId: data.disabledInfo.assistantId,
        },
      });
    }
  }

  delete updatedUser.password;
  return updatedUser;
};
