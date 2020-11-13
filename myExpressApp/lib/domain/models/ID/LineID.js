"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineID = void 0;
const Entity_1 = require("../../../core/domain/Entity");
class LineID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new LineID(id);
    }
}
exports.LineID = LineID;
//# sourceMappingURL=LineID.js.map