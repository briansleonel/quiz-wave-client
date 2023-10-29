import { useFormInput, useFormTextArea } from "../../hooks/inputs/useFormInput";
import useModal from "../../hooks/modal/useModal";
import ButtonPrimary from "../Button/ButtonPrimary";
import ModalDialog from "./ModalDialog";
import { useQuestionOption } from "../../hooks/questions/useQuestionOptions";
import { ICollectionQuestionWithId } from "../../types/question";
import { toastError } from "../Sonner/sonner.toast";
import { orderOptions } from "../../libs/questions.libs";
import QuestionCollectionForm from "../Forms/QuestionCollectionForm/QuestionCollectionForm";

interface Props {
    hanldeAddQuestion: (question: ICollectionQuestionWithId) => void;
}

export default function ModalQuestionCollection({ hanldeAddQuestion }: Props) {
    const { closeModal, openModal, showModal } = useModal();

    const inputQuestion = useFormInput("");
    const inputDuration = useFormInput("20");
    const inputDescription = useFormTextArea("");

    const {
        options,
        inputOptions,
        editOption,
        correctOption,
        setCorrectOption,
        setOptions,
        handleAddOption,
        handleCancelEditOption,
        handleDeleteOption,
        handleEditOption,
    } = useQuestionOption({
        optionsGroup: [],
        correct: "",
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
                    const newQuestion: ICollectionQuestionWithId = {
                        _id: "",
                        question: inputQuestion.inputProps.value,
                        description: inputDescription.inputProps.value,
                        options: orderOptions(options, correctOption),
                        correct: 0,
                        duration: Number(inputDuration.inputProps.value),
                    };

                    //setQuestions([...questions, newQuestion]);
                    hanldeAddQuestion(newQuestion);

                    cleanInputs();
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

    const cleanInputs = () => {
        inputQuestion.setInput("");
        inputDescription.setInput("");
        inputDuration.setInput("20");
        setOptions([]);
        setCorrectOption("");
    };

    return (
        <>
            <ButtonPrimary
                className="px-4 py-1 text-sm font-normal capitalize"
                title="Renombrar"
                onClick={openModal}
            >
                Agregar
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
