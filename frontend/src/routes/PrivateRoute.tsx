import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const Private = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
};

export default Private;
