import { useLocation } from "react-router-dom";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import { useEffect, useState } from "react";
import { Player } from "../../types/quiz/player";
import RoomCode from "../../components/Lobby/RoomCode";
import LoaderRoom from "../../components/Lobby/LoaderRoom";

const playersMock: Array<Player> = [
    {
        socketId: "akjsdjkajks",
        name: "name1 largooooo asdasd",
        score: 0,
        answers: [],
    },
    { socketId: "asdasdasdas", name: "name2", score: 0, answers: [] },
    { socketId: "assxcsdfass", name: "name3", score: 0, answers: [] },
    { socketId: "asdqweasdaa", name: "name4", score: 0, answers: [] },
    { socketId: "fghftheffgdf", name: "name5", score: 0, answers: [] },
];

export default function LobbyPage() {
    const location = useLocation();
    const collectionId = new URLSearchParams(location.search).get("collection");

    // Estado para verificar cuando esté cargando los necesario para el juego
    const [loading, setLoading] = useState<boolean>(true);

    const [players, setPlayers] = useState<Array<Player>>(playersMock);

    useEffect(() => {});

    return (
        <BackgroundQuiz>
            <main className="w-full h-screen flex flex-col items-center justify-start gap-36 p-20 md:px-44">
                {/** Mostrar el código de juego */}
                <RoomCode code={123456} />

                {/** Mostrar los jugadores que van ingresando a la sala */}
                <section className="w-full grid grid-cols-5 gap-12">
                    {players.map((p) => (
                        <span
                            key={p.socketId}
                            className="w-full flex items-center justify-center rounded-sm bg-white p-3 text-center text-2xl font-semibold"
                        >
                            {p.name}
                        </span>
                    ))}
                </section>

                {/** Mostrar dialogo de espera de jugadores en la sala */}
                {players.length > 0 && !loading && (
                    <LoaderRoom text="Esperando jugadores" />
                )}
            </main>
        </BackgroundQuiz>
    );
}
