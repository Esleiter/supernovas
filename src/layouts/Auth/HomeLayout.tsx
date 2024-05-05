import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/useRedux";

const HomeLayout = () => {
  const { token } = useAppSelector((state) => state.auth);
  if (token) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};

export default HomeLayout;
