"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Result_1 = require("../../core/logic/Result");
class Node {
    constructor(key, name, latitude, longitude, shortName, isDepot, isReliefPoint) {
        this._key = key;
        this._name = name;
        this._latitude = latitude;
        this._longitude = longitude;
        this._shortName = shortName;
        this._isDepot = isDepot;
        this._isReliefPoint = isReliefPoint;
    }
    get key() {
        return this._key;
    }
    get name() {
        return this._name;
    }
    get latitude() {
        return this._latitude;
    }
    get longitude() {
        return this._longitude;
    }
    get shortName() {
        return this._shortName;
    }
    get isDepot() {
        return this._isDepot;
    }
    get isReliefPoint() {
        return this._isReliefPoint;
    }
    set key(value) {
        this._key = value;
    }
    set name(value) {
        this._name = value;
    }
    set latitude(value) {
        this._latitude = value;
    }
    set longitude(value) {
        this._longitude = value;
    }
    set shortName(value) {
        this._shortName = value;
    }
    set isDepot(value) {
        this._isDepot = value;
    }
    set isReliefPoint(value) {
        this._isReliefPoint = value;
    }
    static create(NodeDTO) {
        const key = NodeDTO.key;
        const name = NodeDTO.name;
        const latitude = NodeDTO.latitude;
        const longitude = NodeDTO.longitude;
        const shortName = NodeDTO.shortName;
        const isDepot = NodeDTO.isDepot;
        const isReliefPoint = NodeDTO.isReliefPoint;
        if (!!key === false || key.length === 0) {
            return Result_1.Result.fail('Must provide a key');
        }
        else {
            const roleF = new Node(key, name, latitude, longitude, shortName, isDepot, isReliefPoint);
            return Result_1.Result.ok(roleF);
        }
    }
}
exports.Node = Node;
