import userRepository from "../repository/user.repository";

const findUserAndBlogs = async (userId: string) => {
  return await userRepository.findUserandBlogs(userId);
};
export default { findUserAndBlogs };
