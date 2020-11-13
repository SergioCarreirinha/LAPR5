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
const Node_1 = require("../domain/models/Node");
const NodeRepo_1 = __importDefault(require("../repositories/NodeRepo"));
const NodeMap_1 = require("../mappers/NodeMap");
const Result_1 = require("../core/logic/Result");
let NodeService = class NodeService {
    constructor(nodeRepo) {
        this.nodeRepo = nodeRepo;
    }
    async createNode(nodeDTO) {
        try {
            const node = await Node_1.Node.create(nodeDTO);
            if (node.isFailure) {
                return Result_1.Result.fail(node.errorValue());
            }
            await this.nodeRepo.save(node.getValue());
            const nodeReturn = NodeMap_1.NodeMap.toDTO(node.getValue());
            return Result_1.Result.ok(nodeReturn);
        }
        catch (e) {
            throw e;
        }
    }
    async findByName(value) {
        try {
            const nodeToReturn = await this.nodeRepo.findByName(value);
            return nodeToReturn;
        }
        catch (e) {
            throw e;
        }
    }
    async findAll(req) {
        try {
            const nodes = await this.nodeRepo.findAll();
            const result = nodes.getValue();
            if (req.body.orderByName && req.body.orderByCode) {
                result.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    else {
                        if (a.key < b.key) {
                            return -1;
                        }
                        else if (a.key > b.key) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                });
            }
            else if (req.body.orderByName) {
                result.sort(function (a, b) {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    else if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
            }
            else if (req.body.orderByCode) {
                result.sort(function (a, b) {
                    if (a.key < b.key) {
                        return -1;
                    }
                    else if (a.key > b.key) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                });
            }
            function filterItems(query) {
                return result.filter(function (el) {
                    return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1 || el.key.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
            }
            if (req.body.search) {
                return Result_1.Result.ok(filterItems(req.body.search));
            }
            return Result_1.Result.ok(result);
        }
        catch (e) {
            throw e;
        }
    }
};
NodeService = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject(config_1.default.repositories.Node.name)),
    __metadata("design:paramtypes", [NodeRepo_1.default])
], NodeService);
exports.default = NodeService;
//# sourceMappingURL=NodeService.js.map