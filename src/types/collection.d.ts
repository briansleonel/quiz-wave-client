import { ICollectionQuestionWithId } from "./question";

export interface ICollection {
    name: string;
    description: string;
    questions: Array<ICollectionQuestionWithId>;
    user?: string;
}

export interface ICollectionWithId extends ICollection {
    _id: string;
}

interface ICollectionWithUpdatedAt extends ICollectionWithId {
    updatedAt: string;
}
