import { StatusCodes } from "http-status-codes";
import { getUserProfile, updateUser } from "../services/profile.sevice.js";

// �� ������
export const handleGetMyProfile = async (req, res, next) => {
    try{
        const userId = req?.user?.userId; 

        const profile = await getUserProfile(userId);

        res.status(StatusCodes.OK).success(profile);
    } catch(error) {
        next(error)
    }
    
};

// ��� ������
export const handleGetUserProfile = async (req, res, next) => {
    try {
        const userId = req.params.userId; // �� URL���� ���� ID �ޱ�
        const profile = await getUserProfile(userId);
        res.status(StatusCodes.OK).success(profile);
    } catch (error) {
        next(error);
    }
};

// �� ������ ����
export const handleUpdateMyProfile = async (req, res, next) => {
  try {
    const userId = req?.user?.userId;
    
    const updated = await updateUser(userId, req.body);
    res.status(StatusCodes.OK).success(updated);
  } catch (error) {
    next(error);
  }
};