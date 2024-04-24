import Swal, { SweetAlertIcon } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Props {
    handler: () => void;
    icon?: SweetAlertIcon;
    title: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
}

export default function confirmAlert({
    handler,
    title,
    cancelButtonText,
    confirmButtonText,
    icon = "warning",
}: Props) {
    withReactContent(Swal)
        .fire({
            title,
            icon,
            showCancelButton: true,
            cancelButtonColor: "#525252",
            cancelButtonText: cancelButtonText ?? "Cancelar",
            confirmButtonText: confirmButtonText ?? "Confirmar",
            confirmButtonColor: "#2563eb",
            allowOutsideClick: false,
        })
        .then((result) => {
            if (result.isConfirmed) {
                handler();
            }
        });
}
