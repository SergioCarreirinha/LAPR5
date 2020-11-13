"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathSegment = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
class PathSegment extends ValueObject_1.ValueObject {
    constructor(inter) {
        super(inter);
    }
    get duration() {
        return this.props.duration;
    }
    get distance() {
        return this.props.distance;
    }
    get startNode() {
        return this.props.startNode;
    }
    get endNode() {
        return this.props.endNode;
    }
    get sequence() {
        return this.props.sequence;
    }
    set duration(value) {
        this.props.duration = value;
    }
    set distance(value) {
        this.props.distance = value;
    }
    set startNode(value) {
        this.props.startNode = value;
    }
    set endNode(value) {
        this.props.endNode = value;
    }
    set sequence(value) {
        this.props.sequence = value;
    }
    static create(duration, distance, startNode, endNode, sequence) {
        if (!!duration === false || duration == 0 || !!distance === false || distance == 0 || !!startNode === false || !!endNode === false || !!sequence === false || sequence == 0) {
            return Result_1.Result.fail('Must valid segment info');
        }
        else {
            const pathSegment = new PathSegment({ duration: duration, distance: distance, startNode: startNode, endNode: endNode, sequence: sequence });
            return Result_1.Result.ok(pathSegment);
        }
        return;
    }
}
exports.PathSegment = PathSegment;
