import prisma from '../prisma/db.js';

export const addMatching = async (data) => {
  const { title, categoryId, place, description, status, authorId, assistedUserId } = data;

  const matching = await prisma.matching.create({
    data: {
      title,
      categoryId,
      place,
      description,
      status,
      authorId,
      assistedUserId,
    },
  });

  return matching;
};
