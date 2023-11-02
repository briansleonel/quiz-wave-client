import { useParams } from "react-router-dom";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import { useState, useEffect } from "react";
import { ICollectionWithUpdatedAt } from "../../../types/collection";
import { ICollectionQuestionWithId } from "../../../types/question";
import { useQuery } from "@tanstack/react-query";
import collectionService from "../../../services/collection.service";
import CollectionForm from "../../../components/Forms/CollectionForm/CollectionForm";
import AlertDanger from "../../../components/Alerts/Alert";

export default function CollectionABMPage() {
    const params = useParams<{ id: string }>();

    // Verificar si se va a editar una collection o no
    const [edit, setEdit] = useState<boolean>(params.id !== "new");

    // react-query para la obtención de datos desde la api
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ["collection"],
        queryFn: () => collectionService.getCollection(params.id!),
        enabled: edit,
        cacheTime: 0,
    });

    return (
        <ContainerUtil>
            {!edit ? (
                <CollectionForm edit={edit} />
            ) : error && error instanceof Error ? (
                <AlertDanger>Error: {error.message}</AlertDanger>
            ) : isLoading ? (
                <p>Cargando datos...</p>
            ) : data && edit ? (
                <CollectionForm edit={edit} collection={data.data} />
            ) : null}
        </ContainerUtil>
    );
}
