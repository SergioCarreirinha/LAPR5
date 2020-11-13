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
const config_1 = __importDefault(require("../config/"));
const FileUploadService_1 = __importDefault(require("../services/FileUploadService"));
let FileUploadController = class FileUploadController {
    constructor(fileUploadServiceInstance) {
        this.fileUploadServiceInstance = fileUploadServiceInstance;
    }
    async fileUpload(req, res, next) {
        try {
            let call;
            if (req.files) {
                //vai buscar o path do ficheiro temporario
                let xml = req.files.xml.tempFilePath;
                console.log("ola");
                call = await this.fileUploadServiceInstance.fileUpload(xml);
            }
            else {
                //se nao existir nada dentro do req quer dizer que o cliente não deu upload do ficheiro
                res.send({
                    status: false,
                    message: 'Error uploanding file'
                });
            }
            res.send({
                status: true,
                message: 'File uploaded',
                errors: call
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
};
FileUploadController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.FileUpload.name)),
    __metadata("design:paramtypes", [FileUploadService_1.default])
], FileUploadController);
exports.default = FileUploadController;
//# sourceMappingURL=FileUploadController.js.map