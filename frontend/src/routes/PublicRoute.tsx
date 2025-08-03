import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../app/store";
import { useEffect } from "react";
import { clearJustLoggedIn } from "../features/auth/authSlice";

const PublicRoute = () => {
  const dispatch = useDispatch();
  const { user, justLoggedIn } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (justLoggedIn) {
      const timer = setTimeout(() => {
        dispatch(clearJustLoggedIn());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [justLoggedIn, dispatch]);

  if (user && !justLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
