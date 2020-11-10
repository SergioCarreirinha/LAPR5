import INodeDTO from '../../dto//NodeDTO/INodeDTO';
import { Result } from '../../core/logic/Result';
import { Node } from'../../domain/models/Node';

export default interface INodeService {
    createNode(nodeDTO : INodeDTO): Promise<Result<INodeDTO>>;
    findByName(value: string): Promise<Result<Node>>;
}