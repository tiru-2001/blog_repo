import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  fetchUserProfile,
  logoutUser,
  checkUserLoginStatus,
  registerUser,
} from "./authThunk";
import type { AuthState } from "../../types";
import { deleteBlog } from "../blog/blogThunk";

const initialState: AuthState = {
  user: null,
  userBlogs: [],
  loading: false,
  error: null,
  isUserRegistered: false,
  registeredError: null,
  loginError: null,
  sessionStatus: "idle",
  justLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearJustLoggedIn(state) {
      state.justLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserLoginStatus.pending, (state) => {
        state.sessionStatus = "checking";
      })
      .addCase(checkUserLoginStatus.fulfilled, (state, action) => {
        state.sessionStatus = "authenticated";
        state.user = action.payload;
      })
      .addCase(checkUserLoginStatus.rejected, (state, action) => {
        state.sessionStatus = "unauthenticated";
        state.error = action.error.message || "Check user failed";
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registeredError = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isUserRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registeredError = action.error.message || "Register failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.justLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.error.message || "Login failed";
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userData;
        state.userBlogs = action.payload.blogsData;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Profile fetch failed";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.userBlogs = state.userBlogs.filter(
          (b) => b._id !== action.payload
        );
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isUserRegistered = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Logout failed";
      });
  },
});
export const { clearJustLoggedIn } = authSlice.actions;
export default authSlice.reducer;
