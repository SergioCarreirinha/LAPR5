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
const xml2js = require("xml2js");
const fs = require("fs");
const { DOMParser } = require('xmldom');
let FileUploadService = class FileUploadService {
    constructor(vehicleTypeServiceInstance, nodeServiceInstance) {
        this.vehicleTypeServiceInstance = vehicleTypeServiceInstance;
        this.nodeServiceInstance = nodeServiceInstance;
    }
    async fileUpload(xml) {
        let vehicleType = this.vehicleTypeServiceInstance;
        fs.readFile(xml, 'utf8', async function read(err, data) {
            if (err) {
                throw err;
            }
            const objects = new DOMParser().parseFromString(data);
            let parser = new xml2js.Parser({ explicitRoot: false, mergeAttrs: true, explicitArray: false, attrNameProcessors: [xml2js.processors.firstCharLowerCase] });
            //importar VehicleTypes
            let vehicleTypes = objects.getElementsByTagName("VehicleType");
            for (var i = 0; i < vehicleTypes.length; i++) {
                parser.parseString(vehicleTypes[i], async (err, result) => {
                    try {
                        await vehicleType.createVehicleType(result);
                    }
                    catch (e) {
                        throw e;
                    }
                });
            }
            /*   //importar nós
               let nodes = objects.getElementsByTagName("Nodes");
               for (var i = 0; i < nodes.length; i++) {
                   parser.parseString(nodes[i], (err, result) => {
                       console.log(result);
                       nodeService.createNode(result as INodeDTO);
                   });
               } */
        });
    }
};
FileUploadService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.services.VehicleType.name)),
    __param(1, typedi_1.Inject(config_1.default.services.Node.name)),
    __metadata("design:paramtypes", [Object, Object])
], FileUploadService);
exports.default = FileUploadService;
//# sourceMappingURL=FileUploadService.js.map