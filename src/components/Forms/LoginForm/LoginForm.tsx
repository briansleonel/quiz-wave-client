import { PersonFill } from "react-bootstrap-icons";
import { useLoginMutation } from "../../../hooks/users/useLogin";
import ButtonPrimary from "../../Button/ButtonPrimary";
import { toastInformation } from "../../Sonner/sonner.toast";
import { useForm, FormProvider } from "react-hook-form";
import InputFormContext from "../Input/InputFormContext";
import { useState } from "react";
import LoaderCircle from "../../Loader/LoaderCircle";
import { NavLink } from "react-router-dom";

interface Inputs {
    username: string;
    password: string;
}

export default function LoginForm() {
    const formMethods = useForm<Inputs>();

    const loginMutation = useLoginMutation();

    const [loading, setLoading] = useState(false);

    const handleSubmit = formMethods.handleSubmit(
        async (formData) => {
            if (!loading) {
                setLoading(true);
                await loginMutation.mutateAsync(formData).catch(() => {
                    setLoading(false);
                });
            }
        },
        (err) => {
            toastInformation("Ingrese sus credenciales");
        }
    );

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
                    ¡Hola de nuevo!
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <FormProvider {...formMethods}>
                    <form
                        method="POST"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nombre de usuario
                            </label>
                            <div className="mt-2">
                                <InputFormContext name="username" type="text" />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Contraseña
                            </label>
                            <div className="mt-2">
                                <InputFormContext
                                    name="password"
                                    type="password"
                                />
                            </div>
                        </div>

                        <ButtonPrimary
                            className={`w-full mt-6 flex justify-center gap-3 text-neutral-100 ${
                                !loading ? "" : "!bg-blue-500"
                            }`}
                        >
                            {loading ? <LoaderCircle /> : "Ingresar"}
                        </ButtonPrimary>
                    </form>
                </FormProvider>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-2 text-sm text-center mt-8 text-neutral-500">
                <span className="">
                    ¿No tienes una cuenta?
                </span>
                <NavLink to="/register" className="text-indigo-600">Crear cuenta</NavLink>
            </div>
        </>
    );
}
