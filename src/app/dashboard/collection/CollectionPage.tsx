import { Pencil, Trash, Trash3 } from "react-bootstrap-icons";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import { collectionsMock } from "../../../services/collecttions.mock";
import { getTimeAgo } from "../../../libs/getTimeAgo";

export default function CollectionPage() {
    return (
        <>
            <ContainerUtil>
                <section className="w-full px-12 grid grid-cols-1 md:grid-cols-2 sm gap-8">
                    {collectionsMock.map((collection) => (
                        <article
                            key={collection._id}
                            className="relative w-full flex flex-col justify-between gap-2 bg-white rounded p-4 shadow-md min-h-[8rem]"
                        >
                            <h5 className="text-neutral-700 font-bold capitalize text-2xl">
                                {collection.name}
                            </h5>
                            <div className="absolute top-4 right-4 flex gap-2">
                                <ButtonPrimary
                                    className="bg-transparent !text-neutral-600 text-lg hover:bg-transparent hover:!text-neutral-800 hover:shadow"
                                    title="Editar"
                                >
                                    <Pencil />
                                </ButtonPrimary>
                                <ButtonPrimary
                                    className="bg-transparent !text-neutral-600 text-lg hover:bg-transparent hover:!text-neutral-800 hover:shadow"
                                    title="Eliminar"
                                >
                                    <Trash3 />
                                </ButtonPrimary>
                            </div>

                            <div className="flex items-end justify-between gap-8">
                                <span className="bg-indigo-400 text-white p-1 px-2 rounded uppercase text-xs">
                                    {collection.questions.length} preguntas
                                </span>
                                <div className="flex items-center justify-end gap-4">
                                    <span className="text-sm text-neutral-500 italic">
                                        Actualizado{" "}
                                        {getTimeAgo(
                                            new Date(collection.updatedAt)
                                        )}
                                    </span>
                                    <ButtonPrimary className="text-sm font-medium tracking-wider">
                                        Empezar
                                    </ButtonPrimary>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </ContainerUtil>
        </>
    );
}
