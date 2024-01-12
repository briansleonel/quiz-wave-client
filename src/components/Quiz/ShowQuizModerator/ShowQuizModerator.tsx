import { useEffect, useState } from "react";
import QuestionAndOptions from "../QuestionAndOptions/QuestionAndOptions";
import { Player } from "../../../types/quiz/player";
import { socket } from "../../../socket";

import RankingModerator from "../RankingModerator/RankingModerator";
import { useAppDispatch } from "../../../store/hooks.redux";
import { quizNextQuestion } from "../../../store/features/quiz.slice";

export default function ShowQuizModerator() {
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
        }

        socket.on("quiz:ranking-moderator", showRankingModerator);
        socket.on("quiz:next-question", nextQuestion);

        return () => {
            socket.off("quiz:ranking-moderator", showRankingModerator);
            socket.off("quiz:next-question", nextQuestion);
        };
    });

    return (
        <>
            {showRanking && rankingPlayers ? (
                <RankingModerator rankingPlayers={rankingPlayers} />
            ) : (
                <QuestionAndOptions />
            )}
        </>
    );
}
