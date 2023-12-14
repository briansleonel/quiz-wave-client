import { useEffect, useState } from "react";
import BackgroundQuiz from "../../components/Trivia/BackgroundQuiz";
import { useAppSelector } from "../../store/hooks.redux";
import { ICollectionQuestion } from "../../types/question";
import useCountdown from "../../hooks/countdown/useCountdown";

const time = 5;

export default function StartQuizPage() {
    const { currentQuestion, questions } = useAppSelector(
        (state) => state.quiz
    );

    const { countdown: countdownShowQuestion, setStart } = useCountdown(10);

    const [showOptions, setShowOptions] = useState(false);

    const [question, setQuestion] = useState<ICollectionQuestion>(
        questions[currentQuestion]
    );

    useEffect(() => {
        if (countdownShowQuestion === 0) {
            setShowOptions(true);
        }
    }, [countdownShowQuestion]);

    return (
        <BackgroundQuiz>
            <main>
                <div className="bg-white">{countdownShowQuestion}</div>
                <div className="bg-white">{question.question}</div>

                {showOptions && (
                    <>
                        {question.options.map((o, i) => (
                            <div key={i} className="bg-white">
                                {o}
                            </div>
                        ))}
                    </>
                )}

                <button
                    onClick={() => {
                        setStart(true);
                    }}
                >
                    Start
                </button>
            </main>
        </BackgroundQuiz>
    );
}
