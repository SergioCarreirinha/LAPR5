import ILinePathsDTO from "../../dto/LinePathsDTO/ILinePathsDTO";
import { Result } from '../../core/logic/Result';
import { PathNode } from './PathNode';
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { PathID } from "./ID/PathID";
import { ElementFlags } from "typescript";


interface IPath{
    key : string;
    isEmpty : boolean;
    pathNodes : PathNode[];
    totalDur : Number;
    totalDist : Number;
}

export class Path extends AggregateRoot<IPath>{

    private constructor(inter: IPath, id?: UniqueEntityID){
        super(inter,id);
    }

    get pathID(): PathID {
        return PathID.create(this.id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get key(): string {
        return this.props.key;
    }

    get isEmpty(): boolean {
        return this.props.isEmpty;
    }

    get totalDur(): Number {
        return this.props.totalDur;
    }

    get totalDist(): Number {
        return this.props.totalDist;
    }

    get pathNodes(): PathNode[] {
        return this.props.pathNodes;
    }

    set key(value: string) {
        this.props.key=value;
    }

    private static getTotalDur(segments: PathNode[]): number {
        var dur = 0;
        for(var i=0;i<segments.length;i++){
            dur+=segments[i].duration;
        }
        return dur;
    }

    private static getTotalDist(segments: PathNode[]): number {
        var dist = 0;
        for(var i=0;i<segments.length;i++){
            dist+=segments[i].distance;
        }
        return dist;
    }

    public static create (linePathsDTO: ILinePathsDTO, id?: UniqueEntityID): Result<Path> {
        const key = linePathsDTO.key;
        const isEmpty = linePathsDTO.isEmpty;
        const pathNodes = linePathsDTO.pathNodes;
        const totalDur = this.getTotalDur(linePathsDTO.pathNodes);
        const totalDist = this.getTotalDist(linePathsDTO.pathNodes);

        if(!!key === false || key.length === 0){
            return Result.fail<Path>('Must provide a path key');
        }else{
            const path = new Path({key: key, isEmpty: isEmpty, pathNodes: pathNodes, totalDur: totalDur, totalDist: totalDist},id);
            return Result.ok<Path>(path)
        }
        
    }

}