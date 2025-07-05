import { StatusCodes } from 'http-status-codes';

import { addMatching, listMatching, getMatchingDetail } from '../services/matching.service.js';
import { InvalidInputError } from '../utils/errors/errors.js';

// 도움 요청 등록
export const handleAddMatching = async (req, res, next) => {
  try {
    const authorId = req?.user?.userId;

    if (!authorId) {
      throw new InvalidInputError('userId가 올바르지 않습니다.');
    }

    const { title, categoryId, place, description, assistedUserId } = req.body;

    const data = {
      title,
      categoryId,
      place,
      description,
      authorId,
      assistedUserId: assistedUserId || authorId,
    };

    const matching = await addMatching(data);

    return res.status(StatusCodes.OK).success(matching);
  } catch (error) {
    next(error);
  }
};

// 도움 전체 보기
export const handlelistMatching = async (req, res, next) => {
  try {
    const authorId = req?.user?.userId;

    if (!authorId) {
      throw new InvalidInputError('userId가 올바르지 않습니다.');
    }

    const categoryId = parseInt(req.query.category, 10);

    const list = await listMatching(categoryId);

    return res.status(StatusCodes.OK).success(list);
  } catch (error) {
    next(error);
  }
};

export const handleGetMatchingDetail = async (req, res, next) => {
    try{
        const matchingId = Number(req.params.matchingId)

        const Detail= await getMatchingDetail(matchingId);

        res.status(StatusCodes.OK).success(Detail);
    } catch(error) {
        next(error)
    }
    
};