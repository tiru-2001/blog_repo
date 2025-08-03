import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store";
import { registerUser } from "../../features/auth/authThunk";
import { toast } from "sonner";
import { Helmet } from "react-helmet";

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const { registeredError, isUserRegistered } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /***********handle submit*********/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      setIsSubmitting(true);
      await dispatch(registerUser({ name, email, password })).unwrap();
    } catch (e) {
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    if (isUserRegistered) {
      toast.success("Registered Succssfully", {
        position: "top-center",
        style: { color: "green" },
      });
      navigate("/login");
    }
    if (registeredError) {
      toast.error(registeredError, {
        position: "top-center",
        style: { color: "red" },
      });
    }
  }, [registeredError, isUserRegistered, navigate]);
  return (
    <>
      <Helmet>
        <title>Register | BlogHub</title>
        <meta
          name="description"
          content="Create a new BlogHub account and start blogging."
        />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-sm p-6 space-y-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Register for BlogHub
          </h2>
          <form className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full name"
                className="w-full px-3 py-2 mt-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-900 placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-gray-900 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
