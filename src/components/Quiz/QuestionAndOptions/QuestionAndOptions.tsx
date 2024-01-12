import { Check, X } from "react-bootstrap-icons";
import useShowQuizModerator from "../../../hooks/quizModerator/useShowQuizModerator";
import { optionsModel } from "../../OptionsModel/OptionsModel";
import ButtonTrivia from "../../Button/ButtonTrivia";
import { socket } from "../../../socket";

export default function QuestionAndOptions() {
    const {
        countdownShowOptions,
        countdownShowQuestion,
        question,
        showOptions,
        showCorrect,
    } = useShowQuizModerator();

    const showRanking = () => {
        socket.emit("quiz:get-ranking-moderator");
    };

    return (
        <main
            className={`flex flex-col w-full h-screen transition-all ${
                showOptions ? "justify-between" : "justify-center"
            }`}
        >
            {/** Question */}
            <div>
                <div
                    className={`bg-white  text-center font-medium transition-all  ${
                        showOptions ? "p-8 text-5xl" : " p-12 text-6xl"
                    }`}
                >
                    {question.question}
                </div>
                {countdownShowOptions === 0 && (
                    <div className="w-full flex justify-end p-4 pt-6 pr-6">
                        <ButtonTrivia
                            className="!bg-neutral-100 text-neutral-800 hover:!bg-neutral-300 hover:!text-neutral-950 tracking-wide !font-bold !py-2 text-sm mx-0"
                            onClickFn={showRanking}
                        >
                            Siguiente
                        </ButtonTrivia>
                    </div>
                )}
            </div>

            {/** Countdown show question */}
            {!showOptions && (
                <div className="relative bg-indigo-600 w-24 h-24 rounded-full shadow-2xl">
                    <span className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
                        {countdownShowQuestion}
                    </span>
                </div>
            )}

            {/** Countdown show options */}
            {showOptions && (
                <div className="relative bg-indigo-600 w-24 h-24 rounded-full shadow-2xl">
                    <span className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 block">
                        {countdownShowOptions}
                    </span>
                </div>
            )}

            {/** Options of question */}
            {showOptions && (
                <div className="p-4 grid grid-cols-2 gap-4">
                    {question.options.map((o, i) => (
                        <div
                            key={i}
                            className={`text-white w-full p-8 font-medium text-base md:text-4xl rounded cursor-pointer transition-all duration-500 shadow shadow-neutral-900 text-center flex gap-6 items-center justify-between ${
                                optionsModel[i].color
                            } relative ${
                                countdownShowOptions === 0 &&
                                i !== question.correct
                                    ? "opacity-50"
                                    : ""
                            }`}
                        >
                            <p className="flex gap-6 items-center">
                                {optionsModel[i].icon}{" "}
                                <span className="">{o}</span>
                            </p>
                            <span className="">
                                {showCorrect ? (
                                    i === question.correct ? (
                                        <Check className="w-16 h-fit " />
                                    ) : (
                                        <X className="w-16 h-fit " />
                                    )
                                ) : (
                                    ""
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
