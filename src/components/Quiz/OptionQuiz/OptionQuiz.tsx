interface Props {
    children?: React.ReactNode;
    icon: React.ReactElement;
    option: string;
    className?: string;
    onClick?: () => void;
}

export default function OptionQuiz({
    children,
    icon,
    option,
    className,
    onClick,
}: Props) {
    return (
        <div
            className={`text-white w-full p-4 md:p-8 font-medium text-base md:text-4xl rounded cursor-pointer transition-all duration-500 shadow shadow-neutral-900 text-center flex gap-4 md:gap-6 items-center justify-between ${className} `}
            onClick={onClick}
        >
            <p className="flex gap-4 md:gap-6 items-center">
                {icon} <span className="">{option}</span>
            </p>
            {children}
        </div>
    );
}
