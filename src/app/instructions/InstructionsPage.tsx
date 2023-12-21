import LoaderRoom from "../../components/Lobby/LoaderRoom";
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
            <main className="w-full h-screen flex items-center justify-center">
                <section className="flex flex-col items-center gap-20 w-1/4 p-4  rounded-sm">
                    <h4 className="font-medium text-neutral-200 text-3xl text-center">
                        ¡Ya estás dentro del juego!
                    </h4>
                    <div className="w-full rounded py-4 px-6 transform skew-x-12 bg-white">
                        <div className="transform -skew-x-12">
                            <h3 className="text-3xl text-center text-neutral-800 font-bold">
                                {name}
                            </h3>
                        </div>
                    </div>

                    <LoaderRoom text="Esperando" />
                </section>
            </main>
        </BackgroundQuiz>
    );
}
