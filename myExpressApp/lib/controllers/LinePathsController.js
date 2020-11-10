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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = require("../config");
const LinePathsService_1 = require("../services/LinePathsService");
const NodeService_1 = require("../services/NodeService");
const celebrate_1 = require("celebrate");
const PathRepo_1 = require("../repositories/PathRepo");
const PathSchema_1 = require("../dataschemas/PathSchema");
const NodeRepo_1 = require("../repositories/NodeRepo");
const NodeSchema_1 = require("../dataschemas/NodeSchema");
const PathSegment_1 = require("../domain/models/PathSegment");
const LinePathsMap_1 = require("../mappers/LinePathsMap");
const LineRepo_1 = require("../repositories/LineRepo");
const LineSchema_1 = require("../dataschemas/LineSchema");
let LinePathsController = class LinePathsController {
    constructor(linePathsServiceInstance) {
        this.linePathsServiceInstance = linePathsServiceInstance;
    }
    createLinePaths(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            celebrate_1.celebrate({});
            try {
                console.log(req.body);
                const nodeService = new NodeService_1.default(new NodeRepo_1.default(NodeSchema_1.default));
                const pathSegments = new Array();
                const forLoop = req.body[4];
                for (let index = 0; index < forLoop.length; index++) {
                    const pathSegment = PathSegment_1.PathSegment.create(forLoop[2], forLoop[3], (yield nodeService.findByName(forLoop[0])).getValue(), (yield nodeService.findByName(forLoop[1])).getValue(), index).getValue();
                    pathSegments.push(pathSegment);
                }
                ;
                const dto = LinePathsMap_1.LinePathsMap.toDTO(req.body[0], req.body[1], req.body[2], req.body[3], pathSegments);
                const callService = yield new LinePathsService_1.default(new PathRepo_1.default(PathSchema_1.default), new LineRepo_1.default(LineSchema_1.default)).createLinePaths(dto);
                if (callService.isFailure) {
                    return res.status(402).send();
                }
                return res.status(201).json(callService.getValue());
            }
            catch (e) {
                return next(e);
            }
        });
    }
};
LinePathsController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.LinesPath.name)),
    __metadata("design:paramtypes", [Object])
], LinePathsController);
exports.default = LinePathsController;
