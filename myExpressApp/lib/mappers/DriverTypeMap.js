"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverTypeMap = void 0;
const DriverType_1 = require("../domain/models/DriverType");
class DriverTypeMap {
    static toDTO(driverType) {
        return {
            description: driverType.description,
        };
    }
    static toDomain(driverType) {
        const vehicleTypeOrError = DriverType_1.DriverType.create(driverType);
        vehicleTypeOrError.isFailure ? console.log(vehicleTypeOrError.error) : '';
        return vehicleTypeOrError.isSuccess ? vehicleTypeOrError.getValue() : null;
    }
    static toPersistence(driverType) {
        return {
            description: driverType.description,
        };
    }
}
exports.DriverTypeMap = DriverTypeMap;
