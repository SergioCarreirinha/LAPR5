"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const Result_1 = require("../../core/logic/Result");
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const PathID_1 = require("./ID/PathID");
class Path extends AggregateRoot_1.AggregateRoot {
    constructor(inter, id) {
        super(inter, id);
    }
    get pathID() {
        return PathID_1.PathID.create(this.id);
    }
    get id() {
        return this._id;
    }
    get description() {
        return this.props.description;
    }
    get isEmpty() {
        return this.props.isEmpty;
    }
    get totalDur() {
        return this.props.totalDur;
    }
    get totalDist() {
        return this.props.totalDist;
    }
    get segments() {
        return this.props.segments;
    }
    set description(value) {
        this.props.description = value;
    }
    static getTotalDur(segments) {
        var dur = 0;
        segments.forEach(element => {
            dur += element.duration;
        });
        return dur;
    }
    static getTotalDist(segments) {
        var dist = 0;
        segments.forEach(element => {
            dist += element.distance;
        });
        return dist;
    }
    static create(linePathsDTO, id) {
        const desc = linePathsDTO.description;
        const isEmpty = linePathsDTO.isEmpty;
        const segments = linePathsDTO.segments;
        const totalDur = this.getTotalDur(linePathsDTO.segments);
        const totalDist = this.getTotalDist(linePathsDTO.segments);
        if (!!desc === false || desc.length === 0) {
            return Result_1.Result.fail('Must provide a path description');
        }
        else {
            const path = new Path({ description: desc, isEmpty: isEmpty, segments: segments, totalDur: totalDur, totalDist: totalDist }, id);
            return Result_1.Result.ok(path);
        }
    }
}
exports.Path = Path;
//# sourceMappingURL=Path.js.map