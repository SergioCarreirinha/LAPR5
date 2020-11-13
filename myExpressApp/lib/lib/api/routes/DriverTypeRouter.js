"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const config_1 = require("../../config");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/driverType', route);
    const crtl = typedi_1.Container.get(config_1.default.controllers.DriverType.name);
    route.post('', (req, res, next) => crtl.createDriverType(req, res, next));
};
