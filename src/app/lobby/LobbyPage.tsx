import { useLocation, useNavigate } from "react-router-dom";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import { useEffect, useState } from "react";
import { Player } from "../../types/quiz/player";
import RoomCode from "../../components/Lobby/RoomCode";
import LoaderRoom from "../../components/Lobby/LoaderRoom";
import { socket } from "../../socket";
import PlayerName from "../../components/Lobby/PlayerName";
import { toastInformation } from "../../components/Sonner/sonner.toast";
import {
    quizChangeStatus,
    quizDeletePlayer,
    quizJoinPlayer,
    quizSetCurrentQuestion,
    quizSetInitial,
    quizSetQuestions,
} from "../../store/features/quiz.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks.redux";
import Loader from "../../components/Loader/Loader";
import ButtonTrivia from "../../components/Button/ButtonTrivia";
import { ICollectionQuestion } from "../../types/question";

export default function LobbyPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { players, code: roomCode } = useAppSelector((state) => state.quiz);

    const collectionId = new URLSearchParams(location.search).get("collection");

    // Estado para verificar cuando esté cargando los necesario para el juego
    const [loading, setLoading] = useState<boolean>(true);

    const handleStartGame = () => {
        if (players.length > 0 && !loading) {
            navigate("/start");
            socket.emit("quiz:start");
            dispatch(quizChangeStatus("started"));
            dispatch(quizSetCurrentQuestion());
        }
    };

    useEffect(() => {
        function roomCreated(
            code: number,
            socketId: string,
            questions: Array<ICollectionQuestion>
        ) {
            dispatch(quizSetQuestions(questions));
            dispatch(quizSetInitial({ code, socketId })); // guardo el codigo y el oscket id en el estado de la aplicacion
            setLoading(false); // indico que ya no se está cargando
        }

        function joinPlayer(player: Player) {
            dispatch(quizJoinPlayer(player));
            toastInformation("Se ha unido " + player.name);
        }

        function playerDisconnected(player: Player) {
            dispatch(quizDeletePlayer(player.socketId));

            toastInformation(`Se ha desconectado un jugador`);
        }

        function roomError(message: string) {
            setLoading(false);
            toastInformation(message);
        }

        socket.on("room:created", roomCreated);
        socket.on("room:join-player", joinPlayer);
        socket.on("room:player-disconnected", playerDisconnected);
        socket.on("room:error", roomError);

        return () => {
            socket.off("room:created", roomCreated);
            socket.off("room:join-player", joinPlayer);
            socket.off("room:player-disconnected", playerDisconnected);
            socket.off("room:error", roomError);
        };
    });

    return (
        <BackgroundQuiz>
            {!loading && (
                <main className="w-full h-screen flex flex-col items-center justify-start gap-8 p-20 md:px-44">
                    {/** Mostrar el código de juego */}
                    {roomCode && <RoomCode code={roomCode} />}

                    {/** Mostrar los jugadores que van ingresando a la sala */}
                    {players.length > 0 && !loading && (
                        <>
                            <section className="w-full flex items-center justify-end">
                                <div>
                                    <ButtonTrivia
                                        className="!bg-neutral-100 text-neutral-800 hover:!bg-neutral-300 hover:!text-neutral-950 tracking-wide !font-bold !py-2"
                                        onClickFn={handleStartGame}
                                    >
                                        Empezar
                                    </ButtonTrivia>
                                </div>
                            </section>
                            <section className="w-full flex justify-center gap-8 flex-wrap">
                                {players.map((p) => (
                                    <PlayerName player={p} key={p.socketId} />
                                ))}
                            </section>
                        </>
                    )}

                    {/** Mostrar dialogo de espera de jugadores en la sala */}
                    {players.length == 0 && !loading && (
                        <LoaderRoom text="Esperando a los jugadores" />
                    )}
                </main>
            )}
            {loading && (
                <main className="w-full h-screen flex justify-center items-center flex-col">
                    <Loader />
                </main>
            )}
        </BackgroundQuiz>
    );
}
