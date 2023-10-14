import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks.redux";
import { useEffect } from "react";

export const ProtectedRouteLayout = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate("/login");
        }
    });

    return <Outlet />;
};
