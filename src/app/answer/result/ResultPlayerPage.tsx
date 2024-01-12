import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { Player } from "../../../types/quiz/player";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.redux";
import { playerUpdateScore } from "../../../store/features/player.slice";
import BackgroundQuiz from "../../../components/Trivia/BackgroundQuiz";
import Loader from "../../../components/Loader/Loader";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import PlayerInfo from "../../../components/Quiz/PlayerInfo/PlayerInfo";

export default function ResultPlayerPage() {
    const [loading, setloading] = useState(true);
    const { score, socketId, name } = useAppSelector((state) => state.player);
    const [statusAnswer, setStatusAnswer] = useState<boolean>();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        function showRankingPlayer(player: Player) {
            dispatch(playerUpdateScore(player.score));
            setStatusAnswer(player.answers[player.answers.length - 1]);
            setloading(false);
        }

        function nextQuestionPlayer() {
            navigate("/game");
        }

        socket.on("quiz:ranking-player", showRankingPlayer);
        socket.on("quiz:next-question-player", nextQuestionPlayer);

        return () => {
            socket.off("quiz:ranking-player", showRankingPlayer);
            socket.off("quiz:next-question-player", nextQuestionPlayer);
        };
    });
    return (
        <BackgroundQuiz>
            <main
                className={`w-full h-screen flex  items-center flex-col ${
                    loading ? "justify-center" : "justify-between"
                }`}
            >
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
                            <div
                                className={`w-fit rounded py-4 px-20 transform -skew-x-12 bg-black/60 ${
                                    statusAnswer ? "" : ""
                                }`}
                            >
                                <div className="transform skew-x-12">
                                    <h3 className="uppercase text-2xl md:text-4xl font-medium text-center text-white tracking-widest md:tracking-wider">
                                        {statusAnswer
                                            ? "Correcto"
                                            : "Incorrecto"}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-1 bg-white rounded-full  border-2 border-neutral-800">
                                {statusAnswer ? (
                                    <CheckCircleFill className="text-green-600 w-16 h-16 md:w-20 md:h-20 rounded-full" />
                                ) : (
                                    <XCircleFill className="text-red-600 w-16 h-16 md:w-20 md:h-20" />
                                )}
                            </div>
                        </div>

                        <PlayerInfo name={name} score={score} />
                    </>
                )}
            </main>
        </BackgroundQuiz>
    );
}
