import { useAppSelector } from "../../store/hooks.redux";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import ShowQuizModerator from "../../components/Quiz/ShowQuizModerator/ShowQuizModerator";
import ShowQuizPlayer from "../../components/Quiz/ShowQuizPlayer/ShowQuizPlayer";

export default function GamePage() {
    const { socketId } = useAppSelector((state) => state.quiz);

    const isModerator = socketId !== undefined;

    return (
        <BackgroundQuiz>
            {isModerator ? <ShowQuizModerator /> : <ShowQuizPlayer />}
        </BackgroundQuiz>
    );
}
