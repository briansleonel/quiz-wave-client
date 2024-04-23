import { useMutation, useQueryClient } from "@tanstack/react-query";
import questionService from "../../services/question.service";
import { toastError, toastSuccess } from "../../components/Sonner/sonner.toast";
import { useNavigate } from "react-router-dom";
import {
    IQuestionCategoryString,
    IQuestionIdCategoryString,
} from "../../types/question";

const PATH_NAVIGATION = "/dashboard/question/";

export function useDeleteQuestionMutation() {
    const queryClient = useQueryClient();

    const deleteQuestionMutation = useMutation({
        mutationFn: questionService.deleteQuestion,
        onSuccess: (data) => {
            toastSuccess(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return deleteQuestionMutation;
}

export function useChangeVerificationQuestion() {
    const queryClient = useQueryClient();

    const changeVerifiedQuestionMutation = useMutation({
        mutationFn: questionService.changeVerification,
        onSuccess: (data) => {
            toastSuccess(data.message);
            // Actualizar los datos después de eliminar un usuario
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return changeVerifiedQuestionMutation;
}

export function useUpdateQuestionMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const updateQuestionMutation = useMutation({
        mutationFn: questionService.updateQuestion,

        onSuccess: (data) => {
            navigate(PATH_NAVIGATION);
            toastSuccess(data.message as string);
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return updateQuestionMutation;
}

export function useAddQuestionMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const addQuestionMutation = useMutation({
        mutationFn: questionService.addQuestion,

        onSuccess: (data) => {
            navigate(PATH_NAVIGATION);
            toastSuccess(data.message as string);
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: (err) => {
            if (err instanceof Error) {
                toastError(err.message);
            }
        },
    });

    return addQuestionMutation;
}

export function useQuestion() {
    // Mutations
    const updateMutation = useUpdateQuestionMutation();
    const addMutation = useAddQuestionMutation();

    async function handlerUpdateQuestion(
        questionUpdate: IQuestionIdCategoryString
    ) {
        await updateMutation.mutateAsync(questionUpdate);
    }

    async function handlerAddQuestion(question: IQuestionCategoryString) {
        await addMutation.mutateAsync(question);
    }

    return { handlerAddQuestion, handlerUpdateQuestion };
}
