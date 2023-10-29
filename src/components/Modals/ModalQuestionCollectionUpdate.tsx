import { useFormInput, useFormTextArea } from "../../hooks/inputs/useFormInput";
import useModal from "../../hooks/modal/useModal";
import ButtonPrimary from "../Button/ButtonPrimary";
import ModalDialog from "./ModalDialog";
import { useQuestionOption } from "../../hooks/questions/useQuestionOptions";
import { ICollectionQuestionWithId } from "../../types/question";
import { toastError } from "../Sonner/sonner.toast";
import { orderOptions } from "../../libs/questions.libs";
import { Pencil } from "react-bootstrap-icons";
import QuestionCollectionForm from "../Forms/QuestionCollectionForm/QuestionCollectionForm";

interface Props {
    question: ICollectionQuestionWithId;
    index: number;
    questions: Array<ICollectionQuestionWithId>;
    setQuestions: (questions: Array<ICollectionQuestionWithId>) => void;
}

export default function ModalQuestionCollectionUpdate({
    question,
    questions,
    index,
    setQuestions,
}: Props) {
    const { closeModal, openModal, showModal } = useModal();

    const inputQuestion = useFormInput(question.question);
    const inputDuration = useFormInput(question.duration.toString());
    const inputDescription = useFormTextArea(question.description ?? "");

    const {
        options,
        inputOptions,
        editOption,
        correctOption,
        setCorrectOption,
        handleAddOption,
        handleCancelEditOption,
        handleDeleteOption,
        handleEditOption,
    } = useQuestionOption({
        optionsGroup: question.options,
        correct: question.options[question.correct],
    });

    /**
     * Permite realizar el envío de los datos del formulario
     * @param e Evento de formulario
     */
    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        if (inputQuestion.inputProps.value) {
            if (options.length >= 2) {
                if (correctOption !== "") {
                    const updatedQuestion: ICollectionQuestionWithId = {
                        _id: "",
                        question: inputQuestion.inputProps.value,
                        description: inputDescription.inputProps.value,
                        options: orderOptions(options, correctOption),
                        correct: 0,
                        duration: Number(inputDuration.inputProps.value),
                    };

                    setQuestions(
                        updateQuestionArray(questions, updatedQuestion)
                    );

                    closeModal();
                } else {
                    toastError("Debe seleccionar una opción como correcta");
                }
            } else {
                toastError("Debe ingresar al menos 2 opciones");
            }
        } else {
            toastError("Debe ingresar una pregunta");
        }
    };

    const updateQuestionArray = (
        questions: ICollectionQuestionWithId[],
        updatedQuestion: ICollectionQuestionWithId
    ) => {
        return questions.map((q, i) => {
            if (i == index) {
                return updatedQuestion;
            }

            return q;
        });
    };

    return (
        <>
            <ButtonPrimary
                className="bg-transparent !text-neutral-600 text-lg hover:bg-transparent hover:!text-neutral-800 hover:shadow"
                title="Editar"
                onClick={openModal}
            >
                <Pencil />
            </ButtonPrimary>

            <ModalDialog closeModal={closeModal} isOpen={showModal} title="">
                <QuestionCollectionForm
                    correctOption={correctOption}
                    editOption={editOption}
                    handleCancel={closeModal}
                    handleSubmit={handleSubmit}
                    handleAddOption={handleAddOption}
                    handleCancelEditOption={handleCancelEditOption}
                    handleDeleteOption={handleDeleteOption}
                    handleEditOption={handleEditOption}
                    inputDescriptionProps={inputDescription.inputProps}
                    inputDurationProps={inputDuration.inputProps}
                    inputOptionsProps={inputOptions.inputProps}
                    inputQuestionProps={inputQuestion.inputProps}
                    options={options}
                    setCorrectOption={setCorrectOption}
                />
            </ModalDialog>
        </>
    );
}
