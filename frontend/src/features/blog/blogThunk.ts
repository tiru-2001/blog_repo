import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { IBlog } from "../../types";
/***********fetch blogs*********/
const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const { data } = await api.get("/blogs");
  return data.blogs;
});
/***********fetch blogs by id*********/
const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id: string) => {
    const { data } = await api.get(`/blogs/${id}`);
    return data.blog;
  }
);
/***********create blog*********/
const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData: Partial<IBlog>) => {
    const { data } = await api.post("/blogs", blogData);
    return data.newBlog;
  }
);
/***********update blog*********/
const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, updateData }: { id: string; updateData: Partial<IBlog> }) => {
    const { data } = await api.put(`/blogs/${id}`, updateData);
    return data.updatedBlog;
  }
);
/***********delete blog*********/
const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id: string) => {
  await api.delete(`/blogs/${id}`);
  return id;
});

export { fetchBlogs, updateBlog, deleteBlog, fetchBlogById, createBlog };
