import prisma from "../prisma/db.js";

// 사용자 정보 얻기
export const getUserProfile = async (userId) => {
  const profile = await prisma.user.findFirst({ 
    where: { userId }, // 테스트용으로 고정된 ID
  });

  if (!profile) {
    const error = new Error("사용자를 찾을 수 없습니다.");
    throw error;
  }

  delete profile.password;

  return profile;
};
