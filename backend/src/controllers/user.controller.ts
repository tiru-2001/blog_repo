import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express";
import { Apperror } from "../utils/apperror";
import userService from "../service/user.service";
/*************find user and blogs*********/
const findUserAndBlogs = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Apperror("User not found", 404);
    }
    const userAndBlogsData = await userService.findUserAndBlogs(userId);
    return res.status(200).send({
      message: "fetched data successfully",
      success: true,
      userAndBlogsData,
    });
  } catch (err) {
    next(err);
  }
};
export default { findUserAndBlogs };
