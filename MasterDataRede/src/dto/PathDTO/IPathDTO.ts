import { PathNode } from "../../domain/models/PathNode";

export interface IPathDTO {
    key : string;
    isEmpty : boolean;
    pathNodes : PathNode[];
    totalDur : Number;
    totalDist : Number;
}
