import { PathSegment } from "../../domain/models/PathSegment";

export default interface ILinePathsDTO {
    line: string,
    toGo: boolean,
    description: string,
    isEmpty: boolean,
    segments: PathSegment[]
}