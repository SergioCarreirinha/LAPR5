"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = void 0;
const Result_1 = require("../../core/logic/Result");
class VehicleType {
    constructor(name, autonomy, cost, averageSpeed, energySource, consumption, emissions) {
        this._name = name;
        this._autonomy = autonomy;
        this._cost = cost;
        this._averageSpeed = averageSpeed;
        this._energySource = energySource;
        this._consumption = consumption;
        this._emissions = emissions;
    }
    get name() {
        return this._name;
    }
    get autonomy() {
        return this._autonomy;
    }
    get cost() {
        return this._cost;
    }
    get averageSpeed() {
        return this._averageSpeed;
    }
    get energySource() {
        return this._energySource;
    }
    get consumption() {
        return this._consumption;
    }
    get emissions() {
        return this._emissions;
    }
    set name(value) {
        this._name = value;
    }
    set autonomy(value) {
        this._autonomy = value;
    }
    set cost(value) {
        this._cost = value;
    }
    set averageSpeed(value) {
        this._averageSpeed = value;
    }
    set energySource(value) {
        this._energySource = value;
    }
    set consumption(value) {
        this._consumption = value;
    }
    set emissions(value) {
        this._emissions = value;
    }
    static create(vehicleTypeDTO) {
        const name = vehicleTypeDTO.name;
        const autonomy = vehicleTypeDTO.autonomy;
        const cost = vehicleTypeDTO.cost;
        const averageSpeed = vehicleTypeDTO.averageSpeed;
        const energySource = vehicleTypeDTO.energySource;
        const consumption = vehicleTypeDTO.consumption;
        const emissions = vehicleTypeDTO.emissions;
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a role name');
        }
        else {
            const roleF = new VehicleType(name, autonomy, cost, averageSpeed, energySource, consumption, emissions);
            return Result_1.Result.ok(roleF);
        }
    }
}
exports.VehicleType = VehicleType;
