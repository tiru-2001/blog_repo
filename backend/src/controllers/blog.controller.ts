import { NextFunction, Request, Response } from "express";
import blogService from "../service/blog.service";
import { AuthRequest } from "../types/express/index";

/*************create blog*********/
const createBlog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.userId;
    const newBlog = await blogService.createBlog({
      title,
      description,
      user: userId,
    });
    return res.status(201).send({
      message: "blog created",
      success: true,
      newBlog,
    });
  } catch (err) {
    next(err);
  }
};
/*************get all blogs*********/
const getAllBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogs = await blogService.getAllBlogs();
    return res.status(200).send({
      success: true,
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (err) {
    next(err);
  }
};
/*************update blog by id*********/
const updateBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const updatedBlog = await blogService.updateBlog(req.body, id);
    return res.status(200).send({
      message: "Updated blog",
      success: true,
      updatedBlog,
    });
  } catch (err) {
    next(err);
  }
};
/*************get blog by id*********/
const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    return res.status(200).send({
      message: "Blog found",
      success: true,
      blog,
    });
  } catch (err) {
    next(err);
  }
};
/*************delete blog by id *********/
const deleteBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;
    const deletedBlog = await blogService.deleteBlogById(id);
    return res.status(200).send({
      message: "Blog deleted",
      success: true,
      deletedBlog,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllBlogs,
  createBlog,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};
