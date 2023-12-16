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

    const { countdown: countdownShowQuestion } = useCountdown(10);

    const [showOptions, setShowOptions] = useState(false);

    const [question, setQuestion] = useState<ICollectionQuestion>(
        questions[currentQuestion]
    );

    const { countdown: countdownShowOptions, setStart } = useCountdown(
        question.duration,
        false
    );

    useEffect(() => {
        if (countdownShowQuestion === 0) {
            setShowOptions(true);
            setStart(true);
        }
    }, [countdownShowQuestion, setStart]);

    return (
        <BackgroundQuiz>
            <main className="flex flex-col w-full h-screen justify-between">
                <div className="bg-white uppercase p-8 text-center font-medium text-4xl">
                    {question.question}
                </div>
                {!showOptions && (
                    <div className="bg-white">{countdownShowQuestion}</div>
                )}

                {showOptions && (
                    <div className="flex items-center">
                        <div className="p-2 text-white flex items-center justify-center align-middle">
                            <span className="text-5xl text-center inline-block align-text-top">
                                {countdownShowOptions}
                            </span>
                        </div>
                    </div>
                )}

                {showOptions && (
                    <div className="p-4 grid grid-cols-2 gap-4">
                        {question.options.map((o, i) => (
                            <div
                                key={i}
                                className="bg-white text-black w-full p-4 font-medium uppercase text-base md:text-2xl  rounded hover:bg-neutral-200 cursor-pointer transition-all duration-500 shadow shadow-neutral-900 text-center"
                            >
                                {o}
                            </div>
                        ))}
                    </div>
                )}

                {/*<button
                    onClick={() => {
                        setStart(true);
                    }}
                >
                    Start
                </button>*/}
            </main>
        </BackgroundQuiz>
    );
}
