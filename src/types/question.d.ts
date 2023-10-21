import { IQuestionCategory } from "./questionCategory";

export interface ICollectionQuestion {
    question: string;
    options: Array<string>;
    correct: number;
    description?: string;
    duration: number;
}

export interface ICollectionQuestionWithId extends ICollectionQuestion {
    _id: string;
}

export interface IQuestion extends Omit<ICollectionQuestion, "duration"> {
    category: IQuestionCategory;
    user: string;
    verified?: boolean;
}

export interface IQuestionId extends IQuestion {
    _id: string;
}
