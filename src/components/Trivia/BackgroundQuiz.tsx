export default function BackgroundQuiz({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-backgroundQuiz bg-no-repeat bg-cover bg-fixed">
            {children}
        </div>
    );
}
