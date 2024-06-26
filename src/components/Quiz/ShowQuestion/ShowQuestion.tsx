interface Props {
    showOptions: boolean;
    question: string;
}

export default function ShowQuestion({ question, showOptions }: Props) {
    return (
        <div
            className={`bg-white  text-center font-medium transition-all  ${
                showOptions ? "p-4 py-5 text-3xl md:p-10 md:text-6xl" : "p-4 py-6 text-3xl md:p-12 md:text-7xl"
            }`}
        >
            {question}
        </div>
    );
}
