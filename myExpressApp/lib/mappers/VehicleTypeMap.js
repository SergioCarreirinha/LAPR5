"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleTypeMap = void 0;
class VehicleTypeMap {
    static toDTO(vehicleType) {
        return {
            name: vehicleType.name
        };
    }
}
exports.VehicleTypeMap = VehicleTypeMap;
