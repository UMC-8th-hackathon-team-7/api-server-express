import prisma from '../prisma/db.js';

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
