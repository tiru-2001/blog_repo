import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
/***********check user login status*********/
const checkUserLoginStatus = createAsyncThunk("auth/status", async () => {
  const res = await api.get("/auth/status");
  return res.data.user;
});
/***********register user*********/
const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials: { email: string; password: string; name: string }) => {
    const res = await api.post("/auth/register", credentials);
    return res.data;
  }
);
/***********login  user*********/
const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    const { data } = await api.post("/auth/login", credentials);
    return data.user_data;
  }
);
/***********fetch  user Profile*********/
const fetchUserProfile = createAsyncThunk("user/fetchUserProfile", async () => {
  const { data } = await api.get("/user/me");
  return data.userAndBlogsData;
});
/***********logout user*********/
const logoutUser = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
});

export {
  checkUserLoginStatus,
  loginUser,
  fetchUserProfile,
  logoutUser,
  registerUser,
};
