import { Check, X } from "react-bootstrap-icons";
import { optionsModel } from "../../OptionsModel/OptionsModel";
import ButtonTrivia from "../../Button/ButtonTrivia";
import { socket } from "../../../socket";
import { ICollectionQuestion } from "../../../types/question";
import Timer from "../Timer/Timer";
import ShowQuestion from "../ShowQuestion/ShowQuestion";
import OptionQuiz from "../OptionQuiz/OptionQuiz";

interface Props {
    showOptions: boolean;
    question: ICollectionQuestion;
    countdownShowQuestion: number;
    countdownShowOptions: number;
    showCorrect: boolean;
}

export default function QuestionAndOptions({
    countdownShowOptions,
    countdownShowQuestion,
    question,
    showCorrect,
    showOptions,
}: Props) {
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
                <ShowQuestion
                    question={question.question}
                    showOptions={showOptions}
                />

                {countdownShowOptions === 0 && (
                    <div className="w-full flex justify-end p-4 pt-6 pr-6">
                        <ButtonTrivia
                            className="!bg-neutral-100 text-neutral-800 hover:!bg-neutral-300 hover:!text-neutral-950 tracking-wide !font-bold !py-2 text-sm !mx-0"
                            onClickFn={showRanking}
                        >
                            Siguiente
                        </ButtonTrivia>
                    </div>
                )}
            </div>

            {/** Countdown show question */}
            {!showOptions && (
                <div className="mt-14 mx-auto">
                    <Timer timer={countdownShowQuestion} />
                </div>
            )}

            {/** Countdown show options */}
            {showOptions && <Timer timer={countdownShowOptions} />}

            {/** Options of question */}
            {showOptions && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((o, i) => (
                        <OptionQuiz
                            className={`${optionsModel[i].color} ${
                                countdownShowOptions === 0 &&
                                i !== question.correct
                                    ? "opacity-50"
                                    : ""
                            }`}
                            icon={optionsModel[i].icon}
                            option={o}
                            key={i}
                        >
                            <span className="">
                                {showCorrect ? (
                                    i === question.correct ? (
                                        <Check className="w-10 md:w-12 h-fit " />
                                    ) : (
                                        <X className="w-10 md:w-12 h-fit " />
                                    )
                                ) : (
                                    ""
                                )}
                            </span>
                        </OptionQuiz>
                    ))}
                </div>
            )}
        </main>
    );
}

/**
 * 
                            <div
                                key={i}
                                className={`text-white w-full p-4 md:p-8 font-medium text-base md:text-4xl rounded cursor-pointer transition-all duration-500 shadow shadow-neutral-900 text-center flex gap-4 md:gap-6 items-center justify-between ${
                                    optionsModel[i].color
                                } ${
                                    countdownShowOptions === 0 &&
                                    i !== question.correct
                                        ? "opacity-50"
                                        : ""
                                }`}
                            >
                                <p className="flex gap-4 md:gap-6 items-center">
                                    {optionsModel[i].icon}{" "}
                                    <span className="">{o}</span>
                                </p>
                                <span className="">
                                    {showCorrect ? (
                                        i === question.correct ? (
                                            <Check className="w-10 md:w-12 h-fit " />
                                        ) : (
                                            <X className="w-10 md:w-12 h-fit " />
                                        )
                                    ) : (
                                        ""
                                    )}
                                </span>
                            </div>
 */
