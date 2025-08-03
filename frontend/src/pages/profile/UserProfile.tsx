import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogCard from "../../components/ui/blogcard/BlogCard";
import { fetchUserProfile } from "../../features/auth/authThunk";
import type { AppDispatch, RootState } from "../../app/store";
import Loading from "../../components/ui/loading/Loading";
import { Helmet } from "react-helmet";
const UserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, userBlogs, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const authoredPosts = userBlogs || [];
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>My Profile | BlogHub</title>
        <meta
          name="description"
          content="View and update your BlogHub profile and blogs."
        />
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-6 mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Your Profile
              </h1>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Name:</span> {user?.name}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
              </div>
              <div className="mt-6 flex space-x-4">
                <Link
                  to="/"
                  className="bg-gray-200 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
                >
                  Back to Home
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your Posts
              </h2>
              {authoredPosts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {authoredPosts.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-sm">
                  You haven't authored any posts yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
