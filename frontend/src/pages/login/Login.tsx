import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { loginUser } from "../../features/auth/authThunk";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { loginError, user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /***********handle submit*********/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }
    try {
      setIsSubmitting(true);
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user) {
      toast.success("Loggedin Succssfully", {
        position: "top-center",
        style: { color: "green" },
      });
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError, {
        position: "top-center",
        style: { color: "red" },
      });
    }
  }, [user, loginError, navigate]);

  return (
    <>
      <Helmet>
        <title>Login | BlogHub</title>
        <meta
          name="description"
          content="Sign in to your BlogHub account and manage your blogs."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-sm p-6 space-y-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Sign in to BlogHub
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 mt-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900 placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 mt-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900 placeholder-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            New to BlogHub?{" "}
            <Link
              to="/register"
              className="text-gray-900 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
