import { Document, Model } from 'mongoose';
import { INodePersistence } from '../persistence/interface/INodePersistence';
import INodeDTO from '../dto/NodeDTO/INodeDTO';
import { Node } from '../domain/models/Node';

export class NodeMap {

  public static toDTO(node: Node) : INodeDTO {
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
    } as INodeDTO;
  }
    

  public static toDomain (node: any | Model<INodePersistence & Document> ): Node {
    const NodeOrError = Node.create(node);

    NodeOrError.isFailure ? console.log(NodeOrError.error) : '';

    return NodeOrError.isSuccess ? NodeOrError.getValue() : null;
  }

  public static toPersistence (node: Node): any {
    return {
        domainId: node.id.toString(),
        key: node.key,
        name: node.name,
        latitude: node.latitude,
        longitude: node.longitude,
        shortName: node.shortName,
        isDepot: node.isDepot,
        isReliefPoint: node.isReliefPoint,
        capacities:node.capacities
    }
  }

}