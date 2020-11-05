"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const express_1 = require("express");
const app = express();
const vehicleTypeRouter = require('./routes/VehicleTypeRouter');
// guaranteed to get dependencies
exports.default = () => {
    const app = express_1.Router();
    vehicleTypeRouter(app);
    return app;
};
