import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks.redux";
import { Player } from "../../types/quiz/player";
import { quizNextQuestion } from "../../store/features/quiz.slice";
import { socket } from "../../socket";

export default function useShowRankingModerator({
    resetValues,
}: {
    resetValues: () => void;
}) {
    const dispatch = useAppDispatch();

    const [showRanking, setShowRanking] = useState(false);
    const [rankingPlayers, setRankingPlayers] = useState<Array<Player>>();

    useEffect(() => {
        function showRankingModerator(players: Array<Player>) {
            setShowRanking(true);
            setRankingPlayers(players);
        }

        function nextQuestion(hasNext: boolean, currentQuestion: number) {
            dispatch(quizNextQuestion({ currentQuestion, hasNext }));
            setShowRanking(false);
            setRankingPlayers(undefined);
            socket.emit("quiz:show-question");
            resetValues();
        }

        socket.on("quiz:ranking-moderator", showRankingModerator);
        socket.on("quiz:next-question", nextQuestion);

        return () => {
            socket.off("quiz:ranking-moderator", showRankingModerator);
            socket.off("quiz:next-question", nextQuestion);
        };
    });

    return { showRanking, rankingPlayers };
}
