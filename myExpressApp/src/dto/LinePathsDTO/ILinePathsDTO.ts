import { PathNode } from "../../domain/models/PathNode";

export default interface ILinePathsDTO {
    line: string,
    toGo: boolean,
    key: string,
    isEmpty: boolean,
    pathNodes: PathNode[]
}