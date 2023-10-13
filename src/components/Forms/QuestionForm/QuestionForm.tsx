import { useNavigate } from "react-router-dom";
import { IQuestionId } from "../../../types/question";
import { SubTitle } from "../../Layout/TitleSubtitle";
import Label from "../Label/Label";
import { Input } from "../Input/Input";
import InputOption from "../Input/InputOption";
import OptionsButtonGroup from "./OptionsButtonGroup";
import ListBoxCategory from "../ListBox/ListBoxCategory";
import { TextArea } from "../Input/TextArea";
import ButtonPrimary from "../../Button/ButtonPrimary";
import useQuestionForm from "../../../hooks/questions/useQuestionForm";

export default function QuestionForm({
    question,
    edit,
}: {
    question?: IQuestionId;
    edit: boolean;
}) {
    const navigate = useNavigate();
    const { category, handlers, inputs, options } = useQuestionForm({
        question,
        edit,
    });

    /**
     * Evento para volver al dashboard principal de preguntas
     */
    const goToDashboardQuestion = () => {
        navigate("/dashboard/question");
    };

    return (
        <form
            className="w-full flex flex-col gap-4 mx-auto"
            method="POST"
            onSubmit={handlers.onSubmit}
        >
            <SubTitle className="">Pregunta</SubTitle>
            <Label label="Pregunta" name="question">
                <Input
                    type="text"
                    name="question"
                    inputProps={inputs.inputQuestion.inputProps}
                />
            </Label>

            {/** INPUT OPTIONS */}
            <Label
                label={`${options.editOption ? "Editar" : "Nueva"} opción`}
                name="option"
            >
                <InputOption
                    editOption={options.editOption}
                    handleAdd={handlers.handleAddOption}
                    handleCancelEdit={handlers.handleCancelEditOption}
                    inputProps={inputs.inputOptions.inputProps}
                />
            </Label>

            {/** OPTIONS */}
            {options.options.length > 0 && (
                <Label label="Opciones" name="options">
                    <div className="p-2 bg-neutral-50 rounded border">
                        <OptionsButtonGroup
                            correctOption={options.correctOption}
                            handleDelete={handlers.handleDeleteOption}
                            handleEdit={handlers.handleEditOption}
                            options={options.options}
                            setCorrectOption={options.setCorrectOption}
                        />
                    </div>
                </Label>
            )}

            <Label label="Categoría" name="category">
                <ListBoxCategory
                    selected={category.selectedCategory}
                    setSelected={category.setSelectedCategory}
                />
            </Label>

            <Label label="Descripción" name="description">
                <TextArea
                    name="description"
                    inputProps={inputs.inputDescription.inputProps}
                />
            </Label>

            <div className="flex flex-col gap-2">
                <ButtonPrimary className="" type="submit">
                    Guardar {question ? " cambios" : ""}
                </ButtonPrimary>
                <ButtonPrimary
                    className="bg-red-600 hover:bg-red-500"
                    type="button"
                    onClick={goToDashboardQuestion}
                >
                    Cancelar
                </ButtonPrimary>
            </div>
        </form>
    );
}
