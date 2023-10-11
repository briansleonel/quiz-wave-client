import { useForm, FormProvider } from "react-hook-form";
import { useRegisterMutation } from "../../../hooks/users/useRegister";
import { SubTitle } from "../../Layout/TitleSubtitle";
import { toastInformation } from "../../Sonner/sonner.toast";
import { IUser } from "../../../types/user";
import InputFormContext from "../Input/InputFormContext";
import ButtonPrimary from "../../Button/ButtonPrimary";

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
        <FormProvider {...formMethods}>
            <form
                action=""
                onSubmit={handleSubmit}
                className="max-w-lg w-full "
            >
                <SubTitle className="mb-6">Crear cuenta</SubTitle>

                <div>
                    <label
                        htmlFor="firstName"
                        className="block text-start pb-1 w-full"
                    >
                        Nombre/s
                    </label>
                    <InputFormContext name="firstName" type="text" />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="lastName"
                        className="block text-start pb-1 w-full"
                    >
                        Apellido/s
                    </label>
                    <InputFormContext name="lastName" type="text" />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-start pb-1 w-full"
                    >
                        Correo electrónico
                    </label>
                    <InputFormContext name="email" type="email" />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="username"
                        className="block text-start pb-1 w-full"
                    >
                        Nombre de usuario
                    </label>
                    <InputFormContext name="username" type="text" />
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="block text-start pb-1 w-full"
                    >
                        Contraseña
                    </label>
                    <InputFormContext name="password" type="password" />
                </div>

                <ButtonPrimary className="mt-10 w-full shadow shadow-blue-950">
                    Registrarse
                </ButtonPrimary>
            </form>
        </FormProvider>
    );
}
