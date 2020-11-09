import { Result } from '../../core/logic/Result';
import INodeDTO from "../../dto/NodeDTO/INodeDTO";

export class Node {

    private _key: String;
    private _name: String;
    private _latitude: Number;
    private _longitude: Number;
    private _shortName: String;
    private _isDepot: Boolean;
    private _isReliefPoint: Boolean;


    protected constructor(key: String, name: String, latitude: Number, longitude: Number, shortName: String, isDepot: Boolean, isReliefPoint: Boolean) {
        this._key = key;
        this._name = name;
        this._latitude = latitude;
        this._longitude = longitude;
        this._shortName = shortName;
        this._isDepot = isDepot;
        this._isReliefPoint = isReliefPoint;
    }

    get key(): String {
        return this._key;
    }

    get name(): String {
        return this._name;
    }

    get latitude(): Number {
        return this._latitude;
    }

    get longitude(): Number {
        return this._longitude;
    }

    get shortName(): String {
        return this._shortName;
    }

    get isDepot(): Boolean {
        return this._isDepot;
    }

    get isReliefPoint(): Boolean {
        return this._isReliefPoint;
    }
    
    set key(value: String) {
        this._key = value;
    }

    set name(value: String) {
        this._name = value;
    }

    set latitude(value: Number) {
        this._latitude = value;
    }

    set longitude(value: Number) {
        this._longitude = value;
    }

    set shortName(value: String) {
        this._shortName = value;
    }

    set isDepot(value: Boolean) {
        this._isDepot = value;
    }

    set isReliefPoint(value: Boolean) {
        this._isReliefPoint = value;
    }

    static create(NodeDTO: INodeDTO): Result<Node> {
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
            const roleF = new Node(key, name, latitude, longitude, shortName, isDepot, isReliefPoint);
            return Result.ok<Node>( roleF );
        }
    }
}