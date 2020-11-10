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
const PathMap_1 = require("../mappers/PathMap");
const mongoose_1 = require("mongoose");
let PathRepo = class PathRepo {
    constructor(PathSchema) {
        this.PathSchema = PathSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    save(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { desc: path.description.toString() };
            const document = yield this.PathSchema.findOne(query);
            try {
                if (document === null) {
                    const rawPath = PathMap_1.PathMap.toPersistence(path);
                    const pathCreated = yield this.PathSchema.create(rawPath);
                    return PathMap_1.PathMap.toDomain(pathCreated);
                }
                else {
                    document.description = path.description;
                    document.isEmpty = path.isEmpty;
                    document.segments = path.segments;
                    document.totalDist = path.totalDist;
                    document.totalDur = path.totalDur;
                    yield document.save();
                    return path;
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
};
PathRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('PathSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PathRepo);
exports.default = PathRepo;