import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import authService from "../service/auth.service";
import { AuthRequest } from "../types/express";
import { Apperror } from "../utils/apperror";

/*************register*********/
const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const newUser = await authService.register(req.body);
    return res.status(201).send({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (err) {
    next(err);
  }
};
/**********login*****************/
const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { accessToken, refreshToken, name, email, _id } =
      await authService.login(req.body);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "Logged in",
      user_data: { name, email, _id },
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

/*************refresh tokens*********/
const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { refreshToken } = req.cookies;
    const { accessToken, refreshToken: newRefreshToken } =
      await authService.refresh(refreshToken);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Tokens refreshed", success: true });
  } catch (err) {
    next(err);
  }
};
/*************check user logged in or not *********/
const checkUserLoginStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.user?.email) {
      throw new Apperror("User not logged in ", 400);
    }
    const userData = await authService.checkUserLoginStatus(req.user?.email);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not logged in",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User logged in",
      user: userData,
    });
  } catch (err) {
    next(err);
  }
};
/*************logout*********/
const logout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const email = req.user?.email;
    if (!email) {
      throw new Apperror("User  not found", 404);
    }
    const logoutData = await authService.logout(email);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out", logoutData });
  } catch (err) {
    next(err);
  }
};

export default { logout, refresh, checkUserLoginStatus, login, register };
