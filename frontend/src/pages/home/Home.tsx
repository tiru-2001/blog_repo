import { Link } from "react-router-dom";
import BlogCard from "../../components/ui/blogcard/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchBlogs } from "../../features/blog/blogThunk";
import Loading from "../../components/ui/loading/Loading";
const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blogs
  );
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, blogs.length]);
  return (
    <>
      <Helmet>
        <title>Home | BlogHub</title>
        <meta
          name="description"
          content="Explore the latest blogs on BlogHub."
        />
      </Helmet>
      <div className="flex-1 bg-gray-50">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Latest Blogs
            </h1>
            <Link
              to="/new/blog"
              className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
            >
              Write a Blog
            </Link>
          </div>
          {loading && <Loading />}
          {error && <p className="text-red-500">{error}</p>}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
