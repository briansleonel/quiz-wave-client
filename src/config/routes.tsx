import { RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "../app/HomePage";
import LoginPage from "../app/login/LoginPage";
import RegisterPage from "../app/register/RegisterPage";
import DashboardPage from "../app/dashboard/DashboardPage";
import LayoutMain from "../components/Layout/LayoutMain";

const routes: Array<RouteObject> = [
    {
        path: "/",
        element: <LayoutMain />,
        //errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
                index: true,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
