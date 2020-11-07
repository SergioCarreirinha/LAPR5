"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleType = void 0;
class VehicleType {
    constructor(name) {
        if (name == null)
            throw new Error("Error creating VehicleType");
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    static create(vehicleTypeDTO) {
        return new VehicleType(vehicleTypeDTO.name);
    }
}
exports.VehicleType = VehicleType;
