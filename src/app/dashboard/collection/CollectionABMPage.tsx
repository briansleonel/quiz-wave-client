import { useParams } from "react-router-dom";
import ContainerUtil from "../../../components/Layout/ContainerUtil";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import collectionService from "../../../services/collection.service";
import CollectionForm from "../../../components/Forms/CollectionForm/CollectionForm";
import AlertDanger from "../../../components/Alerts/Alert";
import Loader from "../../../components/Loader/Loader";

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
                <div className="h-36">
                    <Loader style="black" />
                </div>
            ) : data && edit ? (
                <CollectionForm edit={edit} collection={data.data} />
            ) : null}
        </ContainerUtil>
    );
}
