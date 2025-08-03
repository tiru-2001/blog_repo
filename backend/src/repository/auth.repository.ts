import User from "../models/User";
import { IUser } from "../types";
/*************find user by email*********/
const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};
/*************save user *********/
const saveUser = async (data: Partial<IUser>) => {
  return await new User(data).save();
};
/*************find user by id and refreshtoken*********/
const findUserByIdAndRefreshToken = (userId: string, token: string) => {
  return User.findOne({ _id: userId, refreshToken: token });
};
/*************update refresh token*********/
const updateRefreshToken = async (
  userId: string,
  refreshToken: string | null
) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: { refreshToken: refreshToken } },
    { new: true }
  );
};
export default {
  findUserByEmail,
  saveUser,
  updateRefreshToken,
  findUserByIdAndRefreshToken,
};
