import { Check, X } from "react-bootstrap-icons";
import { ICollectionQuestionWithId } from "../../types/question";
import ModalQuestionCollectionUpdate from "../Modals/ModalQuestionCollectionUpdate";
import CardContainer from "./CardContainer";

export default function QuestionCollectionCard({
    question,
    index,
    handleUpdateQuestion,
}: {
    question: ICollectionQuestionWithId;
    index: number;
    handleUpdateQuestion: (
        updatedQuestion: ICollectionQuestionWithId,
        index: number
    ) => void;
}) {
    return (
        <CardContainer className="!p-0">
            <div className="flex p-4 items-center justify-between">
                <h6 className="text-neutral-800 font-medium text-lg">
                    {index + 1} - {question.question}
                </h6>

                <ModalQuestionCollectionUpdate
                    question={question}
                    index={index}
                    handleUpdateQuestion={handleUpdateQuestion}
                />
            </div>
            <div className="p-4 pt-0 flex flex-col gap-2">
                {question.options.map((opt, i) => (
                    <div key={i} className="flex gap-4 items-center">
                        {question.correct === i ? (
                            <Check className="w-6 h-fit text-green-500" />
                        ) : (
                            <X className="w-6 h-fit text-red-500" />
                        )}
                        <span className="text-neutral-700">{opt}</span>
                    </div>
                ))}
            </div>
        </CardContainer>
    );
}
