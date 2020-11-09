"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = void 0;
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
class Line extends AggregateRoot_1.AggregateRoot {
    constructor(inter, id) {
        super(inter, id);
    }
    get id() {
        return this._id;
    }
}
exports.Line = Line;
