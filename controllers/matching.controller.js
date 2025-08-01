import { StatusCodes } from 'http-status-codes';

import {
  addMatching,
  deleteMatching,
  getMatchingDetail,
  getRelatedDisabledList,
  listMatching,
  modifyMatching,
  modifyStatus,
} from '../services/matching.service.js';
import { InvalidInputError } from '../utils/errors/errors.js';

export const getRelatedDisabledListController = async (req, res, next) => {
  /*
    1. 로그인 된 사용자의 id를 disabled_profile / assistant_id에서 조회
    2. 해당 정보를 기반으로 찾은 user_id를 기반으로 user & disabled_profile & disabled_type join 후 disabled_user_id 조회
    3. 필요 항목
    1. birthdate 토대 나이 계산
    2. residence_area
    3. disabled_type_id와 disability_level, description 조회
  */
  try {
    const authorId = req?.user?.userId;
    if (!authorId) {
      throw new InvalidInputError('userId가 올바르지 않습니다.');
    }

    const relatedDisabledList = await getRelatedDisabledList(authorId);

    if (!relatedDisabledList || relatedDisabledList.length === 0) {
      throw new InvalidInputError('연결된 장애인 프로필을 찾을 수 없습니다.');
    }

    return res.success({
      relatedDisabledList,
    });
  } catch (error) {
    next(error);
  }
};

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
    let categoryId = req.query?.category;
    if (categoryId) {
      categoryId = parseInt(categoryId, 10);
    }

    const list = await listMatching(categoryId);

    return res.status(StatusCodes.OK).success(list);
  } catch (error) {
    next(error);
  }
};

export const handleGetMatchingDetail = async (req, res, next) => {
  try {
    const matchingId = Number(req.params.matchingId);

    const detail = await getMatchingDetail(matchingId);

    res.status(StatusCodes.OK).success(detail);
  } catch (error) {
    next(error);
  }
};

// 도움 요청 삭제
export const handleDeleteMatching = async (req, res, next) => {
  try {
    const authorId = req?.user?.userId;

    if (!authorId) {
      throw new InvalidInputError('userId가 올바르지 않습니다.');
    }

    const matchingId = parseInt(req.params.matchingId, 10);

    console.log(matchingId);

    const matching = await deleteMatching(matchingId);

    return res.status(StatusCodes.OK).success(matching);
  } catch (error) {
    next(error);
  }
};

// 도움 요청 상태 수정
export const handleModifyStatus = async (req, res, next) => {
  try {
    const authorId = req?.user?.userId;

    if (!authorId) {
      throw new InvalidInputError('userId가 올바르지 않습니다.');
    }

    const status = req.body.status;
    const matchingId = parseInt(req.params.matchingId, 10);
    const matching = await modifyStatus(matchingId, status);

    return res.status(StatusCodes.OK).success(matching);
  } catch (error) {
    next(error);
  }
};

// 도움 요청 수정
export const handleModifyMatching = async (req, res, next) => {
  try {
    const authorId = req?.user?.userId;

    if (!authorId) {
      throw new InvalidInputError('userId가 올바르지 않습니다.');
    }

    const { title, categoryId, description, place } = req.body;
    const matchingId = parseInt(req.params.matchingId, 10);
    const data = {
      matchingId,
      title,
      categoryId,
      description,
      place,
    };

    const matching = await modifyMatching(data);

    return res.status(StatusCodes.OK).success(matching);
  } catch (error) {
    next(error);
  }
};
