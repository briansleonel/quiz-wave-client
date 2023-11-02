import { Check, Trash3, X } from "react-bootstrap-icons";
import { ICollectionQuestion } from "../../types/question";
import ModalQuestionCollectionUpdate from "../Modals/ModalQuestionCollectionUpdate";
import CardContainer from "./CardContainer";
import ButtonPrimary from "../Button/ButtonPrimary";

export default function QuestionCollectionCard({
    question,
    index,
    handleUpdateQuestion,
    handleDeleteQuestion,
}: {
    question: ICollectionQuestion;
    index: number;
    handleUpdateQuestion: (
        updatedQuestion: ICollectionQuestion,
        index: number
    ) => void;
    handleDeleteQuestion: (question: ICollectionQuestion) => void;
}) {
    return (
        <CardContainer className="!p-0">
            <div className="flex p-4 items-center justify-between">
                <h6 className="text-neutral-800 font-medium text-lg">
                    {index + 1} - {question.question}
                </h6>

                <div className="flex gap-2">
                    <ModalQuestionCollectionUpdate
                        question={question}
                        index={index}
                        handleUpdateQuestion={handleUpdateQuestion}
                    />

                    <ButtonPrimary
                        className="bg-transparent !text-neutral-600 text-lg hover:bg-transparent hover:!text-neutral-800 hover:shadow"
                        title="Eliminar"
                        onClick={() => handleDeleteQuestion(question)}
                    >
                        <Trash3 />
                    </ButtonPrimary>
                </div>
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
