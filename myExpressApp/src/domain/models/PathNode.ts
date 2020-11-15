import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Node } from './Node';

interface IPathNode{
    key: string;
    node: Node;
    duration: number;
    distance: number;   
}

export class PathNode extends ValueObject<IPathNode>{
    

    private constructor(inter: IPathNode){
        super(inter);
    }

    get key(): string{
        return this.props.key;
    }

    get node(): Node{
        return this.props.node;
    }

    get duration(): number {
        return this.props.duration;
    }

    get distance(): number {
        return this.props.distance;
    }

    set node(value: Node){
        this.props.node = value;
    }

    set duration(value: number){
        this.props.duration = value;
    }

    set distance(value: number) {
        this.props.distance = value;
    }

    static create(key: string, node: Node,duration: number, distance: number): Result<PathNode>{
        if(!!key === false || !!node === false ||
           !!duration === false || duration == 0 ||
           !!distance === false || distance == 0   
           ){
            return Result.fail<PathNode>('Must valid segment info');
        }else{
            const pathNode = new PathNode({key: key, node : node, duration: duration, distance: distance});
            return Result.ok<PathNode>(pathNode)
        }
    }
}