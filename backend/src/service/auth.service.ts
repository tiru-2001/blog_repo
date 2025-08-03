import User from "../models/User";
import authRepository from "../repository/auth.repository";
import { IUser } from "../types";
import { Apperror } from "../utils/apperror";
import { generateTokens, verifyRefreshToken } from "../utils/jwtservice";
import { comparePassword, hashPassword } from "../utils/passwordHash";
/*************register*********/
const register = async (data: Partial<IUser>) => {
  const { email, name, password } = data;
  if (!email || !name || !password) {
    throw new Apperror("Missing details", 400);
  }
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Apperror("User already exist", 409);
  }
  const hashedPassword = hashPassword(password);
  const userObj = {
    email,
    name,
    password: hashedPassword,
  };
  return await authRepository.saveUser(userObj);
};
/*************login*********/
const login = async (data: Partial<IUser>) => {
  const { email, password } = data;
  if (!email || !password) {
    throw new Apperror("Missing details", 400);
  }
  const existingUser = await authRepository.findUserByEmail(email);
  if (!existingUser) {
    throw new Apperror("User not found", 404);
  }
  const comapredPassword = comparePassword(password, existingUser.password);
  if (!comapredPassword) {
    throw new Apperror("Invalid credentials", 401);
  }
  const { accessToken, refreshToken } = generateTokens({
    userId: existingUser._id.toString(),
    email: existingUser.email,
  });
  await authRepository.updateRefreshToken(
    existingUser._id.toString(),
    refreshToken
  );
  return {
    accessToken,
    refreshToken,
    name: existingUser.name,
    email: existingUser.email,
    _id: existingUser._id,
  };
};
/*************check user login status*********/
const checkUserLoginStatus = async (email: string) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Apperror("User not found", 404);
  }
  return user;
};
/*************registe tokensr*********/
const refresh = async (refresh_token: string) => {
  if (!refresh_token) {
    throw new Apperror("Missing token", 401);
  }
  const payload: any = verifyRefreshToken(refresh_token);
  if (!payload) throw new Error("Invalid  token");
  const user = await authRepository.findUserByIdAndRefreshToken(
    payload.userId,
    refresh_token
  );
  if (!user) throw new Apperror("User not found or token mismatch", 400);
  const { accessToken, refreshToken } = generateTokens({
    userId: user._id.toString(),
    email: user.email,
  });
  await authRepository.updateRefreshToken(user._id.toString(), refreshToken);
  return { accessToken, refreshToken };
};
/*************logout*********/
const logout = async (email: string) => {
  if (!email) {
    throw new Apperror("Missing credentials", 400);
  }
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Apperror("User not found", 404);
  }
  const updatedData = await authRepository.updateRefreshToken(
    user._id.toString(),
    null
  );
  return updatedData;
};

export default { logout, register, login, checkUserLoginStatus, refresh };
