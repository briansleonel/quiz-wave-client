import { CircleFill, Trash3 } from "react-bootstrap-icons";
import ModalCollectionName from "../../Modals/ModalCollectionName";
import ButtonPrimary from "../../Button/ButtonPrimary";
import ModalQuestionCollection from "../../Modals/ModalQuestionCollection";
import QuestionCollectionCard from "../../Cards/QuestionCollectionCard";
import { useState } from "react";
import { ICollectionQuestionWithId } from "../../../types/question";
import { ICollectionWithUpdatedAt } from "../../../types/collection";

interface Props {
    collection?: ICollectionWithUpdatedAt;
    edit: boolean;
}

export default function CollectionForm({ edit, collection }: Props) {
    // Estado para el nombre y descrripción de la coleccion
    const [name, setName] = useState<string>(collection ? collection.name : "");
    const [description, setDescription] = useState<string>(
        collection ? collection.description : ""
    );

    // Preguntas correspondientes a la collection
    const [questions, setQuestions] = useState<
        Array<ICollectionQuestionWithId>
    >(collection ? collection.questions : []);

    /**
     * Permite cambiar el nombre y descripción de la colección actual
     *
     * @param title nombre de la Colección
     * @param description descripción de la Colección
     */
    const changeTitleAndDescription = (title: string, description: string) => {
        setName(title);
        setDescription(description);
    };

    /**
     * Controlador de evento que permite agregar una nueva pregunta al listado de preguntas
     * @param question pregunta a agregar
     */
    const hanldeAddQuestion = (question: ICollectionQuestionWithId) => {
        setQuestions([...questions, question]);
    };

    /**
     * Controlador de eventos que permite actualizar una determinada pregunta
     * @param updatedQuestion pregunta actualizada
     * @param index indice de la pregunta que se va a actualizar
     */
    const handleUpdateQuestion = (
        updatedQuestion: ICollectionQuestionWithId,
        index: number
    ) => {
        const updateQuestionArray = questions.map((q, i) => {
            if (i == index) {
                return updatedQuestion;
            }

            return q;
        });

        setQuestions(updateQuestionArray);
    };

    /**
     * Controlador de eventos que permite eliminar una determinada pregunta del listado de preguntas
     * @param question pregunta a eliminar
     */
    const handleDeleteQuestion = (question: ICollectionQuestionWithId) => {
        const updateQuestionArray = questions.filter((q) => q !== question);

        setQuestions(updateQuestionArray);
    };

    return (
        <main className="w-full grid grid-cols-1 md:grid-cols-4 min-h-max gap-0 gap-y-8 md:gap-8">
            <section className="flex flex-col gap-4 bg-white rounded p-6 shadow-md h-fit">
                <div className="flex items-start justify-between gap-2">
                    <h1 className="text-3xl font-medium text-neutral-900">
                        {name ? name : "Titulo de la colección"}
                    </h1>
                </div>

                <div className="flex justify-between gap-2">
                    <span className="text-xs text-neutral-500 flex items-center gap-2">
                        <CircleFill className="w-2 text-neutral-400" />{" "}
                        Actualizado hace 2 semanas
                    </span>
                    <div className="flex gap-2">
                        <ModalCollectionName
                            description={description ? description : ""}
                            title={name ? name : ""}
                            changeTitleAndDescription={
                                changeTitleAndDescription
                            }
                        />
                        <ButtonPrimary
                            className="bg-transparent !text-neutral-600 text-lg hover:bg-transparent hover:!text-neutral-800 hover:shadow"
                            title="Eliminar"
                        >
                            <Trash3 />
                        </ButtonPrimary>
                    </div>
                </div>

                <ButtonPrimary className="text-sm font-medium tracking-wider mt-4">
                    Empezar
                </ButtonPrimary>

                {description && (
                    <div className="mt-4">
                        <p className="break-words font-normal text-sm text-neutral-600">
                            {description}
                        </p>
                    </div>
                )}
            </section>
            <section className="col-span-3 flex flex-col gap-4">
                <div className="flex justify-between">
                    <span className="text-neutral-600 font-medium">
                        Preguntas ({questions?.length ?? 0})
                    </span>
                    <ModalQuestionCollection
                        hanldeAddQuestion={hanldeAddQuestion}
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {questions.map((question, index) => (
                        <QuestionCollectionCard
                            key={index}
                            handleUpdateQuestion={handleUpdateQuestion}
                            handleDeleteQuestion={handleDeleteQuestion}
                            question={question}
                            index={index}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}
