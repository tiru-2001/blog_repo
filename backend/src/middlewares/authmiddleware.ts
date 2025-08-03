import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwtservice";

const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token missing",
      });
    }
    const decode = verifyAccessToken(accessToken);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    (req as any).user = decode;

    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};

export default verifyUser;
