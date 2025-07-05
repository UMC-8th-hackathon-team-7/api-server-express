import { StatusCodes } from "http-status-codes";
import { getUserProfile, updateUser } from "../services/profile.sevice.js";

// 내 프로필
export const handleGetMyProfile = async (req, res, next) => {
    try{
        const userId = req?.user?.userId; 

        const profile = await getUserProfile(userId);

        res.status(StatusCodes.OK).success(profile);
    } catch(error) {
        next(error)
    }
    
};

// 상대 프로필
export const handleGetUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId; // ← URL에서 유저 ID 받기
        const profile = await getUserProfile(userId);
        res.status(StatusCodes.OK).success(profile);
    } catch (error) {
        next(error);
    }
};

// 내 프로필 수정
export const handleUpdateMyProfile = async (req, res, next) => {
  try {
    const userId = req?.user?.userId;
    
    const updated = await updateUser(userId, req.body);
    res.status(StatusCodes.OK).success(updated);
  } catch (error) {
    next(error);
  }
};