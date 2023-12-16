export default function BackgroundQuiz({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[url('/room-1.png')] bg-no-repeat bg-cover bg-fixed">
            <div className="w-full min-h-screen flex justify-center items-center backdrop-brightness-50">
                {children}
            </div>
        </div>
    );
}
