interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function CardContainer({ children, className }: Props) {
    return (
        <article
            className={`relative w-full flex flex-col justify-between gap-2 bg-white rounded p-4 shadow-md min-h-[8rem] ${className}`}
        >
            {children}
        </article>
    );
}
