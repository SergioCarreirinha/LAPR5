"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverTypeID = void 0;
const Entity_1 = require("../../../core/domain/Entity");
class DriverTypeID extends Entity_1.Entity {
    get id() {
        return this._id;
    }
    static create(id) {
        return new DriverTypeID(id);
    }
}
exports.DriverTypeID = DriverTypeID;
//# sourceMappingURL=DriverTypeID.js.map