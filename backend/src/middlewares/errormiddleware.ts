import { NextFunction, Request, Response } from "express";
import { Apperror } from "../utils/apperror";
export const errorHandler = (
  err: Apperror,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (err instanceof Apperror) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};

export default errorHandler;
