import { IQuestionId } from "./question";

export interface ICollection {
    name: string;
    description: string;
    questions: Array<ICollectionQuestion>;
}

export interface ICollectionWithId extends ICollection {
    _id: string;
}

interface ICollectionQuestion {
    question: IQuestionId;
    duration: number;
}
