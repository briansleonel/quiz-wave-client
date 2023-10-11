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

export const InputUnderline = ({
    name,
    type,
    inputProps,
    className,
    placeholder,
}: Props) => {
    return (
        <input
            className={classNames(
                "w-full px-2 py-1 transition-colors ease-in-out duration-500 outline-none border-b border-gray-500 bg-transparent focus:border-gray-300",
                className ? className : ""
            )}
            type={type}
            name={name}
            id={name}
            placeholder={placeholder ?? ""}
            {...inputProps}
        />
    );
};
