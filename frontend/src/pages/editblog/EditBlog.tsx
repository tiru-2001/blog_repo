import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { fetchBlogById, updateBlog } from "../../features/blog/blogThunk";
import { toast } from "sonner";
import Loading from "../../components/ui/loading/Loading";
import { Helmet } from "react-helmet";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { blogDetail, loading } = useSelector(
    (state: RootState) => state.blogs
  );
  /********** handle submit************/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        style: { color: "red" },
      });
      return;
    }
    if (!id) {
      toast.error("Id is missing", {
        position: "top-center",
        style: { color: "red" },
      });
      return;
    }
    try {
      setIsSubmitting(true);
      await dispatch(
        updateBlog({ id, updateData: { title, description: content } })
      ).unwrap();
      toast.success("Blog updated!", {
        position: "top-center",
        style: { color: "green" },
      });
      navigate("/");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Update failed", {
        position: "top-center",
        style: { color: "red" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (blogDetail) {
      setTitle(blogDetail.title);
      setContent(blogDetail.description);
    }
  }, [blogDetail]);

  return (
    <>
      <Helmet>
        <title>Edit Blog | BlogHub</title>
        <meta
          name="description"
          content="Edit your existing blog on BlogHub."
        />
      </Helmet>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Edit Blog
            </h2>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter blog title"
                  className="w-full px-3 py-2 mt-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900 placeholder-gray-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  rows={12}
                  placeholder="Write your blog content here..."
                  className="w-full px-3 py-2 mt-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900 placeholder-gray-400"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex space-x-4">
                <button
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  type="submit"
                  className="flex-1 bg-gray-900 text-white py-2 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
                >
                  Update
                </button>
                <Link
                  to="/"
                  className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 text-center transition duration-150"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBlog;
