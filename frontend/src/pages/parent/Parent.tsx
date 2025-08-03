import { Outlet } from "react-router-dom";
import Navbar from "../../components/layout/navbar/Navbar";

const Parent = () => {
  return (
    <main className="min-h-screen flex flex-col ">
      <Navbar />
      <div className="flex-1 flex flex-col border-green-400">
        <Outlet />
      </div>
    </main>
  );
};

export default Parent;
