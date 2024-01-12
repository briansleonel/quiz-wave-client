import { useEffect, useState } from "react";
import useCountdown from "../countdown/useCountdown";
import { ICollectionQuestion } from "../../types/question";
import { socket } from "../../socket";
import { useAppSelector } from "../../store/hooks.redux";

/**
 * Hook personalizado que permite gestionar y proveer de estados necesarios para controlar el tiempo en el que se muestra una pregunta,
 * cuando se muestran las opciones, la pregunta que se está usando actualmente, mostrar la respuesta correcta al finalizar el contador, entre otras
 * @returns objeto de estados
 */
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

    const [showCorrect, setShowCorrect] = useState(false);

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
            setShowCorrect(true);
            socket.emit("quiz:show-ranking-player");
        }
    }, [countdownShowOptions]);

    return {
        countdownShowOptions,
        countdownShowQuestion,
        showOptions,
        question,
        setQuestion,
        showCorrect,
    };
}
