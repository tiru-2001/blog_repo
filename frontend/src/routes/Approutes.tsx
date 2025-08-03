import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Register,
  Login,
  Home,
  BlogDetail,
  CreateBlog,
  UserProfile,
  Parent,
  EditBlog,
} from "../pages";
import PublicRoute from "./PublicRoute";
import Private from "./PrivateRoute";

const Approutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<Parent />}>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route element={<Private />}>
              <Route path="/new/blog" element={<CreateBlog />} />
              <Route path="/edit/blog/:id" element={<EditBlog />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Approutes;
