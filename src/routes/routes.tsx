import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import SuspenseLoader from "../layouts/Auth/SuspenseLoader";
import HomeLayout from "../layouts/Auth/HomeLayout";
import Login from "../modules/auth/Login";
import ErrorPage from "../modules/auth/ErrorPage";
import { ProtectedLayout } from "../layouts/Auth/ProtectedLayout";

// eslint-disable-next-line
const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const PageHome = Loader(lazy(() => import('../modules/home/page')))

const routes: RouteObject[] = [
  {
    path: "*",
    element: <HomeLayout />,
    children: [
      { path: "", element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "",
    element: <ProtectedLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "home",
        element: <PageHome />,
      },
    ],
  },
  {
    path: "unauthorized",
    element: <ErrorPage />,
  },
];

export default routes;
