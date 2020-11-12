import INodeDTO from '../../dto//NodeDTO/INodeDTO';
import { Result } from '../../core/logic/Result';
import { Node } from'../../domain/models/Node';
import { Request } from 'express';

export default interface INodeService {
    createNode(nodeDTO : INodeDTO): Promise<Result<INodeDTO>>;
    findByName(value: string): Promise<Result<Node>>;
    findAll(req: Request): Promise<Result<Array<Node>>>;
}