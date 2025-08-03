import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../app/store";
import { logoutUser } from "../../../features/auth/authThunk";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logout successful", {
        position: "top-center",
        style: { color: "green" },
      });
      navigate("/");
    } catch (err) {
      const error = err as Error;
      toast.error(error.message, { position: "top-center" });
    }
  };

  return (
    <nav className="bg-white border-b shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BlogHub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {user && <span className="text-blue-700">Welcome! {user?.name}</span>}
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {user && (
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {user && <span className="text-blue-700">Welcome! {user?.name}</span>}
          <Link to="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {user && (
            <Link
              to="/profile"
              className="block text-gray-700 hover:text-blue-600"
            >
              Profile
            </Link>
          )}
          {!user ? (
            <>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-gray-700 hover:text-blue-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
