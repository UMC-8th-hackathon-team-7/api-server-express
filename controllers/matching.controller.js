import { StatusCodes } from 'http-status-codes';

import { addMatching } from '../services/matching.service.js';
import { InvalidInputError } from '../utils/errors/errors.js';

// 도움 요청 등록
export const handleAddMatching = async (req, res, next) => {
  try {
    const authorId = req?.user?.userId;

    if (!authorId) {
      throw new InvalidInputError('userId가 올바르지 않습니다.');
    }

    // 구조 분해 할당
    const { title, categoryId, place, status, description, assistedUserId } = req.body;

    if (typeof categoryId === 'undefined') {
      throw new InvalidInputError('categoryId가 전달되지 않았습니다.');
    }

    // Prisma로 넘길 데이터 준비
    const data = {
      title,
      categoryId,
      place,
      description,
      status,
      authorId,
      assistedUserId: assistedUserId || authorId,
    };

    const matching = await addMatching(data);

    return res.status(StatusCodes.OK).success(matching);
  } catch (error) {
    next(error);
  }
};
