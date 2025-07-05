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

    const { title, categoryId, place, status, description, assistedUserId } = req.body;

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
