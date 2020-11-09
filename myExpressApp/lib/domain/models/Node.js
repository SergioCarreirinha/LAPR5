"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Result_1 = require("../../core/logic/Result");
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const NodeID_1 = require("./ID/NodeID");
class Node extends AggregateRoot_1.AggregateRoot {
    constructor(inter, id) {
        super(inter, id);
    }
    get key() {
        return this.props.key;
    }
    get name() {
        return this.props.name;
    }
    get latitude() {
        return this.props.latitude;
    }
    get longitude() {
        return this.props.longitude;
    }
    get shortName() {
        return this.props.shortName;
    }
    get isDepot() {
        return this.props.isDepot;
    }
    get isReliefPoint() {
        return this.props.isReliefPoint;
    }
    get id() {
        return this._id;
    }
    get nodeID() {
        return NodeID_1.NodeID.create(this.id);
    }
    set key(value) {
        this.props.key = value;
    }
    set name(value) {
        this.props.name = value;
    }
    set latitude(value) {
        this.props.latitude = value;
    }
    set longitude(value) {
        this.props.longitude = value;
    }
    set shortName(value) {
        this.props.shortName = value;
    }
    set isDepot(value) {
        this.props.isDepot = value;
    }
    set isReliefPoint(value) {
        this.props.isReliefPoint = value;
    }
    static make(NodeDTO, id) {
        const key = NodeDTO.key;
        const name = NodeDTO.name;
        const latitude = NodeDTO.latitude;
        const longitude = NodeDTO.longitude;
        const shortName = NodeDTO.shortName;
        const isDepot = NodeDTO.isDepot;
        const isReliefPoint = NodeDTO.isReliefPoint;
        if (!!key === false || key.length === 0) {
            console.log("ISTO DEVIA DAR ERRO");
            return Result_1.Result.fail('Must provide a key');
        }
        else {
            const roleF = new Node({ key: key, name: name, latitude: latitude, longitude: longitude, shortName: shortName, isDepot: isDepot, isReliefPoint: isReliefPoint }, id);
            return Result_1.Result.ok(roleF);
        }
    }
}
exports.Node = Node;
