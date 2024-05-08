import { useForm, FormProvider } from "react-hook-form";
import { useRegisterMutation } from "../../../hooks/users/useRegister";
import { SubTitle } from "../../Layout/TitleSubtitle";
import { toastInformation } from "../../Sonner/sonner.toast";
import { IUser } from "../../../types/user";
import InputFormContext from "../Input/InputFormContext";
import ButtonPrimary from "../../Button/ButtonPrimary";
import { NavLink } from "react-router-dom";

export default function RegisterForm() {
    const formMethods = useForm<IUser>();
    const registerMutation = useRegisterMutation();

    const handleSubmit = formMethods.handleSubmit(
        async (formData) => {
            console.log(formData);
            await registerMutation.mutateAsync(formData);
        },
        (err) => {
            toastInformation("Complete todos los campos");
        }
    );

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
                    Crear una cuenta
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <FormProvider {...formMethods}>
                    <form
                        action=""
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Nombre/s
                            </label>
                            <div className="mt-2">
                                <InputFormContext
                                    name="firstName"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Apellido/s
                            </label>
                            <div className="mt-2">
                                <InputFormContext name="lastName" type="text" />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Correo electrónico
                            </label>
                            <div className="mt-2">
                                <InputFormContext name="email" type="email" />
                            </div>
                        </div>

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

                        <ButtonPrimary className="mt-10 w-full shadow shadow-blue-950">
                            Registrarse
                        </ButtonPrimary>
                    </form>
                </FormProvider>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-2 text-sm text-center mt-8 text-neutral-500">
                <span className="">
                    ¿Ya tienes una cuenta?
                </span>
                <NavLink to="/login" className="text-indigo-600">Ingresar</NavLink>
            </div>
        </>
    );
}
