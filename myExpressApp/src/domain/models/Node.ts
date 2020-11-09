import { Result } from '../../core/logic/Result';
import INodeDTO from "../../dto/NodeDTO/INodeDTO";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import {NodeID} from './ID/NodeID';

interface INode {
     key: string;
     name: string;
     latitude: Number;
     longitude: Number;
     shortName: string;
     isDepot: Boolean;
     isReliefPoint: Boolean;

}

export class Node extends AggregateRoot<INode>{

    private constructor(inter: INode, id?: UniqueEntityID) {
        super(inter,id);
    }

    get key(): string {
        return this.props.key;
    }

    get name(): string {
        return this.props.name;
    }

    get latitude(): Number {
        return this.props.latitude;
    }

    get longitude(): Number {
        return this.props.longitude;
    }

    get shortName(): string {
        return this.props.shortName;
    }

    get isDepot(): Boolean {
        return this.props.isDepot;
    }

    get isReliefPoint(): Boolean {
        return this.props.isReliefPoint;
    }
    
    get id(): UniqueEntityID {
        return this._id;
    }

    get nodeID() : NodeID {
        return NodeID.create(this.id);
    }

    set key(value: string) {
        this.props.key = value;
    }

    set name(value: string) {
        this.props.name = value;
    }

    set latitude(value: Number) {
        this.props.latitude = value;
    }

    set longitude(value: Number) {
        this.props.longitude = value;
    }

    set shortName(value: string) {
        this.props.shortName = value;
    }

    set isDepot(value: Boolean) {
        this.props.isDepot = value;
    }

    set isReliefPoint(value: Boolean) {
        this.props.isReliefPoint = value;
    }

    static create(NodeDTO: INodeDTO, id?: UniqueEntityID): Result<Node> {
        const key = NodeDTO.key;
        const name = NodeDTO.name;
        const latitude = NodeDTO.latitude;
        const longitude = NodeDTO.longitude;
        const shortName = NodeDTO.shortName;
        const isDepot = NodeDTO.isDepot;
        const isReliefPoint = NodeDTO.isReliefPoint;

        if (!!key === false || key.length === 0) {
            return Result.fail<Node>('Must provide a key')
        } else {
            const roleF = new Node({key:key, name:name, latitude:latitude, longitude:longitude, shortName:shortName, isDepot:isDepot, isReliefPoint:isReliefPoint},id);
            return Result.ok<Node>( roleF );
        }
    }
}