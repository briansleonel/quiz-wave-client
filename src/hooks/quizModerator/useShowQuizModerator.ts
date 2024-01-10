import { useEffect, useState } from "react";
import useCountdown from "../countdown/useCountdown";
import { ICollectionQuestion } from "../../types/question";
import { socket } from "../../socket";
import { useAppSelector } from "../../store/hooks.redux";

export default function useShowQuizModerator() {
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

    return {
        countdownShowOptions,
        countdownShowQuestion,
        showOptions,
        question,
        setQuestion,
    };
}
