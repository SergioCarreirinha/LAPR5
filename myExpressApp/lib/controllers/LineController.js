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
const config_1 = require("../config/");
const LineService_1 = require("../services/LineService");
const LineRepo_1 = require("../repositories/LineRepo");
const LineSchema_1 = require("../dataschemas/LineSchema");
const celebrate_1 = require("celebrate");
let LineController = class LineController {
    constructor(lineServiceInstance) {
        this.lineServiceInstance = lineServiceInstance;
    }
    createLine(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            celebrate_1.celebrate({});
            try {
                const callService = yield new LineService_1.default(new LineRepo_1.default(LineSchema_1.default)).createLine(req.body);
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
LineController = __decorate([
    __param(0, typedi_1.Inject(config_1.default.services.line.name)),
    __metadata("design:paramtypes", [Object])
], LineController);
exports.default = LineController;
