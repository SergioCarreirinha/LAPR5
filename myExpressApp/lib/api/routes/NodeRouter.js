"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const route = express_1.Router();
exports.default = (app) => {
    app.use('/node', route);
    const crtl = typedi_1.Container.get(config_1.default.controllers.Node.name);
    route.post('', (req, res, next) => crtl.createNode(req, res, next));
    route.get('', (req, res, next) => crtl.findAll(req, res, next));
};
//# sourceMappingURL=NodeRouter.js.map