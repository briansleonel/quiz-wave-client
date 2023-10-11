import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks.redux";
import { useMutation } from "@tanstack/react-query";
import userService from "../../services/user.service";
import { resetQuestionFilters } from "../../store/features/filters.question.slice";
import { saveStateAuthLocalStorage } from "../../libs/state.localstorage";
import { saveStateTokenLocalStorage } from "../../libs/token.localstorage";
import { login } from "../../store/features/authSlice";
import { toastError, toastSuccess } from "../../components/Sonner/sonner.toast";

/**
 * Hook personalizado que maneja el loggeo de un usuario en la aplicación.
 * Realiza una consulta a la api y de acuerdo a la respuesta toma ciertas acciones.
 * Si todo salió bien, se guardan los datos del usuario enviados de sde la api en el estado global de la aplicación y se redirecciona a la página principal del usuario.
 * En caso contrario se muetra ina notificación del error sucedido.
 * @returns hook para realizar el loggeo de un usuario
 */
export function useLoginMutation() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: userService.login,
        onSuccess: (data) => {
            try {
                dispatch(resetQuestionFilters()); // reseteo los filtros de búsqueda
                saveStateAuthLocalStorage(data.data);
                saveStateTokenLocalStorage(data.data.token);
                dispatch(login(data.data)); // guardo los datos de login en el estado global de la aplicación
                toastSuccess(data.message);
                navigate("/dashboard"); // redirecciono a la página /dashboard
            } catch (error) {
                if (error instanceof Error) toastError(error.message);
            }
        },
        onError: (err) => {
            if (err instanceof Error) toastError(err.message);
        },
    });

    return loginMutation;
}
