import Blog from "../models/Blogs";
import User from "../models/User";
import { IBlog } from "../types";
/*************get all blogs*********/
const getAllBlogs = async () => {
  return await Blog.find().sort({ createdAt: -1 }).populate({
    path: "user",
    select: "name email _id",
  });
};
/*************save blog*********/
const saveBlog = async (data: Partial<IBlog>) => {
  return (await new Blog(data).save()).populate({
    path: "user",
    select: "name email _id",
  });
};
/*************find user by id*********/
const findUserById = async (userId: string) => {
  return await User.findById(userId);
};
/*************update blog*********/
const updateBlog = async (data: Partial<IBlog>, blogId: string) => {
  return await Blog.findByIdAndUpdate(
    blogId,
    { $set: data },
    { new: true }
  ).populate({ path: "user", select: "name email _id" });
};
/*************find blog by id*********/
const findBlogById = async (blogId: string) => {
  return await Blog.findById(blogId).populate({
    path: "user",
    select: "name email _id",
  });
};
/*************delete blog by id*********/
const deleteBlogById = async (blogId: string) => {
  return await Blog.findByIdAndDelete(blogId);
};
export default {
  getAllBlogs,
  saveBlog,
  findUserById,
  updateBlog,
  findBlogById,
  deleteBlogById,
};
