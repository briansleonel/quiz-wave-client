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
    const {
        countdown: countdownShowQuestion,
        resetTimer: resetTimerQuestion,
        startTimer: startTimerQuestion,
    } = useCountdown(10);

    const [showOptions, setShowOptions] = useState(false);

    const [question, setQuestion] = useState<ICollectionQuestion>(
        questions[currentQuestion]
    );

    const {
        countdown: countdownShowOptions,
        resetTimer: resetTimerOptions,
        startTimer: startTimerOptions,
        setCountdown,
    } = useCountdown(question.duration, false);

    const [showCorrect, setShowCorrect] = useState(false);

    function endCounter() {
        socket.emit("quiz:stop-countdown");
        setShowCorrect(true);
        socket.emit("quiz:show-ranking-player");
    }

    /**
     * Hook para comprobar cuando la cuenta regresiva para mostrar la pregunta llega a 0
     */
    useEffect(() => {
        if (countdownShowQuestion === 0) {
            setShowOptions(true);
            startTimerOptions(true);
            socket.emit("quiz:show-options");
        }
    }, [countdownShowQuestion, startTimerOptions]);

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
            endCounter();
        }
    }, [countdownShowOptions]);

    useEffect(() => {
        function allPlayersResponded() {
            setCountdown(0);
            endCounter();
        }

        socket.on("quiz:all-players-responded", allPlayersResponded);

        return () => {
            socket.off("quiz:all-players-responded", allPlayersResponded);
        };
    });

    useEffect(() => {
        setQuestion(questions[currentQuestion]);
    }, [currentQuestion, questions]);

    /**
     * Permite resetear los valores para l cuenta regresiva del moderador
     */
    function resetValues() {
        // resetear cuenta regresiva para mostrar la pregunta
        resetTimerQuestion();
        // iniciar la cuenta regresiva para mostrar la pregunta
        startTimerQuestion(true);
        // resetear la cuenta regesiva para mostrar las opciones
        resetTimerOptions(question.duration);
        // reestablecer los valores a default
        setShowCorrect(false);
        setShowOptions(false);
    }

    function nextQuestion() {
        setQuestion(questions[currentQuestion]);
    }

    return {
        countdownShowOptions,
        countdownShowQuestion,
        showOptions,
        question,
        setQuestion,
        showCorrect,
        resetValues,
        nextQuestion,
    };
}
