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
const config_1 = __importDefault(require("../config"));
const NodeService_1 = __importDefault(require("../services/NodeService"));
const NodeRepo_1 = __importDefault(require("../repositories/NodeRepo"));
const NodeSchema_1 = __importDefault(require("../dataschemas/NodeSchema"));
const PathSegment_1 = require("../domain/models/PathSegment");
const LinePathsMap_1 = require("../mappers/LinePathsMap");
let LinePathsController = class LinePathsController {
    constructor(linePathsServiceInstance) {
        this.linePathsServiceInstance = linePathsServiceInstance;
    }
    async createLinePaths(req, res, next) {
        try {
            const nodeService = new NodeService_1.default(new NodeRepo_1.default(NodeSchema_1.default));
            const pathSegments = new Array();
            const reqlength = Object.keys(req.body.segments).length;
            const forLoop = req.body.segments;
            for (let index = 0; index < reqlength; index++) {
                const pathSegment = PathSegment_1.PathSegment.create(forLoop[index][2], forLoop[index][3], (await nodeService.findByName(forLoop[index][0])).getValue(), (await nodeService.findByName(forLoop[index][1])).getValue(), index + 1).getValue();
                pathSegments.push(pathSegment);
            }
            ;
            const dto = LinePathsMap_1.LinePathsMap.toDTO(req.body.line, req.body.toGo, req.body.description, req.body.isEmpty, pathSegments);
            const callService = await this.linePathsServiceInstance.createLinePaths(dto);
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
LinePathsController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.LinePaths.name)),
    __metadata("design:paramtypes", [Object])
], LinePathsController);
exports.default = LinePathsController;
//# sourceMappingURL=LinePathsController.js.map