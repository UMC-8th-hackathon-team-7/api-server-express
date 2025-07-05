export const registerUserService = async (data) => {
  return await prisma.user.create({
    data
  })

}