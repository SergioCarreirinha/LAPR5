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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../config"));
const VehicleType_1 = require("../domain/models/VehicleType");
const VehicleTypeRepo_1 = __importDefault(require("../repositories/VehicleTypeRepo"));
const VehicleTypeMap_1 = require("../mappers/VehicleTypeMap");
const Result_1 = require("../core/logic/Result");
let VehicleTypeService = class VehicleTypeService {
    constructor(vehicleTypeRepo) {
        this.vehicleTypeRepo = vehicleTypeRepo;
    }
    async createVehicleType(vehicleTypeDTO) {
        try {
            const vehicleType = await VehicleType_1.VehicleType.create(vehicleTypeDTO);
            if (vehicleType.isFailure) {
                return Result_1.Result.fail(vehicleType.errorValue());
            }
            await this.vehicleTypeRepo.save(vehicleType.getValue());
            const vehicleTypeReturn = VehicleTypeMap_1.VehicleTypeMap.toDTO(vehicleType.getValue());
            return Result_1.Result.ok(vehicleTypeReturn);
        }
        catch (e) {
            throw e;
        }
    }
};
VehicleTypeService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repositories.VehicleType.name)),
    __metadata("design:paramtypes", [VehicleTypeRepo_1.default])
], VehicleTypeService);
exports.default = VehicleTypeService;
//# sourceMappingURL=VehicleTypeService.js.map