"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyInjector_1 = require("./dependencyInjector");
const express_1 = require("./express");
const mongoose_1 = require("./mongoose");
const config_1 = require("../config");
exports.default = ({ expressApp }) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnection = yield mongoose_1.default();
    console.log('MongoDB Intialized');
    const vehicleTypeSchema = {
        name: config_1.default.schemas.VehicleType.name,
        schema: config_1.default.schemas.VehicleType.schema
    };
    const vehicleTypeRepo = {
        name: config_1.default.repositories.VehicleType.name,
        path: config_1.default.repositories.VehicleType.path
    };
    const vehicleTypeController = {
        name: config_1.default.controllers.VehicleType.name,
        path: config_1.default.controllers.VehicleType.path
    };
    const vehicleTypeService = {
        name: config_1.default.services.VehicleType.name,
        path: config_1.default.services.VehicleType.path
    };
    const DriverTypeSchema = {
        name: config_1.default.schemas.DriverType.name,
        schema: config_1.default.schemas.DriverType.schema
    };
    const DriverTypeRepo = {
        name: config_1.default.repositories.DriverType.name,
        path: config_1.default.repositories.DriverType.path
    };
    const DriverTypeController = {
        name: config_1.default.controllers.DriverType.name,
        path: config_1.default.controllers.DriverType.path
    };
    const DriverTypeService = {
        name: config_1.default.services.DriverType.name,
        path: config_1.default.services.DriverType.path
    };
    const FileUploadController = {
        name: config_1.default.controllers.FileUpload.name,
        path: config_1.default.controllers.FileUpload.path
    };
    const FileUploadService = {
        name: config_1.default.services.FileUpload.name,
        path: config_1.default.services.FileUpload.path
    };
    yield dependencyInjector_1.default({
        mongoConnection,
        schemas: [vehicleTypeSchema, DriverTypeSchema],
        repositories: [vehicleTypeRepo, DriverTypeRepo],
        controllers: [vehicleTypeController, DriverTypeController, FileUploadController],
        services: [vehicleTypeService, DriverTypeService, FileUploadService]
    });
    yield express_1.default({ app: expressApp });
    console.log('Express Intialized');
    // ... more loaders can be here
});