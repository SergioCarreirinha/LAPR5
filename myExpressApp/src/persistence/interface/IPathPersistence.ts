import { Node } from '../../domain/models/Node';
import { PathSegment } from '../../domain/models/PathSegment';

export interface IPathPersistence {
    description: string,
    isEmpty: boolean,
    startNode: Node,
    endNode: Node,
    totalDur: Number,
    totalDist: Number,
    segments: PathSegment[]
}