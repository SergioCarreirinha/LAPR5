import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Node } from '../../domain/models/Node';

interface IPathSegment{
    duration : number;
    distance : number;
    startNode : Node;
    endNode : Node;
    sequence : number;
}

export class PathSegment extends ValueObject<IPathSegment>{
    

    private constructor(inter: IPathSegment){
        super(inter);
    }

    get duration(): number {
        return this.props.duration;
    }

    get distance(): number {
        return this.props.distance;
    }

    get startNode(): Node{
        return this.props.startNode;
    }

    get endNode(): Node{
        return this.props.endNode;
    }

    get sequence(): number {
        return this.props.sequence;
    }

    set duration(value: number){
        this.props.duration = value;
    }

    set distance(value: number) {
        this.props.distance = value;
    }

    set startNode(value: Node){
        this.props.startNode = value;
    }

    set endNode(value: Node){
        this.props.endNode = value;
    }

    set sequence(value: number){
        this.props.sequence = value;
    }

    static create(duration: number, distance: number, startNode: Node, endNode: Node, sequence: number): Result<PathSegment>{
        if(!!duration === false || duration == 0 || !!distance === false || distance== 0 || !!startNode === false || !!endNode === false || !!sequence === false || sequence == 0){
            return Result.fail<PathSegment>('Must valid segment info');
        }else{
            const pathSegment = new PathSegment({duration: duration, distance: distance, startNode: startNode, endNode: endNode, sequence: sequence});
            return Result.ok<PathSegment>(pathSegment)
        }
    
        return;
    }
}