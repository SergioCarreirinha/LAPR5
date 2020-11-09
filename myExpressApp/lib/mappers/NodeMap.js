"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMap = void 0;
class NodeMap {
    static toDTO(node) {
        return {
            id: node.id,
            key: node.key,
            name: node.name,
            latitude: node.latitude,
            longitude: node.longitude,
            shortName: node.shortName,
            isDepot: node.isDepot,
            isReliefPoint: node.isReliefPoint
        };
    }
    static toDomain(Node) {
        const NodeOrError = Node.create(Node);
        NodeOrError.isFailure ? console.log(NodeOrError.error) : '';
        return NodeOrError.isSuccess ? NodeOrError.getValue() : null;
    }
    static toPersistence(node) {
        return {
            domainId: node.id,
            key: node.key,
            name: node.name,
            latitude: node.latitude,
            longitude: node.longitude,
            shortName: node.shortName,
            isDepot: node.isDepot,
            isReliefPoint: node.isReliefPoint
        };
    }
}
exports.NodeMap = NodeMap;
