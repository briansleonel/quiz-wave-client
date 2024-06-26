import {
    IQuestion,
    IQuestionCategoryString,
    IQuestionId,
    IQuestionIdCategoryString,
} from "../types/question";
import { IQuestionCategory } from "../types/questionCategory";
import { loadStateAuthLocalStorage } from "./state.localstorage";

export function convertToQuestion({
    category,
    correctOption,
    options,
    question,
    description,
    user,
}: {
    category: IQuestionCategory;
    question: string;
    options: Array<string>;
    correctOption: string;
    description: string;
    user?: string;
}) {
    const newQuestion: IQuestionCategoryString = {
        category: category._id,
        question: question,
        description: description,
        options: orderOptions(options, correctOption),
        correct: 0,
        user: user ? user : loadStateAuthLocalStorage()!._id,
    };

    return newQuestion;
}

export function convertToQuestionwithId({
    id,
    category,
    correctOption,
    options,
    question,
    description,
    user,
}: {
    id: string;
    category: IQuestionCategory;
    question: string;
    options: Array<string>;
    correctOption: string;
    description: string;
    user: string;
}) {
    const newQuestion: IQuestionIdCategoryString = {
        _id: id,
        category: category._id,
        question: question,
        description: description,
        options: orderOptions(options, correctOption),
        correct: 0,
        user: user,
    };

    return newQuestion;
}

export function orderOptions(options: Array<string>, correct: string) {
    const ordered = [correct];
    const othersOptions = options.filter((opt) => opt !== correct);
    ordered.push(...othersOptions);
    return ordered;
}
