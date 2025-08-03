import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBlogs,
  updateBlog,
  deleteBlog,
  fetchBlogById,
  createBlog,
} from "./blogThunk";
import type { BlogState } from "../../types";

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  blogDetail: null,
};
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetch blogs failed";
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blogDetail = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blog";
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Create blog failed";
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Update blog failed";
      })

      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Delete blog failed";
      });
  },
});

export default blogSlice.reducer;
