import { PathSegment } from '../../domain/models/PathSegment';

export interface IPathPersistence {
    description: string,
    isEmpty: boolean,
    totalDur: Number,
    totalDist: Number,
    segments: PathSegment[]
}