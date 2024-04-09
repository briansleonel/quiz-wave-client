import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.redux";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import gameService from "../../../services/game.service";
import {
    toastInformation,
    toastSuccess,
} from "../../../components/Sonner/sonner.toast";
import { gameNextQuestion, gameStart } from "../../../store/features/gameSlice";
import AlertDanger from "../../../components/Alerts/Alert";
import useModal from "../../../hooks/modal/useModal";
import ShowQuestion from "../../../components/Trivia/ShowQuestion";
import AnswerQuestion from "../../../components/Trivia/AnswerQuestion";
import ShowRandomOptions from "../../../components/Trivia/ShowRandomOptions";
import ContainerTrivia from "../../../components/Trivia/ContainerTrivia";

export default function StartTriviaPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { category, limit, currentQuestion } = useAppSelector(
        (state) => state.game
    );

    const [selectedAnswer, setSelectedAnswer] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const { data, error, isLoading } = useQuery({
        queryKey: ["game", category, limit],
        queryFn: () =>
            gameService.getQuestionsGame({ category: category._id, limit }),
    });

    const { closeModal, openModal } = useModal();

    /**
     * Se usa el hook en la primer carga del componente.
     * Se verifica que se tenga en la store los datos necesarios.
     */
    useEffect(() => {
        if (category._id === "") {
            toastInformation("Por favor seleccione los parámetros");
            return navigate("/game");
        }
    });

    /**
     * Se usa este hook para ver cuando se cargan los datos recibidos desde react-query
     * Inicia la store con la configuración para iniciar la trivia
     */
    useEffect(() => {
        if (data) {
            dispatch(gameStart({ questions: data }));
        }
    }, [data, dispatch]);

    /**
     * Evento producido al seleccionar una respuesta
     * @param selected respuesta seleccionada
     */
    const onSelectAnswer = (selected: string) => {
        if (!selectedAnswer) {
            // indico que el usuario ya ha seleccionado una respuesta en el estado
            setSelectedAnswer(true);
            // asigno la opción que se selecciono al estado
            setSelectedOption(selected);
            // Abro la ventana modal con la información
            openModal();
            // verifico si la respuesta seleccionada es correcta
        }
    };

    /**
     * Permite verificar si la opción seleccionada es correcta o no
     * @returns true si es correcta, false en caso contrario
     */
    const isCorrectOption = () => {
        if (currentQuestion) {
            const correct =
                currentQuestion.options[currentQuestion.correct].toLowerCase();
            if (correct === selectedOption.toLowerCase()) return true;
        }
        return false;
    };

    const nextQuestion = () => {
        closeModal();
        setSelectedOption("");
        dispatch(gameNextQuestion());
        setSelectedAnswer(false);
    };

    const finishQuiz = () => {
        toastSuccess("Juego terminado");
        navigate("/trivia");
    };

    return (
        <ContainerTrivia>
            <div className="w-full h-screen p-8 flex flex-col justify-between relative">
                {error && error instanceof Error ? (
                    <AlertDanger>{error.message}</AlertDanger>
                ) : isLoading ? (
                    <>Cargando preguntas</>
                ) : data && currentQuestion ? (
                    <>
                        <ShowQuestion question={currentQuestion.question} />
                        {selectedAnswer && (
                            <AnswerQuestion
                                nextQuestion={nextQuestion}
                                finishQuiz={finishQuiz}
                                question={{
                                    isCorrect: isCorrectOption(),
                                    correct:
                                        currentQuestion.options[
                                            currentQuestion.correct
                                        ],
                                    description: currentQuestion.description!,
                                }}
                            />
                        )}
                        <ShowRandomOptions
                            isCorrectOption={isCorrectOption}
                            selectedAnswer={selectedAnswer}
                            selectedOption={selectedOption}
                            onSelectAnswer={onSelectAnswer}
                        />
                    </>
                ) : null}
            </div>
        </ContainerTrivia>
    );
}
