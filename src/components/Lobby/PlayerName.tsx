import { Player } from "../../types/quiz/player";

interface Props {
    player: Player;
}

export default function PlayerName({ player }: Props) {
    return (
        <span
            key={player.socketId}
            className="w-full md:w-auto flex items-center justify-center rounded-sm bg-emerald-600 text-neutral-50 p-4 px-8 text-center text-3xl font-semibold shadow-2xl"
        >
            {player.name}
        </span>
    );
}
