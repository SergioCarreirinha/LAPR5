import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Node } from '../../domain/models/Node';

interface IPathSegment{
    duration : Number;
    distance : Number;
    startNode : Node;
    endNode : Node;
    sequence : Number;
}

export class PathSegment extends ValueObject<IPathSegment>{
    

    private constructor(inter: IPathSegment){
        super(inter);
    }

    get duration(): Number {
        return this.props.duration;
    }

    get distance(): Number {
        return this.props.distance;
    }

    get startNode(): Node{
        return this.props.startNode;
    }

    get endNode(): Node{
        return this.props.endNode;
    }

    get sequence(): Number {
        return this.props.sequence;
    }

    set duration(value: Number){
        this.props.duration = value;
    }

    set distance(value: Number) {
        this.props.distance = value;
    }

    set startNode(value: Node){
        this.props.startNode = value;
    }

    set endNode(value: Node){
        this.props.endNode = value;
    }

    set sequence(value: Number){
        this.props.sequence = value;
    }

    static create(duration: Number, distance: Number, startNode: Node, endNode: Node, sequence: Number): Result<PathSegment>{
        
        if(!!duration === false || duration == 0 || !!distance === false || distance== 0 || !!startNode === false || !!endNode === false || !!sequence === false || sequence == 0){
            return Result.fail<PathSegment>('Must valid segment info');
        }else{
            const pathSegment = new PathSegment({duration: duration, distance: distance, startNode: startNode, endNode: endNode, sequence: sequence});
            return Result.ok<PathSegment>(pathSegment)
        }
    
        return;
    }
}