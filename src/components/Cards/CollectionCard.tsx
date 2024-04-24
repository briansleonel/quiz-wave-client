import { Pencil, Trash3 } from "react-bootstrap-icons";
import { ICollectionWithUpdatedAt } from "../../types/collection";
import ButtonPrimary from "../Button/ButtonPrimary";
import CardContainer from "./CardContainer";
import { getTimeAgo } from "../../libs/getTimeAgo";
import { useNavigate } from "react-router-dom";
import { useDeleteCollection } from "../../hooks/collections/useCollectionMutation";
import { socket } from "../../socket";
import confirmAlert from "../../libs/confirmAlert";

interface Props {
    collection: ICollectionWithUpdatedAt;
}

export default function CollectionCard({ collection }: Props) {
    const navigate = useNavigate();
    const { deleteCollection } = useDeleteCollection();

    const goToEdit = (id: string) => {
        confirmAlert({
            handler: () => navigate("/dashboard/collection/" + id),
            title: "¿Editar colección?",
        });
    };

    const handleDeleteCollection = (id: string) => {
        confirmAlert({
            handler: () => deleteCollection(id),
            title: "Eliminar colección?",
        });
    };

    const handleStart = (id: string) => {
        confirmAlert({
            handler: () => {
                // redirecciono a la página del lobby
                navigate({ pathname: "/lobby", search: `?collection=${id}` });
                // realizo la conexión al socket
                socket.connect().emit("room:create", collection._id);
            },
            title: "Empezar wave?",
            icon: "question"
        });
    };

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
                        onClick={() => goToEdit(collection._id)}
                    >
                        <Pencil />
                    </ButtonPrimary>
                    <ButtonPrimary
                        className="bg-transparent !text-neutral-600 text-lg hover:bg-transparent hover:!text-neutral-800 hover:shadow"
                        title="Eliminar"
                        onClick={() => handleDeleteCollection(collection._id)}
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
                    <ButtonPrimary
                        className="text-sm font-medium tracking-wider"
                        onClick={() => handleStart(collection._id)}
                    >
                        Empezar
                    </ButtonPrimary>
                </div>
            </div>
        </CardContainer>
    );
}

/**
 
interface Props2 {
    to: string;
    className?: string;
    title?: string;
    children: React.ReactNode;
}

function LinkButton({ title, to, className, children }: Props2) {
    return (
        <Link
            to={to}
            className={`uppercase font-light  p-2 rounded transition-all ease-in-out duration-500 text-white bg-blue-700 hover:bg-blue-600 drop-shadow ${className}`}
            title={title ?? ""}
        >
            {children}
        </Link>
    );
}
*/
