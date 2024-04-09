import QuestionAndOptions from "../QuestionAndOptions/QuestionAndOptions";

import RankingModerator from "../RankingModerator/RankingModerator";
import useShowRankingModerator from "../../../hooks/quizModerator/useShowRankingModerator";
import useShowQuizModerator from "../../../hooks/quizModerator/useShowQuizModerator";

export default function ShowQuizModerator() {
    const {
        countdownShowOptions,
        countdownShowQuestion,
        question,
        showOptions,
        showCorrect,
        resetValues,
    } = useShowQuizModerator();

    const { rankingPlayers, showRanking } = useShowRankingModerator({
        resetValues,
    });

    return (
        <>
            {showRanking && rankingPlayers ? (
                <RankingModerator rankingPlayers={rankingPlayers} />
            ) : (
                <QuestionAndOptions
                    countdownShowOptions={countdownShowOptions}
                    countdownShowQuestion={countdownShowQuestion}
                    question={question}
                    showCorrect={showCorrect}
                    showOptions={showOptions}
                />
            )}
        </>
    );
}
