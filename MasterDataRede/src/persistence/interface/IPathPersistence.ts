import { PathNode } from '../../domain/models/PathNode';

export interface IPathPersistence {
    domainId: string,
    key: string,
    isEmpty: boolean,
    pathNodes: PathNode[],
    totalDur: Number,
    totalDist: Number
}