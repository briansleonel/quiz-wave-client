import { Player } from "../../types/quiz/player";

interface Props {
    player: Player;
}

export default function PlayerName({ player }: Props) {
    return (
        <span
            key={player.socketId}
            className="w-full flex items-center justify-center rounded-sm bg-white p-3 text-center text-2xl font-semibold"
        >
            {player.name}
        </span>
    );
}
