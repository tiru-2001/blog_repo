import { Document, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
interface IBlog extends Document {
  title: string;
  description: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export { IUser, IBlog };
