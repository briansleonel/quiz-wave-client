import { useLocation } from "react-router-dom";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import { useEffect, useState } from "react";
import { Player } from "../../types/quiz/player";

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
                <section className="flex w-fit rounded transform -skew-x-12 bg-indigo-600 shadow-md shadow-neutral-900 text-5xl">
                    <div className="rounded py-4 px-8  bg-indigo-800">
                        <div className="transform skew-x-12">
                            <h3 className="text-center text-white font-medium">
                                PIN
                            </h3>
                        </div>
                    </div>
                    <div className="w-full rounded py-4 px-16 bg-indigo-600 ">
                        <div className="transform skew-x-12 ">
                            <h3 className="transform text-center text-neutral-200 font-semibold tracking-wide">
                                123456
                            </h3>
                        </div>
                    </div>
                </section>

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

                <span className="font-medium text-neutral-200 text-4xl transform -skew-x-12">
                    Esperando jugadores...
                </span>
            </main>
        </BackgroundQuiz>
    );
}
