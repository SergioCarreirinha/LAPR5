import ILinePathsDTO from "../../dto/LinePathsDTO/ILinePathsDTO";
import { Result } from '../../core/logic/Result';
import { PathSegment } from './PathSegment';
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Node } from '../../domain/models/Node';
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { PathID } from "./ID/PathID";


interface IPath{
    description : string;
    isEmpty : boolean;
    segments : PathSegment[];
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

    get description(): string {
        return this.props.description;
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

    get segments(): PathSegment[] {
        return this.props.segments;
    }

    set description(value: string) {
        this.props.description=value;
    }

    private static getTotalDur(segments: PathSegment[]): Number {
        var dur;
        segments.forEach(element => {
            dur += element.duration;
        });
        return dur;
    }

    private static getTotalDist(segments: PathSegment[]): Number {
        var dist;
        segments.forEach(element => {
            dist += element.distance;
        });
        return dist;
    }

    public static create (linePathsDTO: ILinePathsDTO, id?: UniqueEntityID): Result<Path> {
        const desc = linePathsDTO.description;
        const isEmpty = linePathsDTO.isEmpty;
        const segments = linePathsDTO.segments;
        const totalDur = this.getTotalDur(linePathsDTO.segments);
        const totalDist = this.getTotalDist(linePathsDTO.segments);

        if(!!desc === false || desc.length === 0){
            return Result.fail<Path>('Must provide a path description');
        }else{
            const path = new Path({description: desc, isEmpty: isEmpty, segments: segments, totalDur: totalDur, totalDist: totalDist},id);
            return Result.ok<Path>(path)
        }
        
    }

}