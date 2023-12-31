import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks.redux";
import { useMutation } from "@tanstack/react-query";
import userService from "../../services/user.service";
import { login } from "../../store/features/authSlice";
import { toastError, toastSuccess } from "../../components/Sonner/sonner.toast";

/**
 * Hook personalizado que maneja el registro de un nuevo usuario en la aplicación.
 * Realiza una consulta a la api y de acuerdo a la respuesta toma ciertas acciones.
 * Si todo salió bien, se guardan los datos del usuario enviados de de la api en el estado global de la aplicación y se redirecciona a la página principal del usuario.
 * En caso contrario se muetra ina notificación del error sucedido.
 * @returns hook para realizar el regsitro de un usuario y el loggeo
 */
export function useRegisterMutation() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: userService.register,
        onSuccess: (data) => {
            dispatch(login(data.data));
            toastSuccess(data.message);
            navigate("/dashboard");
        },
        onError: (err) => {
            if (err instanceof Error)
                err.message.startsWith("E11000")
                    ? toastError("Nombre de usuario no disponible")
                    : toastError(err.message);
        },
    });

    return registerMutation;
}
