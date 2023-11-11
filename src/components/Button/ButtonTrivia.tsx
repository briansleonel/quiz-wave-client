import { MouseEvent } from "react";
import { classNames } from "../../libs/classNames";

export default function ButtonTrivia({
    onClickFn,
    children,
    title,
    className,
}: {
    onClickFn: (e: MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
    //type: 'submit' | 'reset' | 'button' | undefined;
}) {
    return (
        <button
            className={classNames(
                "rounded bg-purple-600 text-neutral-50 hover:text-neutral-50 shadow shadow-neutral-800 transition-all duration-500 mx-auto px-4 py-2 font-medium text-lg uppercase",
                className ? className : ""
            )}
            onClick={onClickFn}
            title={title ?? ""}
        >
            {children}
        </button>
    );
}
