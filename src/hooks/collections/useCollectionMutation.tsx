import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import collectionService from "../../services/collection.service";
import { toastError, toastSuccess } from "../../components/Sonner/sonner.toast";

const PATH_NAVIGATION = "/dashboard/collection/";

export function useAddCollectionMutation() {
    const navigate = useNavigate();

    const addCollectionMutation = useMutation({
        mutationFn: collectionService.addCollection,

        onSuccess: (data) => {
            navigate(PATH_NAVIGATION);
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

    return addCollectionMutation;
}
