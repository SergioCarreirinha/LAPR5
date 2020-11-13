"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const config_1 = require("../../config");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/fileUpload', route);
    const crtl = typedi_1.Container.get(config_1.default.controllers.FileUpload.name);
    //recebe pedido post e redireciona para o controller
    route.post('', (req, res, next) => crtl.fileUpload(req, res, next));
};
