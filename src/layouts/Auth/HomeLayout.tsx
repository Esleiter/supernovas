import { Outlet, Navigate } from "react-router-dom";
// import { useAppSelector } from "../../store/useRedux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const HomeLayout = () => {
  const [user] = useAuthState(auth);
  if (user) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

export default HomeLayout;
