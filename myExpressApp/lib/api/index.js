"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VehicleTypeRouter_1 = require("./routes/VehicleTypeRouter");
const DriverTypeRouter_1 = require("./routes/DriverTypeRouter");
const FileUploadRouter_1 = require("./routes/FileUploadRouter");
const NodeRouter_1 = require("./routes/NodeRouter");
const LineRoute_1 = require("./routes/LineRoute");
<<<<<<< HEAD
=======
const LinePathsRouter_1 = require("./routes/LinePathsRouter");
>>>>>>> 5615533f0daf64063f6084d15ace84012bfc94bb
// guaranteed to get dependencies
exports.default = () => {
    const app = express_1.Router();
    VehicleTypeRouter_1.default(app);
    DriverTypeRouter_1.default(app);
    FileUploadRouter_1.default(app);
    NodeRouter_1.default(app);
    LineRoute_1.default(app);
<<<<<<< HEAD
=======
    LinePathsRouter_1.default(app);
>>>>>>> 5615533f0daf64063f6084d15ace84012bfc94bb
    return app;
};
