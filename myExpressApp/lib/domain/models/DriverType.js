"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverType = void 0;
const Result_1 = require("../../core/logic/Result");
class DriverType {
    constructor(description) {
        this._description = description;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    static create(driverTypeDTO) {
        const description = driverTypeDTO.description;
        if (!!description === false || description.length === 0) {
            return Result_1.Result.fail('Must provide a description');
        }
        else {
            const roleF = new DriverType(description);
            return Result_1.Result.ok(roleF);
        }
    }
}
exports.DriverType = DriverType;
