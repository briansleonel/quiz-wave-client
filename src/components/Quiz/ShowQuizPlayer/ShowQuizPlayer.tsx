import { useEffect, useState } from "react";
import { socket } from "../../../socket";

export default function ShowQuizPlayer() {
    const [countdown, setCountdown] = useState<number>();
    const [question, setQuestion] = useState<string>();

    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        socket.on("quiz:show-question", (question) => {
            setQuestion(question);
        });

        socket.on("quiz:countdown", (countdown) => {
            setCountdown(countdown);
        });

        return () => {
            socket.off("quiz:show-question");
        };
    });

    return (
        <main
            className={`flex flex-col w-full h-screen transition-all ${
                showOptions ? "justify-between" : "justify-center"
            }`}
        >
            {question ? (
                <>
                    <div
                        className={`bg-white  text-center font-medium transition-all  ${
                            showOptions ? "p-8 text-5xl" : " p-12 text-6xl"
                        }`}
                    >
                        {question}
                    </div>
                    {!showOptions && (
                        <div className="relative bg-indigo-600 w-24 h-24 rounded-full shadow-2xl">
                            <span className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
                                {countdown}
                            </span>
                        </div>
                    )}

                    {showOptions && (
                        <div className="relative bg-indigo-600 w-24 h-24 rounded-full shadow-2xl">
                            <span className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
                                {countdown}
                            </span>
                        </div>
                    )}
                </>
            ) : (
                "Cargando..."
            )}
        </main>
    );
}
