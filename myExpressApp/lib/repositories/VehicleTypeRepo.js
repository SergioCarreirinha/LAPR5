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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
    save(vehicleType) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Repository");
            const query = { name: vehicleType.name };
            console.log(query);
            const document = yield this.vehicleTypeSchema.findOne(query);
            console.log(document);
            try {
                if (document === null) {
                    console.log("Null");
                    const rawVehicleType = VehicleTypeMap_1.VehicleTypeMap.toPersistence(vehicleType);
                    const vehicleTypeCreated = yield this.vehicleTypeSchema.create(rawVehicleType);
                    return VehicleTypeMap_1.VehicleTypeMap.toDomain(vehicleTypeCreated);
                }
                else {
                    console.log("nao Null");
                    document.name = vehicleType.name;
                    document.fuelType = vehicleType.fuelType;
                    document.range = vehicleType.range;
                    document.costPerKm = vehicleType.costPerKm;
                    document.avgConsumption = vehicleType.avgConsumption;
                    document.avgSpeed = vehicleType.avgSpeed;
                    yield document.save();
                    return vehicleType;
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
};
VehicleTypeRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('VehicleTypeSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], VehicleTypeRepo);
exports.default = VehicleTypeRepo;
