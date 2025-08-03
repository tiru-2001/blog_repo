import Blog from "../models/Blogs";
import blogRepository from "../repository/blog.repository";
import { IBlog } from "../types";
import { Apperror } from "../utils/apperror";
/*************get all blogs*********/
const getAllBlogs = async () => {
  return await blogRepository.getAllBlogs();
};
/*************create blog*********/
const createBlog = async (data: Partial<IBlog>) => {
  const { title, description, user } = data;
  if (!title || !description || !user) {
    throw new Apperror("Provide full blog details", 400);
  }
  const checkUserExist = await blogRepository.findUserById(user);
  if (!checkUserExist) {
    throw new Apperror("User not found", 404);
  }
  return await blogRepository.saveBlog({ title, description, user });
};
/*************update blog*********/
const updateBlog = async (data: Partial<IBlog>, blogId: string) => {
  if (!blogId) {
    throw new Apperror("Blog id not found", 400);
  }
  const checkBlogExist = await blogRepository.findBlogById(blogId);
  if (!checkBlogExist) {
    throw new Apperror("Blog not found", 404);
  }
  return await blogRepository.updateBlog(data, blogId);
};
/*************get blog by id*********/
const getBlogById = async (blogId: string) => {
  if (!blogId) {
    throw new Apperror("Blog id not found", 404);
  }
  const blogData = await blogRepository.findBlogById(blogId);
  if (!blogData) {
    throw new Apperror("Blog not found ", 404);
  }
  return blogData;
};
/*************delete blog by id*********/
const deleteBlogById = async (blogId: string) => {
  if (!blogId) {
    throw new Apperror("Blog id not found", 404);
  }
  return await blogRepository.deleteBlogById(blogId);
};

export default {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlogById,
};
