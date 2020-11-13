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
const DriverTypeMap_1 = require("../mappers/DriverTypeMap");
const mongoose_1 = require("mongoose");
let DriverTypeRepo = class DriverTypeRepo {
    constructor(DriverTypeSchema) {
        this.DriverTypeSchema = DriverTypeSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async save(DriverType) {
        const query = { domainId: DriverType.id.toString() };
        const document = await this.DriverTypeSchema.findOne(query);
        try {
            if (document === null) {
                const rawDriverType = DriverTypeMap_1.DriverTypeMap.toPersistence(DriverType);
                const DriverTypeCreated = await this.DriverTypeSchema.create(rawDriverType);
                return DriverTypeMap_1.DriverTypeMap.toDomain(DriverTypeCreated);
            }
            else {
                document.description = DriverType.description;
                await document.save();
                return DriverType;
            }
        }
        catch (e) {
            throw e;
        }
    }
};
DriverTypeRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('DriverTypeSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], DriverTypeRepo);
exports.default = DriverTypeRepo;
//# sourceMappingURL=DriverTypeRepo.js.map