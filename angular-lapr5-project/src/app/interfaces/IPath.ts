export interface IPath {
    line: string;
    key : string;
    toGo : boolean
    isEmpty : boolean;
    pathNodes : any[][];
    totalDur : number,
    totalDist : number
}