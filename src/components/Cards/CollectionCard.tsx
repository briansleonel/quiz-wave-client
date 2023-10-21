import { Pencil, Trash3 } from "react-bootstrap-icons";
import { ICollectionWithUpdatedAt } from "../../types/collection";
import ButtonPrimary from "../Button/ButtonPrimary";
import CardContainer from "./CardContainer";
import { getTimeAgo } from "../../libs/getTimeAgo";

interface Props {
    collection: ICollectionWithUpdatedAt;
}

export default function CollectionCard({ collection }: Props) {
    return (
        <CardContainer>
            <div className="flex justify-between gap-4">
                <h5 className="text-neutral-700 font-medium capitalize text-lg md:text-2xl break-words">
                    {collection.name}
                </h5>
                <div className="flex items-start gap-2">
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
            </div>

            <div className="flex items-end  justify-end md:justify-between gap-2 2xl:gap-8">
                <span className="hidden md:inline bg-indigo-400 text-white p-1 px-2 rounded uppercase text-xs">
                    {collection.questions.length} preguntas
                </span>
                <div className="flex items-center justify-end gap-4">
                    <span className="text-sm text-neutral-500 italic">
                        Actualizado {getTimeAgo(new Date(collection.updatedAt))}
                    </span>
                    <ButtonPrimary className="text-sm font-medium tracking-wider">
                        Empezar
                    </ButtonPrimary>
                </div>
            </div>
        </CardContainer>
    );
}
