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
const config_1 = require("../config/");
const VehicleTypeService_1 = require("../services/VehicleTypeService");
const celebrate_1 = require("celebrate");
let VehicleTypeController = class VehicleTypeController {
    constructor(vehicleTypeServiceInstance) {
        this.vehicleTypeServiceInstance = vehicleTypeServiceInstance;
    }
    createVehicleType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            celebrate_1.celebrate({
                body: celebrate_1.Joi.object({
                    key: celebrate_1.Joi.string().required(),
                    name: celebrate_1.Joi.string().required(),
                    fuelType: celebrate_1.Joi.number().required(),
                    cost: celebrate_1.Joi.number().required(),
                    averageSpeed: celebrate_1.Joi.number().required(),
                    energySource: celebrate_1.Joi.number().required(),
                    consumption: celebrate_1.Joi.number().required(),
                    emissions: celebrate_1.Joi.number().required()
                })
            });
            try {
                console.log(config_1.default.services.VehicleType.name);
                const callService = yield this.vehicleTypeServiceInstance.createVehicleType(req.body);
                if (callService.isFailure) {
                    return res.status(402).send();
                }
                return res.status(201).json(callService.getValue());
            }
            catch (e) {
                return next(e);
            }
        });
    }
};
VehicleTypeController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.VehicleType.name)),
    __metadata("design:paramtypes", [VehicleTypeService_1.default])
], VehicleTypeController);
exports.default = VehicleTypeController;
