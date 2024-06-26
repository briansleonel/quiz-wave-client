import { classNames } from "../../libs/classNames";

interface Props {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
}

export default function ButtonPrimary({
    type,
    children,
    className,
    onClick,
    title,
}: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={classNames(
                "uppercase font-light  p-2 rounded transition-all ease-in-out duration-500 text-white bg-blue-700 hover:bg-blue-600 drop-shadow",
                className ? className : ""
            )}
            title={title ? title : ""}
        >
            {children}
        </button>
    );
}
