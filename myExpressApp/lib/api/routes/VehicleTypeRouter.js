"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const config_1 = require("../../config");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/vehicleType', route);
    const crtl = typedi_1.Container.get(config_1.default.controllers.VehicleType.name);
    route.post('', (req, res, next) => crtl.createVehicleType(req, res, next));
};
