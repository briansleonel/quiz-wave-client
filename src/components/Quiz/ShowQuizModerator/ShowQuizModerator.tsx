import { useState } from "react";
import QuestionAndOptions from "../QuestionAndOptions/QuestionAndOptions";

export default function ShowQuizModerator() {
    const [showRanking, setShowRanking] = useState(false);

    return <>{showRanking ? <>Ranking</> : <QuestionAndOptions />}</>;
}
