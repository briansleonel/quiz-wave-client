import ContainerUtil from "../../../components/Layout/ContainerUtil";
import CollectionCard from "../../../components/Cards/CollectionCard";
import { useQuery } from "@tanstack/react-query";
import collectionService from "../../../services/collection.service";
import AlertDanger from "../../../components/Alerts/Alert";
import { useEffect, useState } from "react";
import { ApiPagination } from "../../../types/api";

export default function CollectionPage() {
    // datos de paginación recibidos por la api
    const [pagination, setPagination] = useState<ApiPagination>();

    // react-query para la obtención de datos desde la api
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ["collections", pagination],
        queryFn: () =>
            collectionService.getCollectionsPagination({
                limit: pagination?.limit || 10,
                page: pagination?.page || 1,
            }),
    });

    return (
        <>
            <ContainerUtil>
                {error && error instanceof Error ? (
                    <AlertDanger>Error: {error.message}</AlertDanger>
                ) : isLoading ? (
                    <div>Caargando...</div>
                ) : data ? (
                    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {data.data.map((collection) => (
                            <CollectionCard
                                key={collection._id}
                                collection={collection}
                            />
                        ))}
                    </section>
                ) : null}
            </ContainerUtil>
        </>
    );
}
