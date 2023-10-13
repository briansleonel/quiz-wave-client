import { RouteObject, createBrowserRouter } from "react-router-dom";
import HomePage from "../app/HomePage";
import LoginPage from "../app/login/LoginPage";
import RegisterPage from "../app/register/RegisterPage";
import DashboardPage from "../app/dashboard/DashboardPage";
import LayoutMain from "../components/Layout/LayoutMain";
import CategoryPage from "../app/dashboard/category/CategoryPage";
import QuestionPage from "../app/dashboard/question/QuestionPage";
import UserPage from "../app/dashboard/user/UserPage";
import AccountPage from "../app/dashboard/account/AccountPage";
import QuestionIDPage from "../app/dashboard/question/QuestionIDPage";

const routes: Array<RouteObject> = [
    {
        element: <LayoutMain />,
        //errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
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
                children: [
                    {
                        path: "category",
                        element: <CategoryPage />,
                    },
                    {
                        path: "question",
                        element: <QuestionPage />,
                    },
                    {
                        path: "question/:id",
                        element: <QuestionIDPage />,
                    },
                    {
                        path: "user",
                        element: <UserPage />,
                    },
                    {
                        path: "account",
                        element: <AccountPage />,
                    },
                ],
            },
        ],
    },
];

const router = createBrowserRouter(routes);

export default router;
