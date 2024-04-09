import LoaderRoom from "../../components/Lobby/LoaderRoom";
import PlayerInfo from "../../components/Quiz/PlayerInfo/PlayerInfo";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import { socket } from "../../socket";
import { useAppSelector } from "../../store/hooks.redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InstructionsPage() {
    const navigate = useNavigate();

    const { name, hasNext, currentQuestion } = useAppSelector(
        (state) => state.player
    );

    console.log(hasNext);
    console.log(currentQuestion);

    useEffect(() => {
        function quizStarted() {
            navigate("/game");
            //dispatch(playerSetCurrentQuestion({ hasNext, question }));
        }

        socket.on("quiz:started", quizStarted);

        return () => {
            socket.off("quiz:started", quizStarted);
        };
    });

    return (
        <BackgroundQuiz>
            <main className="w-full h-screen flex  items-center flex-col justify-between">
                <section className="w-full h-full flex flex-col items-center justify-center gap-10">
                    <h4 className="font-medium text-neutral-50 text-3xl md:text-4xl lg:text-5xl text-center">
                        ¡Ya estás dentro del juego!
                    </h4>

                    <h6 className="font-medium text-neutral-50 text-xl md:text-2xl lg:text-3xl text-center">¿Ves tu nombre en pantalla?</h6>
                </section>

                <PlayerInfo name={name} />
            </main>
        </BackgroundQuiz>
    );
}
