import { useFormInput, useFormTextArea } from "../../hooks/inputs/useFormInput";
import useModal from "../../hooks/modal/useModal";
import ButtonPrimary from "../Button/ButtonPrimary";
import { Input } from "../Forms/Input/Input";
import Label from "../Forms/Label/Label";
import ModalDialog from "./ModalDialog";
import InputOption from "../Forms/Input/InputOption";
import OptionsButtonGroup from "../Forms/QuestionForm/OptionsButtonGroup";
import { useQuestionOption } from "../../hooks/questions/useQuestionOptions";
import { TextArea } from "../Forms/Input/TextArea";
import { ICollectionQuestionWithId } from "../../types/question";

interface Props {
    question?: ICollectionQuestionWithId;
}

export default function ModalQuestionCollection({ question }: Props) {
    const { closeModal, openModal, showModal } = useModal();

    const inputQuestion = useFormInput(question ? question.question : "");
    const inputDuration = useFormInput(
        question ? question.duration.toString() : "20"
    );
    const inputDescription = useFormTextArea(
        question && question.description ? question.description : ""
    );

    const {
        options,
        inputOptions,
        editOption,
        correctOption,
        setCorrectOption,
        handlerAddOption,
        handlerCancelEditOption,
        handlerDeleteOption,
        handlerEditOption,
    } = useQuestionOption({
        optionsGroup: question ? question.options : [],
        correct: question ? question.options[question.correct] : "",
    });

    const handleSubmit = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        closeModal();
    };

    const handleCancel = () => {
        closeModal();
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

            <ModalDialog closeModal={handleCancel} isOpen={showModal} title="">
                <form className="w-full grid grid-cols-1 gap-4">
                    <Label label="Pregunta" name="question">
                        <Input
                            type="text"
                            name="question"
                            inputProps={inputQuestion.inputProps}
                        />
                    </Label>

                    {/** INPUT OPTIONS */}
                    <Label
                        label={`${editOption ? "Editar" : "Nueva"} opción`}
                        name="option"
                    >
                        <InputOption
                            editOption={editOption}
                            handleAdd={handlerAddOption}
                            handleCancelEdit={handlerCancelEditOption}
                            inputProps={inputOptions.inputProps}
                        />
                    </Label>

                    {/** OPTIONS */}
                    {options.length > 0 && (
                        <Label label="Opciones" name="options">
                            <div className="p-2 bg-neutral-50 rounded border">
                                <OptionsButtonGroup
                                    correctOption={correctOption}
                                    handleDelete={handlerDeleteOption}
                                    handleEdit={handlerEditOption}
                                    options={options}
                                    setCorrectOption={setCorrectOption}
                                />
                            </div>
                        </Label>
                    )}

                    <Label label="Duración" name="duration">
                        <Input
                            type="number"
                            name="duration"
                            inputProps={inputDuration.inputProps}
                        />
                    </Label>

                    <Label label="Descripción" name="description">
                        <TextArea
                            name="description"
                            inputProps={inputDescription.inputProps}
                        />
                    </Label>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 w-full mt-6">
                        <ButtonPrimary
                            className="text-sm font-normal w-full bg-neutral-200 !text-black hover:bg-neutral-300"
                            onClick={handleCancel}
                            type="button"
                        >
                            Cancelar
                        </ButtonPrimary>
                        <ButtonPrimary
                            className="text-sm font-normal w-full bg-green-500 hover:bg-green-600"
                            onClick={handleSubmit}
                        >
                            Listo
                        </ButtonPrimary>
                    </div>
                </form>
            </ModalDialog>
        </>
    );
}
