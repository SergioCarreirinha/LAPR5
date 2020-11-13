"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const express_1 = __importDefault(require("./express"));
const mongoose_1 = __importDefault(require("./mongoose"));
const config_1 = __importDefault(require("../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await mongoose_1.default();
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
    await dependencyInjector_1.default({
        mongoConnection,
        schemas: [VehicleTypeSchema, DriverTypeSchema, NodeSchema, LineSchema, PathSchema],
        repositories: [VehicleTypeRepo, DriverTypeRepo, NodeRepo, LineRepo, PathRepo],
        controllers: [VehicleTypeController, DriverTypeController, NodeController, LineController, LinePathsController, FileUploadController],
        services: [VehicleTypeService, DriverTypeService, NodeService, LineService, LinePathsService, FileUploadService]
    });
    await express_1.default({ app: expressApp });
    console.log('Express Intialized');
    // ... more loaders can be here
};
//# sourceMappingURL=index.js.map