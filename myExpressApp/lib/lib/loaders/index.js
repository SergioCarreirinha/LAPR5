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
    const VehicleTypeSchema = {
        name: config_1.default.schemas.VehicleType.name,
        schema: config_1.default.schemas.VehicleType.schema
    };
    const VehicleTypeRepo = {
        name: config_1.default.repositories.VehicleType.name,
        path: config_1.default.repositories.VehicleType.path
    };
    const VehicleTypeController = {
        name: config_1.default.controllers.VehicleType.name,
        path: config_1.default.controllers.VehicleType.path
    };
    const VehicleTypeService = {
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
    const NodeSchema = {
        name: config_1.default.schemas.Node.name,
        schema: config_1.default.schemas.Node.schema
    };
    const NodeRepo = {
        name: config_1.default.repositories.Node.name,
        path: config_1.default.repositories.Node.path
    };
    const NodeController = {
        name: config_1.default.controllers.Node.name,
        path: config_1.default.controllers.Node.path
    };
    const NodeService = {
        name: config_1.default.services.Node.name,
        path: config_1.default.services.Node.path
    };
    const LineSchema = {
        name: config_1.default.schemas.Line.name,
        schema: config_1.default.schemas.Line.schema
    };
    const LineRepo = {
        name: config_1.default.repositories.Line.name,
        path: config_1.default.repositories.Line.path
    };
    const LineController = {
        name: config_1.default.controllers.Line.name,
        path: config_1.default.controllers.Line.path
    };
    const LineService = {
        name: config_1.default.services.Line.name,
        path: config_1.default.services.Line.path
    };
    const LinePathsController = {
        name: config_1.default.controllers.LinePaths.name,
        path: config_1.default.controllers.LinePaths.path
    };
    const LinePathsService = {
        name: config_1.default.services.LinePaths.name,
        path: config_1.default.services.LinePaths.path
    };
    const PathSchema = {
        name: config_1.default.schemas.Path.name,
        schema: config_1.default.schemas.Path.schema
    };
    const PathRepo = {
        name: config_1.default.repositories.Path.name,
        path: config_1.default.repositories.Path.path
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
        schemas: [VehicleTypeSchema, DriverTypeSchema, NodeSchema, LineSchema, PathSchema],
        repositories: [VehicleTypeRepo, DriverTypeRepo, NodeRepo, LineRepo, PathRepo],
        controllers: [VehicleTypeController, DriverTypeController, NodeController, LineController, LinePathsController, FileUploadController],
        services: [VehicleTypeService, DriverTypeService, NodeService, LineService, LinePathsService, FileUploadService]
    });
    yield express_1.default({ app: expressApp });
    console.log('Express Intialized');
    // ... more loaders can be here
});
