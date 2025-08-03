import Blog from "../models/Blogs";
import User from "../models/User";

const findUserandBlogs = async (userId: string) => {
  const blogsData = await Blog.find({ user: userId }).populate({
    path: "user",
    select: "name email _id",
  });
  const userData = await User.findById(userId).select("name email _id");
  return { blogsData, userData };
};
export default { findUserandBlogs };
