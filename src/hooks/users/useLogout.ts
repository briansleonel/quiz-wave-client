import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../store/hooks.redux";
import { logout } from "../../store/features/authSlice";
import { toastError, toastSuccess } from "../../components/Sonner/sonner.toast";
import userService from "../../services/user.service";
import { deleteAuthLocalStorage } from "../../libs/state.localstorage";
import { useNavigate } from "react-router-dom";
import { deleteTokenLocalStorage } from "../../libs/token.localStorage";

/**
 * Hook personalizado que maneja el logout de un usuario en la aplicación.
 * Si todo salió bien, elimina los datos almacenados en local de un usuario.
 * En caso contrario se muestra una notificación del error sucedido.
 * @returns hook para realizar el loggeo de un usuario
 */
export function useLogoutMutation() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const logoutMutation = useMutation({
        mutationFn: userService.logout,
        onSuccess: (data) => {
            try {
                dispatch(logout()); // elimino los datos de la store
                deleteAuthLocalStorage(); // elimino los datos de localstorage
                deleteTokenLocalStorage(); // elimino datos del token en localsorage
                toastSuccess(data.message);
                navigate("/login"); // redirecciono a la página /dashboard
                //queryCache.clear();
                queryClient.clear();
            } catch (error) {
                if (error instanceof Error) toastError(error.message);
            }
        },
        onError: (err) => {
            if (err instanceof Error) toastError(err.message);
        },
    });

    return logoutMutation;
}

export function useLogout() {
    const logoutMutation = useLogoutMutation();

    async function handlerLogout() {
        await logoutMutation.mutateAsync();
    }

    return { handlerLogout };
}
