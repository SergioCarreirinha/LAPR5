"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = void 0;
const Result_1 = require("../../core/logic/Result");
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const VehicleTypeID_1 = require("./ID/VehicleTypeID");
class VehicleType extends AggregateRoot_1.AggregateRoot {
    constructor(inter, id) {
        super(inter, id);
    }
    get key() {
        return this.props.key;
    }
    get name() {
        return this.props.name;
    }
    get autonomy() {
        return this.props.autonomy;
    }
    get cost() {
        return this.props.cost;
    }
    get averageSpeed() {
        return this.props.averageSpeed;
    }
    get energySource() {
        return this.props.energySource;
    }
    get consumption() {
        return this.props.consumption;
    }
    get emissions() {
        return this.props.emissions;
    }
    get id() {
        return this._id;
    }
    get vehicleID() {
        return VehicleTypeID_1.VehicleID.create(this.id);
    }
    set key(value) {
        this.props.key = value;
    }
    set name(value) {
        this.props.name = value;
    }
    set autonomy(value) {
        this.props.autonomy = value;
    }
    set cost(value) {
        this.props.cost = value;
    }
    set averageSpeed(value) {
        this.props.averageSpeed = value;
    }
    set energySource(value) {
        this.props.energySource = value;
    }
    set consumption(value) {
        this.props.consumption = value;
    }
    set emissions(value) {
        this.props.emissions = value;
    }
    static create(vehicleTypeDTO, id) {
        const key = vehicleTypeDTO.key;
        const name = vehicleTypeDTO.name;
        const autonomy = vehicleTypeDTO.autonomy;
        const cost = vehicleTypeDTO.cost;
        const averageSpeed = vehicleTypeDTO.averageSpeed;
        const energySource = vehicleTypeDTO.energySource;
        const consumption = vehicleTypeDTO.consumption;
        const emissions = vehicleTypeDTO.emissions;
        if (!!key === false || key.length === 0) {
            return Result_1.Result.fail('Must provide a key');
        }
        else if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a name');
        }
        else if (!!autonomy === false || autonomy < 0) {
            return Result_1.Result.fail('Must provide a valid autonomy');
        }
        else if (!!cost === false || cost < 0) {
            return Result_1.Result.fail('Must provide a valid cost');
        }
        else if (!!averageSpeed === false || averageSpeed < 0) {
            return Result_1.Result.fail('Must provide a valid averageSpeed');
        }
        else if (!!energySource === false || energySource < 0) {
            return Result_1.Result.fail('Must provide a valid energySource');
        }
        else if (!!consumption === false || consumption < 0) {
            return Result_1.Result.fail('Must provide a valid consumption');
        }
        else if (!!emissions === false || emissions < 0) {
            return Result_1.Result.fail('Must provide a valid emission rate');
        }
        else {
            const roleF = new VehicleType({ key: key, name: name, autonomy: autonomy, cost: cost, averageSpeed: averageSpeed, energySource: energySource, consumption: consumption, emissions: emissions }, id);
            return Result_1.Result.ok(roleF);
        }
    }
}
exports.VehicleType = VehicleType;
