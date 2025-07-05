import { StatusCodes } from "http-status-codes";
import { getUserProfile } from "../services/profile.sevice.js";

export const handleGetMyProfile = async (req, res, next) => {
    try{
        const userId = req?.user?.userId; 

        const profile = await getUserProfile(userId);

        res.status(StatusCodes.OK).success(profile);
    } catch(error) {
        next(error)
    }
    
};
