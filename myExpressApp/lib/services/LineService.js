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
const Line_1 = require("../domain/models/Line");
const LineMap_1 = require("../mappers/LineMap");
const Result_1 = require("../core/logic/Result");
let LineService = class LineService {
    constructor(lineRepo) {
        this.lineRepo = lineRepo;
    }
    async createLine(line) {
        try {
            const lineCreated = await Line_1.Line.create(line);
            if (lineCreated.isFailure) {
                return Result_1.Result.fail(lineCreated.errorValue());
            }
            await this.lineRepo.save(lineCreated.getValue());
            const lineReturn = LineMap_1.LineMap.toDTO(lineCreated.getValue());
            return Result_1.Result.ok(lineReturn);
        }
        catch (e) {
            throw e;
        }
    }
};
LineService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repositories.Line.name)),
    __metadata("design:paramtypes", [Object])
], LineService);
exports.default = LineService;
//# sourceMappingURL=LineService.js.map