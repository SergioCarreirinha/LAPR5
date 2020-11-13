"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../config/"));
const NodeService_1 = __importDefault(require("../services/NodeService"));
const celebrate_1 = require("celebrate");
const NodeRepo_1 = __importDefault(require("../repositories/NodeRepo"));
const NodeSchema_1 = __importDefault(require("../dataschemas/NodeSchema"));
let NodeController = class NodeController {
    constructor(nodeServiceInstance) {
        this.nodeServiceInstance = nodeServiceInstance;
    }
    async createNode(req, res, next) {
        celebrate_1.celebrate({
            body: celebrate_1.Joi.object({
                key: celebrate_1.Joi.string().required(),
                name: celebrate_1.Joi.string().required(),
                latitude: celebrate_1.Joi.number().required(),
                longitude: celebrate_1.Joi.number().required(),
                shortName: celebrate_1.Joi.string().required(),
                isDepot: celebrate_1.Joi.boolean().required(),
                isReliefPoint: celebrate_1.Joi.boolean().required(),
            })
        });
        try {
            console.log(config_1.default.services.Node.name);
            const callService = await this.nodeServiceInstance.createNode(req.body);
            if (callService.isFailure) {
                return res.status(402).send();
            }
            return res.status(201).json(callService.getValue());
        }
        catch (e) {
            return next(e);
        }
    }
    async findAll(req, res, next) {
        try {
            const callService = await new NodeService_1.default(new NodeRepo_1.default(NodeSchema_1.default)).findAll(req);
            if (callService.isFailure) {
                return res.status(402).send();
            }
            return res.status(201).json(callService.getValue());
        }
        catch (e) {
            return next(e);
        }
    }
};
NodeController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.Node.name)),
    __metadata("design:paramtypes", [NodeService_1.default])
], NodeController);
exports.default = NodeController;
//# sourceMappingURL=NodeController.js.map