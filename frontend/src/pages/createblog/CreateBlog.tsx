import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { createBlog } from "../../features/blog/blogThunk";
import { toast } from "sonner";
import { Helmet } from "react-helmet";

const CreateBlog = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  /***********handle submig*********/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }
    try {
      setIsSubmitting(true);
      await dispatch(createBlog({ title, description: content })).unwrap();
      toast.success("Blog created successfully!", {
        position: "top-center",
        style: { color: "green" },
      });
      setTitle("");
      setContent("");
      navigate("/");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "Failed to create blog", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Write a Blog | BlogHub</title>
        <meta
          name="description"
          content="Create and publish your new blog on BlogHub."
        />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Create New Blog
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                type="submit"
                className="flex-1 bg-gray-900 text-white py-2 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
              >
                Publish
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
    </>
  );
};

export default CreateBlog;
