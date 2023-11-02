import { ICollectionQuestion } from "./question";

export interface ICollection {
    name: string;
    description: string;
    questions: Array<ICollectionQuestion>;
    user?: string;
}

export interface ICollectionWithId extends ICollection {
    _id: string;
}

interface ICollectionWithUpdatedAt extends ICollectionWithId {
    updatedAt: string;
}
