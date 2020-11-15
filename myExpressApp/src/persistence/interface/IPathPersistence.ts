import { PathNode } from '../../domain/models/PathNode';

export interface IPathPersistence {
    key: string,
    isEmpty: boolean,
    pathNodes: PathNode[],
    totalDur: Number,
    totalDist: Number
}