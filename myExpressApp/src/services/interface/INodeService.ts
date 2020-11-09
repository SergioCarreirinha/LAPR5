import INodeDTO from '../../dto//NodeDTO/INodeDTO';
import { Result } from '../../core/logic/Result';

export default interface INodeService {
    createNode(nodeDTO : INodeDTO): Promise<Result<INodeDTO>>;
}