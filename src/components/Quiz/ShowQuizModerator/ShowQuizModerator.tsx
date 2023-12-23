import { useEffect, useState } from "react";
import useCountdown from "../../../hooks/countdown/useCountdown";
import { useAppSelector } from "../../../store/hooks.redux";
import { ICollectionQuestion } from "../../../types/question";
import { optionsModel } from "../../OptionsModel/OptionsModel";
import { socket } from "../../../socket";

export default function ShowQuizModerator() {
    const { currentQuestion, questions, socketId } = useAppSelector(
        (state) => state.quiz
    );

    const { countdown: countdownShowQuestion } = useCountdown(10);

    const [showOptions, setShowOptions] = useState(false);

    const [question, setQuestion] = useState<ICollectionQuestion>(
        questions[currentQuestion]
    );

    const { countdown: countdownShowOptions, setStart } = useCountdown(
        question.duration,
        false
    );

    /**
     * Hook para comprobar cuando la cuenta regresiva para mostrar la pregunta llega a 0
     */
    useEffect(() => {
        if (countdownShowQuestion === 0) {
            setShowOptions(true);
            setStart(true);
            socket.emit("quiz:show-options");
        }
    }, [countdownShowQuestion, setStart]);

    /**
     * Hook para emitir la cuenta regresiva para mostrar la pregunta o las opciones
     */
    useEffect(() => {
        socket.emit(
            "quiz:countdown",
            showOptions ? countdownShowOptions : countdownShowQuestion
        );
    }, [countdownShowOptions, countdownShowQuestion, showOptions]);

    /**
     * Hook para comprobar cuando la cuenta regresiva para mostrar las opciones llega a 0
     */
    useEffect(() => {
        if (countdownShowOptions === 0) {
            socket.emit("quiz:stop-countdown");
        }
    }, [countdownShowOptions]);

    return (
        <main
            className={`flex flex-col w-full h-screen transition-all ${
                showOptions ? "justify-between" : "justify-center"
            }`}
        >
            <div
                className={`bg-white  text-center font-medium transition-all  ${
                    showOptions ? "p-8 text-5xl" : " p-12 text-6xl"
                }`}
            >
                {question.question}
            </div>
            {!showOptions && (
                <div className="relative bg-indigo-600 w-24 h-24 rounded-full shadow-2xl">
                    <span className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
                        {countdownShowQuestion}
                    </span>
                </div>
            )}

            {showOptions && (
                <div className="relative bg-indigo-600 w-24 h-24 rounded-full shadow-2xl">
                    <span className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
                        {countdownShowOptions}
                    </span>
                </div>
            )}

            {showOptions && (
                <div className="p-4 grid grid-cols-2 gap-4">
                    {question.options.map((o, i) => (
                        <div
                            key={i}
                            className={`text-white w-full p-8 font-medium text-base md:text-4xl rounded cursor-pointer transition-all duration-500 shadow shadow-neutral-900 text-center flex gap-6 items-center ${optionsModel[i].color}`}
                        >
                            {optionsModel[i].icon} <span className="">{o}</span>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
