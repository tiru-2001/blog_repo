import mongoose, { Model } from "mongoose";
import { IUser } from "../types";

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userschema);
export default User;
