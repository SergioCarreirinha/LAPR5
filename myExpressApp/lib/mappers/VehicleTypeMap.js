"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleTypeMap = void 0;
const VehicleType_1 = require("../domain/models/VehicleType");
class VehicleTypeMap {
    static toDTO(vehicleType) {
        return {
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            cost: vehicleType.cost,
            averageSpeed: vehicleType.averageSpeed,
            energySource: vehicleType.energySource,
            consumption: vehicleType.consumption,
            emissions: vehicleType.emissions,
        };
    }
    static toDomain(vehicleType) {
        const vehicleTypeOrError = VehicleType_1.VehicleType.create(vehicleType);
        vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError.error) : '';
        return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
    }
    static toPersistence(vehicleType) {
        return {
            name: vehicleType.name,
            autonomy: vehicleType.autonomy,
            cost: vehicleType.cost,
            averageSpeed: vehicleType.averageSpeed,
            energySource: vehicleType.energySource,
            consumption: vehicleType.consumption,
            emissions: vehicleType.emissions
        };
    }
}
exports.VehicleTypeMap = VehicleTypeMap;
