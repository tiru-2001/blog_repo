import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { deleteBlog, fetchBlogById } from "../../features/blog/blogThunk";
import Loading from "../../components/ui/loading/Loading";
import { Helmet } from "react-helmet";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { blogDetail: blog, loading } = useSelector(
    (state: RootState) => state.blogs
  );
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);
  /*********** handle delete*********/
  const handleDelete = async () => {
    if (!blog) return;
    await dispatch(deleteBlog(blog._id)).unwrap();
    navigate("/");
  };
  const isAuthor = blog?.user?._id === user?._id;
  return (
    <>
      <Helmet>
        <title>{blog?.title || "Blog Detail"} | BlogHub</title>
        <meta
          name="description"
          content={
            blog?.description.slice(0, 150) || "Read this blog on BlogHub."
          }
        />
      </Helmet>
      {loading ? (
        <Loading />
      ) : !blog ? (
        <div className="text-center py-12 text-red-500">Blog not found.</div>
      ) : (
        <div className="max-w-3xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-2">
            By {blog.user?.name || "Unknown"} • Created:{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          {blog.updatedAt && (
            <p className="text-sm text-gray-500 mb-6">
              Last Updated: {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          )}

          <div className="whitespace-pre-wrap mb-6">{blog.description}</div>

          {isAuthor && (
            <div className="flex space-x-4">
              <Link
                to={`/edit/blog/${blog._id}`}
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                <FiEdit2 className="mr-2" /> Edit
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                <FiTrash2 className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BlogDetail;
