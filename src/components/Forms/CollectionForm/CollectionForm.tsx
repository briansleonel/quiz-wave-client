import { CircleFill, Trash3 } from "react-bootstrap-icons";
import ModalCollectionName from "../../Modals/ModalCollectionName";
import ButtonPrimary from "../../Button/ButtonPrimary";
import ModalQuestionCollection from "../../Modals/ModalQuestionCollection";
import QuestionCollectionCard from "../../Cards/QuestionCollectionCard";
import { useState } from "react";
import {
    ICollectionQuestion,
    ICollectionQuestionWithId,
} from "../../../types/question";
import {
    ICollection,
    ICollectionWithUpdatedAt,
} from "../../../types/collection";
import { useAppSelector } from "../../../store/hooks.redux";
import collectionService from "../../../services/collection.service";
import { useNavigate } from "react-router-dom";
import {
    toastError,
    toastInformation,
    toastSuccess,
} from "../../Sonner/sonner.toast";
import {
    useCreateCollection,
    useUpdateCollection,
} from "../../../hooks/collections/useCollectionMutation";

interface Props {
    collection?: ICollectionWithUpdatedAt;
    edit: boolean;
}

export default function CollectionForm({ edit, collection }: Props) {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const { createCollection } = useCreateCollection();
    const { updateCollection } = useUpdateCollection();
    // Estado para el nombre y descrripción de la coleccion
    const [name, setName] = useState<string>(collection ? collection.name : "");
    const [description, setDescription] = useState<string>(
        collection ? collection.description : ""
    );

    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

    // Preguntas correspondientes a la collection
    const [questions, setQuestions] = useState<Array<ICollectionQuestion>>(
        collection ? collection.questions : []
    );

    /**
     * Permite cambiar el nombre y descripción de la colección actual
     *
     * @param title nombre de la Colección
     * @param description descripción de la Colección
     */
    const changeTitleAndDescription = (title: string, description: string) => {
        setName(title);
        setDescription(description);
        changesMade();
    };

    /**
     * Controlador de evento que permite agregar una nueva pregunta al listado de preguntas
     * @param question pregunta a agregar
     */
    const hanldeAddQuestion = (question: ICollectionQuestion) => {
        setQuestions([...questions, question]);
        changesMade();
    };

    /**
     * Controlador de eventos que permite actualizar una determinada pregunta
     * @param updatedQuestion pregunta actualizada
     * @param index indice de la pregunta que se va a actualizar
     */
    const handleUpdateQuestion = (
        updatedQuestion: ICollectionQuestion,
        index: number
    ) => {
        const updateQuestionArray = questions.map((q, i) => {
            if (i == index) {
                return updatedQuestion;
            }

            return q;
        });

        setQuestions(updateQuestionArray);
        changesMade();
    };

    /**
     * Controlador de eventos que permite eliminar una determinada pregunta del listado de preguntas
     * @param question pregunta a eliminar
     */
    const handleDeleteQuestion = (question: ICollectionQuestion) => {
        const updateQuestionArray = questions.filter((q) => q !== question);

        setQuestions(updateQuestionArray);
        changesMade();
    };

    /**
     * Permite establecer que se han realizado cambios sobre una coleción recibida en los props
     */
    const changesMade = () => {
        if (!unsavedChanges) {
            setUnsavedChanges(true);
        }
    };

    /**
     * Permite crear una nueva colección, o guardaar los cambios realizados a una colección existente
     */
    const handleSaveCollection = () => {
        if (validateCollectionForm()) {
            const newCollection: ICollection = {
                name,
                description,
                questions,
                user: edit ? collection?.user : user._id,
            };

            if (edit && collection) {
                updateCollection(
                    { ...newCollection, _id: collection._id },
                    {
                        onSuccess: (data) => {
                            navigate("/dashboard/collection");
                        },
                    }
                );
            } else {
                createCollection(newCollection, {
                    onSuccess: (data) => {
                        navigate("/dashboard/collection");
                    },
                });
            }
        }
    };

    /**
     * Permite validar el formulario de colección, verificando que se ingresen los campos necesarios
     * @returns true si se valida el formulario, false en caso contrario
     */
    const validateCollectionForm = () => {
        if (name) {
            if (questions.length > 0) {
                return true;
            } else {
                toastInformation("Debe ingresar al menos una pregunta");
            }
        } else {
            toastInformation("Debe ingresar un título a la colección");
        }

        return false;
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

                <div className="flex flex-col gap-2 mt-4">
                    {edit && (
                        <ButtonPrimary className="text-sm font-medium tracking-wider">
                            Empezar
                        </ButtonPrimary>
                    )}
                    {(unsavedChanges || !edit) && (
                        <ButtonPrimary
                            className="text-sm font-medium tracking-wider bg-green-600 hover:bg-green-600/80"
                            onClick={handleSaveCollection}
                        >
                            Guardar {edit ? "cambios" : ""}
                        </ButtonPrimary>
                    )}
                </div>

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
