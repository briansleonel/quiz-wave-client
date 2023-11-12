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
import CollectionPage from "../../app/dashboard/collection/CollectionPage";
import CollectionABMPage from "../../app/dashboard/collection/CollectionABMPage";
import TriviaPage from "../../app/trivia/TriviaPage";
import StartTriviaPage from "../../app/trivia/start/StartTriviaPage";
import JoinPage from "../../app/join/JoinPage";
import InstructionsPage from "../../app/instructions/InstructionsPage";
import LobbyPage from "../../app/lobby/LobbyPage";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<LayoutMain />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/join" element={<JoinPage />} />
                <Route path="/instructions" element={<InstructionsPage />} />
                <Route path="/lobby" element={<LobbyPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/trivia" element={<TriviaPage />} />
                <Route path="/trivia/start" element={<StartTriviaPage />} />

                <Route path="/dashboard" element={<ProtectedRouteLayout />}>
                    <Route path="" element={<DashboardPage />} />
                    <Route path="category" element={<CategoryPage />} />
                    <Route path="question" element={<QuestionPage />} />
                    <Route path="question/:id" element={<QuestionIDPage />} />
                    <Route path="user" element={<UserPage />} />
                    <Route path="account" element={<AccountPage />} />
                    <Route path="collection" element={<CollectionPage />} />
                    <Route
                        path="collection/:id"
                        element={<CollectionABMPage />}
                    />
                </Route>
            </Route>
        </>
    )
);
