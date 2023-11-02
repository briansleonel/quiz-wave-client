import { useMutation, useQueryClient } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";
import { toastError, toastSuccess } from "../../components/Sonner/sonner.toast";

export function useCreateCollection() {
    const { mutate: createCollection } = useMutation({
        mutationFn: collectionService.addCollection,

        onSuccess: (data) => {
            toastSuccess(data.message as string);
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            } else {
                toastError(err as string);
            }
        },
    });

    return { createCollection };
}

export function useUpdateCollection() {
    const queryClient = useQueryClient();
    const { mutate: updateCollection } = useMutation({
        mutationFn: collectionService.updateCollection,

        onSuccess: (data) => {
            toastSuccess(data.message as string);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["collections"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            } else {
                toastError(err as string);
            }
        },
    });

    return { updateCollection };
}
