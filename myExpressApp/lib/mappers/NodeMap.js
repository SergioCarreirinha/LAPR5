"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMap = void 0;
const Node_1 = require("../domain/models/Node");
class NodeMap {
    static toDTO(node) {
        return {
            id: node.id.toString(),
            key: node.key,
            name: node.name,
            latitude: node.latitude,
            longitude: node.longitude,
            shortName: node.shortName,
            isDepot: node.isDepot,
            isReliefPoint: node.isReliefPoint,
            capacities: node.capacities
        };
    }
    static toDomain(node) {
        const NodeOrError = Node_1.Node.create(node);
        NodeOrError.isFailure ? console.log(NodeOrError.error) : '';
        return NodeOrError.isSuccess ? NodeOrError.getValue() : null;
    }
    static toPersistence(node) {
        return {
            domainId: node.id.toString(),
            key: node.key,
            name: node.name,
            latitude: node.latitude,
            longitude: node.longitude,
            shortName: node.shortName,
            isDepot: node.isDepot,
            isReliefPoint: node.isReliefPoint,
            capacities: node.capacities
        };
    }
}
exports.NodeMap = NodeMap;
