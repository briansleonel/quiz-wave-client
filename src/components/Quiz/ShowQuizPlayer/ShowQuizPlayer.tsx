import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { optionsModel } from "../../OptionsModel/OptionsModel";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import Timer from "../Timer/Timer";
import ShowQuestion from "../ShowQuestion/ShowQuestion";

export default function ShowQuizPlayer() {
    const navigate = useNavigate();

    const [countdown, setCountdown] = useState<number>();
    const [question, setQuestion] = useState<string>();
    const [options, setOptions] = useState<Array<string>>();

    const [showOptions, setShowOptions] = useState(false);

    const [selectedOption, setSelectedOption] = useState(-1);
    const [isSelectedOption, setIsSelectedOption] = useState(false);

    const [loading, setloading] = useState(true);

    const handleSelectOption = (index: number) => {
        if (!isSelectedOption && countdown && countdown > 0) {
            setSelectedOption(index);
            setIsSelectedOption(true);
            socket.emit("quiz-player:send-answer", index, countdown);
        }
    };

    useEffect(() => {
        function showQuestionEvent(question: string) {
            setQuestion(question);
            setloading(false);
        }

        function showOptionsEvent(opts: Array<string>) {
            setOptions(opts);
            setShowOptions(true);
        }

        function updateCountodwn(countdown: number) {
            setCountdown(countdown);
        }

        function countdownStopped() {
            navigate("/answer/result");
        }

        socket.on("quiz:show-question", showQuestionEvent);
        socket.on("quiz:countdown", updateCountodwn);
        socket.on("quiz:show-options", showOptionsEvent);
        socket.on("quiz:countdown-stopped", countdownStopped);

        return () => {
            socket.off("quiz:show-question", showQuestionEvent);
            socket.off("quiz:show-options", showOptionsEvent);
            socket.off("quiz:countdown", updateCountodwn);
            socket.off("quiz:countdown-stopped", countdownStopped);
        };
    });

    return (
        <main
            className={`flex flex-col w-full h-screen transition-all ${
                showOptions ? "justify-between" : "justify-center"
            }`}
        >
            {!loading && question ? (
                <>
                    <ShowQuestion
                        question={question}
                        showOptions={showOptions}
                    />

                    {countdown && <Timer timer={countdown} />}

                    {showOptions && options && (
                        <div className="p-4 grid grid-cols-2 gap-4">
                            {options.map((o, i) => (
                                <div
                                    key={i}
                                    className={`text-white w-full p-8 font-medium text-base md:text-4xl rounded cursor-pointer transition-all duration-500 shadow shadow-neutral-900 text-center flex gap-6 items-center ${
                                        optionsModel[i].color
                                    }  ${
                                        isSelectedOption && selectedOption != i
                                            ? " opacity-50"
                                            : ""
                                    }`}
                                    onClick={() => handleSelectOption(i)}
                                >
                                    {optionsModel[i].icon}{" "}
                                    <span className="">{o}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </main>
    );
}
