import { INode } from './INode';

export interface IWorkBlock {
    key: string;
    startTime: Number;
    endTime: Number;
    startNode: Array<INode>;
    endNode: Array<INode>;
    isCrewTravelTime: boolean;
    isActive: boolean;
}