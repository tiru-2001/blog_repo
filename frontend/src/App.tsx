import { useDispatch, useSelector } from "react-redux";
import Approutes from "./routes/Approutes";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { checkUserLoginStatus } from "./features/auth/authThunk";
import type { AppDispatch, RootState } from "./app/store";
const App = () => {
  const { sessionStatus } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserLoginStatus());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      {sessionStatus === "checking" ? <h1>Loading...</h1> : <Approutes />}
    </>
  );
};

export default App;
