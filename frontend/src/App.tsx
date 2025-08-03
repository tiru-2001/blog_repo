import { useDispatch, useSelector } from "react-redux";
import Approutes from "./routes/Approutes";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { checkUserLoginStatus } from "./features/auth/authThunk";
import type { AppDispatch, RootState } from "./app/store";
import Loading from "./components/ui/loading/Loading";
const App = () => {
  const { sessionStatus } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserLoginStatus());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      {sessionStatus === "checking" ? <Loading /> : <Approutes />}
    </>
  );
};

export default App;
