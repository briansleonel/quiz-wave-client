import { useParams } from "react-router-dom";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import { useState } from "react";
import { CircleFill } from "react-bootstrap-icons";
import { ICollectionWithUpdatedAt } from "../../../types/collection";
import ModalCollectionName from "../../../components/Modals/ModalCollectionName";

export default function CollectionABMPage() {
    const params = useParams<{ id: string }>();

    const [collection, setCollection] = useState<ICollectionWithUpdatedAt>();

    const changeTitleAndDescription = (title: string, description: string) => {
        setCollection({ ...collection!, name: title, description });
    };

    return (
        <ContainerUtil>
            <section className="w-full grid grid-cols-3 min-h-max gap-8">
                <div className="flex flex-col gap-4 bg-white rounded p-6 shadow-md">
                    <div className="flex items-start justify-between gap-2">
                        <h1 className="text-2xl font-medium">
                            {collection?.name ?? "Titulo de la colección"}
                        </h1>
                        <ModalCollectionName
                            description={collection?.description ?? ""}
                            title={collection?.name ?? ""}
                            changeTitleAndDescription={
                                changeTitleAndDescription
                            }
                        />
                    </div>

                    <ButtonPrimary className="text-sm font-medium tracking-wider">
                        Empezar
                    </ButtonPrimary>

                    <span className="text-sm text-neutral-500 flex items-center gap-2">
                        <CircleFill className="w-2" /> Actualizado 2 semanas
                    </span>
                </div>
                <div className="col-span-2">Questions</div>
            </section>
        </ContainerUtil>
    );
}
