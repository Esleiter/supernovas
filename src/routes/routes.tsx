import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import SuspenseLoader from "../layouts/Auth/SuspenseLoader";
import HomeLayout from "../layouts/Auth/HomeLayout";
import Login from "../modules/auth/Login";
import ErrorPage from "../modules/auth/ErrorPage";
import { ProtectedLayout } from "../layouts/Auth/ProtectedLayout";
import Layout from "../modules/home/page";

// eslint-disable-next-line
const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const PageHome = Loader(lazy(() => import("../modules/home/Home.tsx")));
const PageRelevant = Loader(lazy(() => import('../modules/relevant/page')))
const PageTools = Loader(lazy(() => import('../modules/tools/page')))
const PageConsultans = Loader(lazy(() => import('../modules/consultans/page')))

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
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Navigate to="/home" />,
          },
          {
            path: "home",
            element: <PageHome />,
          },
          {
            path: "relevant-data",
            element: <PageRelevant />,
          },
          {
            path: "tools",
            element: <PageTools />,
          },
          {
            path: "consultans",
            element: <PageConsultans />,
          },
        ],
      },
    ],
  },
  {
    path: "unauthorized",
    element: <ErrorPage />,
  },
];

export default routes;
