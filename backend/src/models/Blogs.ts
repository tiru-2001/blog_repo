import mongoose, { Model } from "mongoose";
import { IBlog } from "../types";
const blogschema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> = mongoose.model<IBlog>("Blog", blogschema);
export default Blog;
