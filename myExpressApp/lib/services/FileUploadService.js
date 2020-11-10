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
const xml2js = require("xml2js");
const fs = require("fs");
const { DOMParser } = require('xmldom');
const parseString = require('xml2js-parser').parseString;
let FileUploadService = class FileUploadService {
    constructor(vehicleTypeServiceInstance) {
        this.vehicleTypeServiceInstance = vehicleTypeServiceInstance;
    }
    fileUpload(xml) {
        return __awaiter(this, void 0, void 0, function* () {
            let vehicleTypeService = this.vehicleTypeServiceInstance;
            fs.readFile(xml, 'utf8', function read(err, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        throw err;
                    }
                    const objects = new DOMParser().parseFromString(data);
                    let parser = new xml2js.Parser({ explicitRoot: false, mergeAttrs: true, explicitArray: false, attrNameProcessors: [xml2js.processors.firstCharLowerCase] });
                    let vehicleTypes = objects.getElementsByTagName("VehicleType");
                    for (var i = 0; i < vehicleTypes.length; i++) {
                        parser.parseString(vehicleTypes[i], (err, result) => {
                            console.log(result);
                            vehicleTypeService.createVehicleType(result);
                        });
                    }
                });
            });
        });
    }
};
FileUploadService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.services.VehicleType.name)),
    __metadata("design:paramtypes", [Object])
], FileUploadService);
exports.default = FileUploadService;