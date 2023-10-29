import { useParams } from "react-router-dom";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import { useState } from "react";
import { CircleFill, Trash3 } from "react-bootstrap-icons";
import { ICollectionWithUpdatedAt } from "../../../types/collection";
import ModalCollectionName from "../../../components/Modals/ModalCollectionName";
import { ICollectionQuestionWithId } from "../../../types/question";
import ModalQuestionCollection from "../../../components/Modals/ModalQuestionCollection";
import QuestionCollectionCard from "../../../components/Cards/QuestionCollectionCard";

export default function CollectionABMPage() {
    const params = useParams<{ id: string }>();

    const [collection, setCollection] = useState<ICollectionWithUpdatedAt>();

    const [questions, setQuestions] = useState<
        Array<ICollectionQuestionWithId>
    >([]);

    const changeTitleAndDescription = (title: string, description: string) => {
        setCollection({ ...collection!, name: title, description });
    };

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

    const handleDeleteQuestion = (question: ICollectionQuestionWithId) => {
        const updateQuestionArray = questions.filter((q) => q !== question);

        setQuestions(updateQuestionArray);
    };

    return (
        <ContainerUtil>
            <main className="w-full grid grid-cols-4 min-h-max gap-8">
                <section className="flex flex-col gap-4 bg-white rounded p-6 shadow-md h-fit">
                    <div className="flex items-start justify-between gap-2">
                        <h1 className="text-3xl font-medium text-neutral-900">
                            {collection?.name ?? "Titulo de la colección"}
                        </h1>
                    </div>

                    <div className="flex justify-between gap-2">
                        <span className="text-xs text-neutral-500 flex items-center gap-2">
                            <CircleFill className="w-2 text-neutral-400" />{" "}
                            Actualizado hace 2 semanas
                        </span>
                        <div className="flex gap-2">
                            <ModalCollectionName
                                description={collection?.description ?? ""}
                                title={collection?.name ?? ""}
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

                    {collection?.description && (
                        <div className="mt-4">
                            <p className="break-words font-normal text-sm text-neutral-600">
                                {collection.description}
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
                            questions={questions ?? []}
                            setQuestions={setQuestions}
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
        </ContainerUtil>
    );
}
