import ButtonPrimary from "../../Button/ButtonPrimary";
import { Input } from "../Input/Input";
import InputOption from "../Input/InputOption";
import { TextArea } from "../Input/TextArea";
import Label from "../Label/Label";
import OptionsButtonGroup from "../QuestionForm/OptionsButtonGroup";

interface InputProps {
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface TextAreaProps {
    value: string;
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

interface Props {
    inputQuestionProps: InputProps;
    inputOptionsProps: InputProps;
    inputDurationProps: InputProps;
    inputDescriptionProps: TextAreaProps;

    handleCancelEditOption: () => void;
    handleAddOption: () => void;
    handleEditOption: (option: string) => void;
    handleDeleteOption: (option: string) => void;

    editOption: boolean;
    options: string[];
    correctOption: string;

    setCorrectOption: (option: string) => void;
    handleCancel: () => void;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function QuestionCollectionForm({
    correctOption,
    editOption,
    handleCancel,
    handleSubmit,
    handleCancelEditOption,
    handleDeleteOption,
    handleEditOption,
    inputQuestionProps,
    options,
    setCorrectOption,
    inputDescriptionProps,
    inputDurationProps,
    inputOptionsProps,
    handleAddOption,
}: Props) {
    return (
        <form className="w-full grid grid-cols-1 gap-4">
            <Label label="Pregunta" name="question">
                <Input
                    type="text"
                    name="question"
                    inputProps={inputQuestionProps}
                />
            </Label>

            {/** INPUT OPTIONS */}
            <Label
                label={`${editOption ? "Editar" : "Nueva"} opción`}
                name="option"
            >
                <InputOption
                    editOption={editOption}
                    handleAdd={handleAddOption}
                    handleCancelEdit={handleCancelEditOption}
                    inputProps={inputOptionsProps}
                />
            </Label>

            {/** OPTIONS */}
            {options.length > 0 && (
                <Label label="Opciones" name="options">
                    <div className="p-2 bg-neutral-50 rounded border">
                        <OptionsButtonGroup
                            correctOption={correctOption}
                            handleDelete={handleDeleteOption}
                            handleEdit={handleEditOption}
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
                    inputProps={inputDurationProps}
                />
            </Label>

            <Label label="Descripción" name="description">
                <TextArea
                    name="description"
                    inputProps={inputDescriptionProps}
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
    );
}

/**
 * <QuestionCollectionForm
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
 */
