import { BoxArrowRight } from "react-bootstrap-icons";
import { useAppSelector } from "../../store/hooks.redux";
import ButtonPrimary from "../Button/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/users/useLogout";

export default function GroupButtonsNavbar() {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const { handlerLogout } = useLogout();

    const navigate = useNavigate();

    const goToRegister = () => {
        navigate("/register");
    };

    const goToLogin = () => {
        navigate("/login");
    };
    return (
        <>
            {!isAuthenticated && (
                <>
                    <ButtonPrimary
                        className="text-sm font-light uppercase bg-stone-950 border border-white hover:bg-white hover:text-black px-4"
                        onClick={() => goToLogin()}
                    >
                        Ingresar
                    </ButtonPrimary>

                    <ButtonPrimary
                        className="text-sm font-light uppercase bg-indigo-800 hover:bg-indigo-700 hover:text-white px-4"
                        onClick={() => goToRegister()}
                    >
                        Crear Cuenta
                    </ButtonPrimary>
                </>
            )}
            {isAuthenticated && (
                <ButtonPrimary
                    className="bg-red-600 hover:bg-red-500 text-sm font-light uppercase flex items-center justify-center gap-2 px-4"
                    onClick={() => handlerLogout()}
                >
                    <BoxArrowRight />
                    <span>Salir</span>
                </ButtonPrimary>
            )}
        </>
    );
}
