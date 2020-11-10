"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const Result_1 = require("../../core/logic/Result");
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const LineID_1 = require("./ID/LineID");
class Line extends AggregateRoot_1.AggregateRoot {
    constructor(inter, id) {
        super(inter, id);
    }
    //GETS
    get lineID() {
        return LineID_1.LineID.create(this.id);
    }
    get id() {
        return this._id;
    }
    get name() {
        return this.props.name;
    }
    get code() {
        return this.props.code;
    }
    get goPath() {
        return this.props.goPath;
    }
    get returnPath() {
        return this.props.returnPath;
    }
    get emptyPaths() {
        return this.props.emptyPaths;
    }
    get endNodes() {
        return this.props.endNodes;
    }
    get allowedVehicles() {
        return this.props.allowedVehicles;
    }
    get allowedDrivers() {
        return this.props.allowedDrivers;
    }
    //SETS
    set name(value) {
        this.props.name = value;
    }
    set code(value) {
        this.props.code = value;
    }
    set goPath(value) {
        this.props.goPath = value;
    }
    set returnPath(value) {
        this.props.returnPath = value;
    }
    set emptyPaths(value) {
        this.props.emptyPaths = value;
    }
    set endNodes(value) {
        this.props.endNodes = value;
    }
    set allowedVehicles(value) {
        this.props.allowedVehicles = value;
    }
    set allowedDrivers(value) {
        this.props.allowedDrivers = value;
    }
    static create(lineDto, id) {
        const name = lineDto.name;
        const code = lineDto.code;
        const goPath = lineDto.goPath;
        const returnPath = lineDto.returnPath;
        const emptyPaths = lineDto.emptyPaths;
        const endNodes = lineDto.endNodes;
        const allowedVehicles = lineDto.allowedVehicles;
        const allowedDrivers = lineDto.allowedDrivers;
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a description');
        }
        else {
            const roleF = new Line({ name: name, code: code, goPath: goPath, returnPath: returnPath, emptyPaths: emptyPaths, endNodes: endNodes, allowedVehicles: allowedVehicles, allowedDrivers: allowedDrivers }, id);
            return Result_1.Result.ok(roleF);
        }
    }
}
exports.Line = Line;
