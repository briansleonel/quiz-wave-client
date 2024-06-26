import { HTMLInputTypeAttribute } from "react";
import { classNames } from "../../../libs/classNames";

interface Props {
    name: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    inputProps: {
        value: string;
        onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    };
}

export const Input = ({
    name,
    type,
    inputProps,
    className,
    placeholder,
}: Props) => {
    return (
        <input
            className={classNames(
                "w-full px-2 py-1 transition-colors ease-in-out duration-500 outline-none rounded-md text-gray-950 border border-gray-400 bg-neutral-50 focus:border-violet-900 drop-shadow",
                className ? className : ""
            )}
            type={type}
            name={name}
            id={name}
            placeholder={placeholder ?? ""}
            {...inputProps}
            autoComplete="off"
        />
    );
};
