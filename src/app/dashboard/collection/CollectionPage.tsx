import ContainerUtil from "../../../components/Layout/ContainerUtil";
import CollectionCard from "../../../components/Cards/CollectionCard";
import { useQuery } from "@tanstack/react-query";
import collectionService from "../../../services/collection.service";
import AlertDanger from "../../../components/Alerts/Alert";
import { useState, useEffect } from "react";
import { ApiPagination } from "../../../types/api";
import { Title } from "../../../components/Layout/TitleSubtitle";
import Pagination from "../../../components/Table/Pagination";
import FiltersCollection from "../../../components/Filter/FiltersCollection";
import { useAppSelector } from "../../../store/hooks.redux";
import Loader from "../../../components/Loader/Loader";

export default function CollectionPage() {
    const collectionFilters = useAppSelector(
        (state) => state.collectionFilters
    );

    // datos de paginación recibidos por la api
    const [pagination, setPagination] = useState<ApiPagination>();

    // react-query para la obtención de datos desde la api
    const { data, isLoading, error, isFetching } = useQuery({
        queryKey: ["collections", pagination, collectionFilters],
        queryFn: () =>
            collectionService.getCollectionsPagination({
                limit: pagination?.limit || 10,
                page: pagination?.page || 1,
                searchText: collectionFilters.searchText,
                recents: collectionFilters.recents,
                user: collectionFilters.user,
            }),
        keepPreviousData: true,
    });

    /**
     * Hook para controlar el momento en el que se reciben los datos y establecer los datos de paginación
     */
    useEffect(() => {
        if (data) {
            setPagination(data.pagination);
        }
    }, [data]);

    return (
        <>
            <ContainerUtil>
                <Title>Colecciones</Title>
                <FiltersCollection />
                {error && error instanceof Error ? (
                    <AlertDanger>Error: {error.message}</AlertDanger>
                ) : isLoading ? (
                    <div className="h-36">
                        <Loader style="black" />
                    </div>
                ) : data && pagination ? (
                    <>
                        {data.data.length > 0 ? (
                            <>
                                <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    {data.data.map((collection) => (
                                        <CollectionCard
                                            key={collection._id}
                                            collection={collection}
                                        />
                                    ))}
                                </section>

                                <Pagination
                                    pagination={pagination}
                                    setPagination={setPagination}
                                />
                            </>
                        ) : (
                            <span className="text-neutral-500 uppercase">
                                No se encontraron resultados
                            </span>
                        )}
                    </>
                ) : null}
            </ContainerUtil>
        </>
    );
}
