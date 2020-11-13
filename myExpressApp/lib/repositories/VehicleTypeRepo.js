"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const VehicleTypeMap_1 = require("../mappers/VehicleTypeMap");
const mongoose_1 = require("mongoose");
let VehicleTypeRepo = class VehicleTypeRepo {
    constructor(vehicleTypeSchema) {
        this.vehicleTypeSchema = vehicleTypeSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async save(vehicleType) {
        const query = { key: vehicleType.key };
        const document = await this.vehicleTypeSchema.findOne(query);
        try {
            if (document === null) {
                const rawVehicleType = VehicleTypeMap_1.VehicleTypeMap.toPersistence(vehicleType);
                const vehicleTypeCreated = await this.vehicleTypeSchema.create(rawVehicleType);
                return VehicleTypeMap_1.VehicleTypeMap.toDomain(vehicleTypeCreated);
            }
            else {
                document.key = vehicleType.key;
                document.name = vehicleType.name;
                document.autonomy = vehicleType.autonomy;
                document.cost = vehicleType.cost;
                document.averageSpeed = vehicleType.averageSpeed;
                document.energySource = vehicleType.energySource;
                document.consumption = vehicleType.consumption;
                document.emissions = vehicleType.emissions;
                await document.save();
                return vehicleType;
            }
        }
        catch (e) {
            throw e;
        }
    }
};
VehicleTypeRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('VehicleTypeSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], VehicleTypeRepo);
exports.default = VehicleTypeRepo;
//# sourceMappingURL=VehicleTypeRepo.js.map