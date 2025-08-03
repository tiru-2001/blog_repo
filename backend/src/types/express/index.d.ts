import { Request } from "express";
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}
