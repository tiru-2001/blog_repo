import express from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import blogRouter from "./blog.route";
const router = express.Router();
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/blogs", blogRouter);
export default router;
