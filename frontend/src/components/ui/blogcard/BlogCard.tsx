import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { IBlog } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { deleteBlog } from "../../../features/blog/blogThunk";
import { toast } from "sonner";
const BlogCard = ({ blog }: { blog: IBlog }) => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthor = blog?.user._id === user?._id;
  const createdDate = new Date(blog.createdAt).toLocaleDateString();
  const updatedDate = new Date(blog.updatedAt).toLocaleDateString();
  /*********** handle Delete****************/
  const handleDelete = async () => {
    try {
      await dispatch(deleteBlog(blog._id)).unwrap();
      toast.success("deleted the blog  succssfully", {
        position: "top-center",
        style: { color: "green" },
      });
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-center",
        style: { color: "red" },
      });
    }
  };
  return (
    <div className="relative p-6 bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition duration-150 group">
      <Link to={`/blog/${blog._id}`} className="block">
        <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {blog.description.slice(0, 120)}...
        </p>
        <div className="flex flex-col text-sm text-gray-500 space-y-1">
          <span>Author: {blog.user?.name || "Unknown"}</span>
          <span>Created: {createdDate}</span>
          {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
            <span>Updated: {updatedDate}</span>
          )}
        </div>
      </Link>

      {isAuthor && (
        <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <Link
            to={`/edit/blog/${blog._id}`}
            className="text-yellow-600 hover:text-yellow-700"
            title="Edit Blog"
          >
            <FiEdit2 size={18} />
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700"
            title="Delete Blog"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
