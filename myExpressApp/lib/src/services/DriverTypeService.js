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
const config_1 = require("../config");
const DriverType_1 = require("../domain/models/DriverType");
const DriverTypeMap_1 = require("../mappers/DriverTypeMap");
const Result_1 = require("../core/logic/Result");
let DriverTypeService = class DriverTypeService {
    constructor(driverTypeRepo) {
        this.driverTypeRepo = driverTypeRepo;
    }
    createDriverType(driverTypeDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driverType = yield DriverType_1.DriverType.create(driverTypeDTO);
                if (driverType.isFailure) {
                    return Result_1.Result.fail(driverType.errorValue());
                }
                yield this.driverTypeRepo.save(driverType.getValue());
                const vehicleTypeReturn = DriverTypeMap_1.DriverTypeMap.toDTO(driverType.getValue());
                return Result_1.Result.ok(vehicleTypeReturn);
            }
            catch (e) {
                throw e;
            }
        });
    }
};
DriverTypeService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repositories.DriverType.name)),
    __metadata("design:paramtypes", [Object])
], DriverTypeService);
exports.default = DriverTypeService;
