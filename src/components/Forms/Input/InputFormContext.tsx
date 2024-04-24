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
            className={`w-full px-2 py-1 transition-colors ease-in-out duration-500 outline-none rounded text-lg text-gray-950 border border-gray-400 bg-zinc-100 focus:border-violet-900 ${
                className ? className : ""
            }`}
            {...register(name, {
                required: true,
            })}
            autoComplete="off"
        />
    );
}
