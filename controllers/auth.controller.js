import prisma from "../prisma/db.js";

export const registerController = async (req, res, next) => {
  const { profileImage, phoneNumber, password, isDisabled, name, birthddate, residenseArea } = req.body;
  await prisma.user.create({
    data: {
      profileImage,
      phoneNumber,
      password,
      isDisabled,
      name,
      birthddate,
      residenseArea
    }
  })

  return res.success({
    message: "회원가입이 완료되었습니다.",
  });
}