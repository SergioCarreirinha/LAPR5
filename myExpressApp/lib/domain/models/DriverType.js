"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverType = void 0;
const Result_1 = require("../../core/logic/Result");
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const DriverTypeID_1 = require("./ID/DriverTypeID");
class DriverType extends AggregateRoot_1.AggregateRoot {
    constructor(inter, id) {
        super(inter, id);
    }
    get driverTypeID() {
        return DriverTypeID_1.DriverTypeID.create(this.id);
    }
    get id() {
        return this._id;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    static create(driverTypeDTO, id) {
        const description = driverTypeDTO.description;
        if (!!description === false || description.length === 0) {
            return Result_1.Result.fail('Must provide a description');
        }
        else {
            const roleF = new DriverType({ description: description }, id);
            return Result_1.Result.ok(roleF);
        }
    }
}
exports.DriverType = DriverType;
//# sourceMappingURL=DriverType.js.map