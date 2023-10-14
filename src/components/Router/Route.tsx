import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import DashboardPage from "../../app/dashboard/DashboardPage";
import CategoryPage from "../../app/dashboard/category/CategoryPage";
import QuestionPage from "../../app/dashboard/question/QuestionPage";
import QuestionIDPage from "../../app/dashboard/question/QuestionIDPage";
import UserPage from "../../app/dashboard/user/UserPage";
import AccountPage from "../../app/dashboard/account/AccountPage";
import LayoutMain from "../Layout/LayoutMain";
import HomePage from "../../app/HomePage";
import LoginPage from "../../app/login/LoginPage";
import RegisterPage from "../../app/register/RegisterPage";
import { ProtectedRouteLayout } from "./ProtectedRouteLayout";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<LayoutMain />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/dashboard" element={<ProtectedRouteLayout />}>
                    <Route path="" element={<DashboardPage />} />
                    <Route path="category" element={<CategoryPage />} />
                    <Route path="question" element={<QuestionPage />} />
                    <Route path="question/:id" element={<QuestionIDPage />} />
                    <Route path="user" element={<UserPage />} />
                    <Route path="account" element={<AccountPage />} />
                </Route>
            </Route>
        </>
    )
);
