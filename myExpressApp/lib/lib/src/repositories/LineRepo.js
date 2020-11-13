"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const LineMap_1 = require("../mappers/LineMap");
const e = require("express");
let LineRepo = class LineRepo {
    constructor(LineSchema) {
        this.LineSchema = LineSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    save(line) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { domainId: line.id.toString() };
            const document = yield this.LineSchema.findOne(query);
            try {
                if (document === null) {
                    const rawLine = LineMap_1.LineMap.toPersistence(line);
                    const lineCreated = yield this.LineSchema.create(rawLine);
                    return LineMap_1.LineMap.toDomain(lineCreated);
                }
                else {
                    document.name = line.name;
                    document.code = line.code;
                    document.goPath = line.goPath;
                    document.returnPath = line.returnPath;
                    document.emptyPaths = line.emptyPaths;
                    document.endNodes = line.endNodes;
                    document.allowedVehicles = line.allowedVehicles;
                    document.allowedDrivers = line.allowedDrivers;
                    yield document.save();
                    return line;
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    updateLineByName(value, toGo, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { name: value };
            try {
                if (toGo) {
                    var document = yield this.LineSchema.findOneAndUpdate(query, { goPath: path }, { new: true });
                }
                else {
                    var document = yield this.LineSchema.findOneAndUpdate(query, { returnPath: path }, { new: true });
                }
                return LineMap_1.LineMap.toDomain(document);
            }
            catch (e) { }
            throw e;
        });
    }
};
LineRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('LineSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], LineRepo);
exports.default = LineRepo;
