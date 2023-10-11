import { PersonFill } from "react-bootstrap-icons";
import { useLoginMutation } from "../../../hooks/users/useLogin";
import ButtonPrimary from "../../Button/ButtonPrimary";
import { toastInformation } from "../../Sonner/sonner.toast";
import { useFormInput } from "../../../hooks/users/inputs/useFormInput";
import { InputUnderline } from "../Input/InputUnderline";

export default function LoginForm() {
    const inputUsername = useFormInput("");
    const inputPassword = useFormInput("");

    const loginMutation = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            inputUsername.inputProps.value !== "" &&
            inputPassword.inputProps.value !== ""
        ) {
            await loginMutation.mutateAsync({
                username: inputUsername.inputProps.value,
                password: inputPassword.inputProps.value,
            });
        } else {
            toastInformation("Debe ingresar sus credenciales");
        }
    };

    return (
        <form
            method="POST"
            onSubmit={handleSubmit}
            className="max-w-sm p-8 bg-zinc-900 text-white rounded-md flex flex-col relative shadow-md drop-shadow-xl"
        >
            <div className="w-28 h-28 rounded-full bg-neutral-950 absolute -top-14 left-1/3 flex justify-center items-center ">
                <PersonFill size="80%" />
            </div>
            <InputUnderline
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                className="mt-8"
                inputProps={inputUsername.inputProps}
            />

            <InputUnderline
                name="password"
                type="password"
                placeholder="Contraseña"
                className="mt-6"
                inputProps={inputPassword.inputProps}
            />

            <ButtonPrimary className="mt-6">Ingresar</ButtonPrimary>
        </form>
    );
}
