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
const NodeMap_1 = require("../mappers/NodeMap");
const mongoose_1 = require("mongoose");
const Result_1 = require("../core/logic/Result");
let NodeRepo = class NodeRepo {
    constructor(NodeSchema) {
        this.NodeSchema = NodeSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    save(node) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { domainId: node.id.toString() };
            const document = yield this.NodeSchema.findOne(query);
            try {
                if (document === null) {
                    const rawNode = NodeMap_1.NodeMap.toPersistence(node);
                    const NodeCreated = yield this.NodeSchema.create(rawNode);
                    return NodeMap_1.NodeMap.toDomain(NodeCreated);
                }
                else {
                    document.key = node.key;
                    document.name = node.name;
                    document.latitude = node.latitude;
                    document.longitude = node.longitude;
                    document.shortName = node.shortName;
                    document.isDepot = node.isDepot;
                    document.isReliefPoint = node.isReliefPoint;
                    document.capacities = node.capacities;
                    yield document.save();
                    return node;
                }
            }
            catch (e) {
                throw e;
            }
        });
    }
    findByName(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { name: value };
            const document = yield this.NodeSchema.findOne(query);
            if (document === null) {
                return Result_1.Result.fail('No Node found!');
            }
            else {
                return Result_1.Result.ok(NodeMap_1.NodeMap.toDomain(document));
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            var document = yield this.NodeSchema.find();
            var nodes = [];
            for (var i = 0; i < document.length; i++) {
                nodes.push(NodeMap_1.NodeMap.toDomain(document[i]));
            }
            if (document === null) {
                return Result_1.Result.fail('No Node found!');
            }
            else {
                return Result_1.Result.ok(nodes);
            }
        });
    }
};
NodeRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('NodeSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], NodeRepo);
exports.default = NodeRepo;
