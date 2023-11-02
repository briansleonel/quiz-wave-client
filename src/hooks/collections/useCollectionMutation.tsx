import { useMutation } from "@tanstack/react-query";
import collectionService from "../../services/collection.service";
import { toastError, toastSuccess } from "../../components/Sonner/sonner.toast";

export function useCreateCollection() {
    const { mutate: createCollection } = useMutation({
        mutationFn: collectionService.addCollection,

        onSuccess: (data) => {
            toastSuccess(data.message as string);
            //queryClient.invalidateQueries({ queryKey: ["collection"] });
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
