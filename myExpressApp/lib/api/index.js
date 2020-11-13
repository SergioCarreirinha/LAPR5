"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VehicleTypeRouter_1 = __importDefault(require("./routes/VehicleTypeRouter"));
const DriverTypeRouter_1 = __importDefault(require("./routes/DriverTypeRouter"));
const FileUploadRouter_1 = __importDefault(require("./routes/FileUploadRouter"));
const NodeRouter_1 = __importDefault(require("./routes/NodeRouter"));
const LineRoute_1 = __importDefault(require("./routes/LineRoute"));
const LinePathsRouter_1 = __importDefault(require("./routes/LinePathsRouter"));
// guaranteed to get dependencies
exports.default = () => {
    const app = express_1.Router();
    VehicleTypeRouter_1.default(app);
    DriverTypeRouter_1.default(app);
    FileUploadRouter_1.default(app);
    NodeRouter_1.default(app);
    LineRoute_1.default(app);
    LinePathsRouter_1.default(app);
    return app;
};
//# sourceMappingURL=index.js.map