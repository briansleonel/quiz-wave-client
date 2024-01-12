import { useEffect, useState } from "react";
import { Player } from "../../../types/quiz/player";
import { socket } from "../../../socket";
import { Slide } from "react-awesome-reveal";
import ButtonTrivia from "../../Button/ButtonTrivia";

export default function RankingModerator({
    rankingPlayers,
}: {
    rankingPlayers: Array<Player>;
}) {
    const duration = 1000;
    const damping = 0.7;

    const nextQuestion = () => {
        socket.emit("quiz:next-question");
    };

    return (
        <main className="flex flex-col w-full h-screen transition-all justify-between">
            <h2 className="bg-white p-8 text-center text-4xl font-bold">
                Marcador
            </h2>

            <div className="w-full flex justify-end p-4 pt-6 pr-6">
                <ButtonTrivia
                    className="!bg-neutral-100 text-neutral-800 hover:!bg-neutral-300 hover:!text-neutral-950 tracking-wide !font-bold !py-2 text-sm mx-0"
                    onClickFn={nextQuestion}
                >
                    Siguiente
                </ButtonTrivia>
            </div>

            <div className="w-full h-full  p-4 mx-auto lg:w-3/5 xl:w-2/5">
                <div className="flex flex-col justify-center gap-2 h-full relative overflow-hidden">
                    <Slide
                        cascade
                        damping={damping}
                        duration={duration}
                        className=""
                    >
                        {rankingPlayers.map((player, i) => (
                            <article
                                key={player.socketId}
                                className="bg-violet-700 text-white p-2 px-4 w-full rounded shadow-2xl text-2xl md:text-3xl font-semibold md:font-medium flex justify-between"
                            >
                                <p>
                                    {++i}
                                    <span className="pl-4">{player.name}</span>
                                </p>
                                <span>{player.score}</span>
                            </article>
                        ))}
                    </Slide>
                </div>
            </div>
        </main>
    );
}