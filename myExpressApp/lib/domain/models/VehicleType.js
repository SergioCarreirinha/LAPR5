"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = void 0;
const Result_1 = require("../../core/logic/Result");
class VehicleType {
    constructor(name, fuelType, range, costPerKm, avgConsumption, avgSpeed) {
        this._name = name;
        this._fuelType = fuelType;
        this._range = range;
        this._costPerKm = costPerKm;
        this._avgConsumption = avgConsumption;
        this._avgSpeed = avgSpeed;
    }
    get name() {
        return this._name;
    }
    get fuelType() {
        return this._fuelType;
    }
    get range() {
        return this._range;
    }
    get costPerKm() {
        return this._costPerKm;
    }
    get avgConsumption() {
        return this._avgConsumption;
    }
    get avgSpeed() {
        return this._avgSpeed;
    }
    set name(value) {
        this._name = value;
    }
    set fuelType(value) {
        this._fuelType = value;
    }
    set range(value) {
        this._range = value;
    }
    set costPerKm(value) {
        this._costPerKm = value;
    }
    set avgConsumption(value) {
        this._avgConsumption = value;
    }
    set avgSpeed(value) {
        this._avgSpeed = value;
    }
    static create(vehicleTypeDTO) {
        const name = vehicleTypeDTO.name;
        const fuelType = vehicleTypeDTO.fuelType;
        const range = vehicleTypeDTO.range;
        const costPerKm = vehicleTypeDTO.costPerKm;
        const avgConsumption = vehicleTypeDTO.avgConsumption;
        const avgSpeed = vehicleTypeDTO.avgSpeed;
        if (!!name === false || name.length === 0) {
            return Result_1.Result.fail('Must provide a role name');
        }
        else {
            const roleF = new VehicleType(name, fuelType, range, costPerKm, avgConsumption, avgSpeed);
            return Result_1.Result.ok(roleF);
        }
    }
}
exports.VehicleType = VehicleType;
