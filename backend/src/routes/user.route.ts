import express from "express";
import userController from "../controllers/user.controller";
import verifyUser from "../middlewares/authmiddleware";
const router = express.Router();
router.get("/me", verifyUser, userController.findUserAndBlogs);
export default router;
