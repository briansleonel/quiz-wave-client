import { HTMLInputTypeAttribute } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
}

export default function InputFormContext({
    name,
    type,
    placeholder,
    className,
}: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <input
            id={name}
            type={type}
            placeholder={placeholder}
            className={`w-full  transition-colors ease-in-out duration-500 outline-none border text-gray-900 border-gray-300 focus:border-violet-700 rounded-md px-2 py-1.5  shadow-sm ${
                className ? className : ""
            }`}
            {...register(name, {
                required: true,
            })}
            autoComplete="off"
        />
    );
}
