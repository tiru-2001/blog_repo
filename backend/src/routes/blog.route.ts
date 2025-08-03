import express from "express";
import blogController from "../controllers/blog.controller";
import verifyUser from "../middlewares/authmiddleware";
const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/", verifyUser, blogController.createBlog);
router.put("/:id", verifyUser, blogController.updateBlogById);
router.delete("/:id", verifyUser, blogController.deleteBlogById);
export default router;
